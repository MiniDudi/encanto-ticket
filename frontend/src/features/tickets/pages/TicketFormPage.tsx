import { useFormik } from "formik"
import { MainInput } from "../../../shared/components/inputs/MainInput";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaExclamation, FaStar } from "react-icons/fa";
import { MainRadioGroup } from "../../../shared/components/inputs/MainRadioGroup";
import { MainButton } from "../../../shared/components/MainButton";
import { MainTextArea } from "../../../shared/components/inputs/MainTextArea";
import {
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketById,
} from "../api/tickets_api";
import { useEffect, useState } from "react";
import axios from "axios";
import { ticketSchema } from "../schemas/TicketSchema";
import { ClipLoader } from "react-spinners";
import { returnStatusColor } from "../utils/StatusUtils";
import { TicketStatus, TicketPriority } from "../types/ticket";

export function TicketFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditing = !!id;

    const [suggestion, setSuggestion] = useState("");
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        validationSchema: ticketSchema,
        initialValues: {
            title: "",
            description: "",
            status: TicketStatus.OPEN,
            priority: TicketPriority.LOW,
        },

        onSubmit: async (values) => {
            try {
                if (isEditing) {
                    await updateTicket(
                        Number(id),
                        values
                    );
                } else {
                    await createTicket(values);
                }

                navigate("/tickets");
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    console.error(
                        "Erro ao salvar ticket",
                        error.response?.data
                    );
                } else {
                    console.error("Erro inesperado", error);
                }
            }
        }
    });

    useEffect(() => {
        if (id) {
            getTicketById(Number(id))
                .then(ticket => {
                    formik.setValues({
                        title: ticket.title,
                        description: ticket.description,
                        status: ticket.status,
                        priority: ticket.priority,
                    });
                });
        }
    }, [id]);

    async function handleDelete() {
        try {
            await deleteTicket(Number(id));

            navigate("/tickets");

        } catch (error) {
            console.error(
                "Erro ao excluir ticket",
                error
            );
        }
    }

    async function handleSuggestResponse() {
        if (formik.values.description != "") {
            setLoading(true);

            const response = await fetch(
                "http://localhost:3000/ai/suggest-response",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        description: formik.values.description
                    })
                }
            );

            const data = await response.json();

            setSuggestion(data.suggestion);

            setLoading(false);
        }

    }

    return (
        <main className="min-h-screen bg-gray-100 p-8">

            <div>
                <NavLink className="flex mb-8 font-semibold items-center gap-2 text-center " rel="stylesheet" to="/tickets">
                    <FaArrowLeft />
                    Voltar
                </NavLink>
            </div>

            <h1 className="mb-8 text-start text-3xl font-bold">
                {isEditing ? "Editar Ticket" : "Novo Ticket"}
            </h1>



            <form onSubmit={formik.handleSubmit}>
                <div className="mb-6 w-200">
                    <MainInput
                        label="Título"
                        name="title"
                        placeholder="Qual o tópico do seu problema?"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.title}
                        error={formik.errors.title}
                    />
                </div>

                <div className="mb-6 w-200">
                    <MainTextArea
                        label="Descrição"
                        name="description"
                        placeholder="Descreva o problema"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.description}
                        error={formik.errors.description}
                    />


                </div>

                <div className="w-200 mb-6">
                    <MainButton onClick={handleSuggestResponse} buttonText="Sugerir solução com I.A." disable={formik.values.description == ""} type="button" />
                </div>

                {!loading ? (<div className="mb-6 w-200">
                    {suggestion && (
                        <div className="mt-7 w-200 rounded-lg border bg-white p-4 shadow">
                            <div className="flex items-center gap-1">
                                <h3 className="font-semibold">
                                    Sugestão da IA
                                </h3>
                                <FaStar />
                            </div>

                            <p className="mt-2 text-gray-700 whitespace-pre-line">
                                {suggestion}
                            </p>
                        </div>
                    )}
                </div>) : (
                    <div className="flex items-center mb-6 w-200 justify-center gap-1">
                        <p>Carregando</p>
                        <ClipLoader
                            color="bg-black"
                            loading={loading}
                            size={25}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                )}


                <div className="mb-6">
                    <MainRadioGroup
                        label="Prioridade"
                        name="priority"
                        value={formik.values.priority}
                        onChange={formik.handleChange}
                        options={[
                            { label: "Baixa", value: TicketPriority.LOW },
                            { label: "Média", value: TicketPriority.MEDIUM },
                            { label: "Alta", value: TicketPriority.HIGH },
                        ]}
                    />
                </div>

                {!isEditing ?
                    (<div className="mb-6">
                        <div className="flex mb-3 items-center gap-2">
                            <FaExclamation />

                            <span>
                                Ao Salvar, o status do ticket será automaticamente definido como
                            </span>

                            <div className={`flex items-center w-30 h-10 rounded-xl justify-center ${returnStatusColor(TicketStatus.OPEN)} shadow-lg`}>
                                <span>"Aberto"</span>
                            </div>
                        </div>
                        <p className="flex items-center gap-2">
                            <FaArrowRight />
                            Isso poderá ser alterado na página de edição do Ticket
                        </p>
                    </div>)
                    :
                    (<div className="mb-6">
                        <MainRadioGroup
                            label="Status"
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            options={[
                                { label: "Aberto", value: TicketStatus.OPEN },
                                { label: "Em andamento", value: TicketStatus.IN_PROGRESS },
                                { label: "Resolvido", value: TicketStatus.RESOLVED },
                            ]}
                        />
                    </div>)
                }

                {isEditing ? (
                    <div className="w-200">
                        <MainButton buttonText="Editar informações" buttonColor="bg-green-600" hoverColor="hover:bg-green-700" type="submit"></MainButton>
                    </div>
                ) : (
                    <div className="w-200">
                        <MainButton buttonText="Enviar Ticket" type="submit"></MainButton>
                    </div>
                )
                }
            </form>

            {isEditing && (
                <div className="w-200 mt-6">
                    <MainButton
                        buttonText="Excluir Ticket"
                        buttonColor="bg-red-600"
                        hoverColor="hover:bg-red-700"
                        type="button"
                        onClick={handleDelete}
                    />
                </div>
            )}

        </main>
    )
}
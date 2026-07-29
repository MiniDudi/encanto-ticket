import { useFormik } from "formik"
import { MainInput } from "../../../shared/components/inputs/MainInput";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaExclamation } from "react-icons/fa";
import { MainRadioGroup } from "../../../shared/components/inputs/MainRadioGroup";
import { MainButton } from "../../../shared/components/MainButton";
import { MainTextArea } from "../../../shared/components/inputs/MainTextArea";
import {
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketById,
} from "../api/tickets_api";
import { useEffect } from "react";
import axios from "axios";
import { ticketSchema } from "../schemas/TicketSchema";

export function TicketFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditing = !!id;

    const formik = useFormik({
        validationSchema: ticketSchema,
        initialValues: {
            title: "",
            description: "",
            status: "aberto",
            priority: "baixa",
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
                        label="Title"
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

                <div className="mb-6">
                    <MainRadioGroup
                        label="Prioridade"
                        name="priority"
                        value={formik.values.priority}
                        onChange={formik.handleChange}
                        options={[
                            { label: "Baixa", value: "baixa" },
                            { label: "Média", value: "media" },
                            { label: "Alta", value: "alta" },
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

                            <div className="flex items-center w-30 h-10 rounded-xl justify-center bg-cyan-100 shadow-lg">
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
                                { label: "Aberto", value: "aberto" },
                                { label: "Em andamento", value: "em_andamento" },
                                { label: "Resolvido", value: "resolvido" },
                            ]}
                        />
                    </div>)
                }

                {isEditing ? (
                    <div className="w-200">
                        <MainButton buttonText="Editar informações" buttonColor="bg-green-600" hoverColor="hover:bg-green-700"></MainButton>
                    </div>
                ) : (
                    <div className="w-200">
                        <MainButton buttonText="Enviar Ticket"></MainButton>
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
                        onClick={handleDelete}
                    />
                </div>
            )}

        </main>
    )
}
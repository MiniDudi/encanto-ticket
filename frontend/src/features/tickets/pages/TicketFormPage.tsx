import { useFormik } from "formik"
import { MainInput } from "../../../shared/components/inputs/MainInput";
import { NavLink, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaExclamation } from "react-icons/fa";
import { MainRadioGroup } from "../../../shared/components/inputs/MainRadioGroup";
import { MainButton } from "../../../shared/components/MainButton";
import { MainTextArea } from "../../../shared/components/inputs/MainTextArea";

export function TicketFormPage() {
    const { id } = useParams();

    const formik = useFormik({
        validationSchema: null,
        initialValues: {
            title: "",
            description: "",
            status: "aberto",
            priority: "baixa",
        },
        onSubmit: (values) => {
            if (isEditing) {
                console.log("Atualizando ticket", id, values);
            } else {
                console.log("Criando ticket", values);
            }
        }
    })

    const isEditing = !!id;

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
                    />

                    {formik.touched.title && formik.errors.title && (
                        <p className="mt-1 text-sm text-red-500">
                            {formik.errors.title}
                        </p>
                    )}
                </div>

                <div className="mb-6 w-200">
                    <MainTextArea
                        label="Descrição"
                        name="description"
                        placeholder="Descreva o problema"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    {formik.touched.description && formik.errors.description && (
                        <p className="mt-1 text-sm text-red-500">
                            {formik.errors.description}
                        </p>
                    )}
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

                <div className="mb-6">
                    <p className="flex mb-3 items-center gap-2">
                        <FaExclamation />
                        Ao Salvar, o status do ticket será automaticamente definido como
                        <div className="flex items-center w-30 h-10 rounded-xl justify-center bg-cyan-100 shadow-lg">
                            <p>"Aberto"</p>
                        </div>
                    </p>
                    <p className="flex items-center gap-2">
                        <FaArrowRight />
                        Isso poderá ser alterado na página de edição do Ticket
                    </p>
                </div>

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
                    />
                </div>
            )}

        </main>
    )
}
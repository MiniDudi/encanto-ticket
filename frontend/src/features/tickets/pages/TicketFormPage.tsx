import { useFormik } from "formik"
import { MainInput } from "../../../shared/components/MainInput";
import { NavLink } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaExclamation } from "react-icons/fa";
import { RadioGroup } from "../../../shared/components/RadioGroup";
import { MainButton } from "../../../shared/components/MainButton";

export function TicketFormPage() {
    const formik = useFormik({
        validationSchema: null,
        initialValues: {
            title: "",
            description: "",
            status: "aberto",
            priority: "baixa",
        },
        onSubmit: (values) => {
            console.log(values);
        }
    })

    return (
        <main className="min-h-screen bg-gray-100 p-8">

            <div>
                <NavLink className="flex mb-8 font-semibold items-center gap-2 text-center " rel="stylesheet" to="/tickets">
                    <FaArrowLeft />
                    Voltar
                </NavLink>
            </div>

            <h1 className="mb-8 text-start text-3xl font-bold">
                Novo ticket
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
                    <MainInput
                        label="Descrição"
                        name="description"
                        placeholder="Descreva sobre o problema em detalhes"
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
                    <RadioGroup
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

                <div className="w-200">
                    <MainButton buttonText="Enviar Ticket"></MainButton>
                </div>

            </form>
        </main>
    )
}
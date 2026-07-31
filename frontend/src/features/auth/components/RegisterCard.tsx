import { FaArrowLeft } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

import { registerSchema } from "../schemas/RegisterSchema";
import { useFormik } from "formik";
import { MainButton } from "../../../shared/components/MainButton";
import { register } from "../api/auth_api";
import { MainInput } from "../../../shared/components/inputs/MainInput";


export function RegisterCard() {
    const navigate = useNavigate();

    const formik = useFormik({
        validationSchema: registerSchema,
        initialValues: {
            name: "",
            email: "",
            password: "",
            repeatPassword: "",
        },
        onSubmit: async (values) => {
            await register(values);

            navigate("/");
        },
    });

    return (
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

            <div>
                <NavLink className="flex font-semibold items-center gap-2 text-center " rel="stylesheet" to="/">
                    <FaArrowLeft />
                    Voltar
                </NavLink>
            </div>

            <h1 className="mb-2 text-center text-3xl font-bold">
                Registro
            </h1>

            <p className="mb-6 text-center text-gray-500">
                Crie sua conta no formulário abaixo
            </p>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                    <MainInput
                        label="Nome"
                        name="name"
                        placeholder="Digite seu nome"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.name}
                        error={formik.errors.name}
                    />
                </div>

                <div>
                    <MainInput
                        label="Email"
                        name="email"
                        placeholder="Digite seu email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.email}
                        error={formik.errors.email}
                    />
                </div>

                <div>
                    <MainInput
                        label="Senha"
                        name="password"
                        type="password"
                        placeholder="Digite sua senha"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.password}
                        error={formik.errors.password}
                    />
                </div>

                <div>
                    <MainInput
                        label="Repetir senha"
                        name="repeatPassword"
                        type="password"
                        placeholder="Digite novamente sua senha"
                        value={formik.values.repeatPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.repeatPassword}
                        error={formik.errors.repeatPassword}
                    />
                </div>

                <MainButton buttonText="Criar conta"></MainButton>

            </form>
        </div>
    );
}
import { FaArrowLeft } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

import { registerSchema } from "../schemas/RegisterSchema";
import { useFormik } from "formik";
import { MainButton } from "../../../shared/components/MainButton";
import { register } from "../api/auth_api";


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
                    <label className="mb-1 block text-sm font-medium">
                        Name
                    </label>

                    <input
                        type="name"
                        name="name"
                        placeholder="Digite seu nome"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                    />
                    {formik.touched.name && formik.errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                            {formik.errors.name}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Digite seu email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {formik.errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Senha
                    </label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Digite sua senha"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {formik.errors.password}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Repetir senha
                    </label>

                    <input
                        type="password"
                        name="repeatPassword"
                        placeholder="Digite novamente sua senha"
                        value={formik.values.repeatPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                    />
                    {formik.touched.repeatPassword && formik.errors.repeatPassword && (
                        <p className="mt-1 text-sm text-red-500">
                            {formik.errors.repeatPassword}
                        </p>
                    )}
                </div>

                <MainButton buttonText="Criar conta"></MainButton>

            </form>
        </div>
    );
}
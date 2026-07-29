import { useFormik } from "formik";
import { loginSchema } from "../schemas/LoginSchema";
import { NavLink, useNavigate } from "react-router-dom";
import { MainButton } from "../../../shared/components/MainButton";
import { MainInput } from "../../../shared/components/inputs/MainInput";
import { login } from "../api/auth_api";


export function LoginCard() {
    const navigate = useNavigate();

    const formik = useFormik({
        validationSchema: loginSchema,
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            try {
                const response = await login(values);
                localStorage.setItem(
                    "access_token",
                    response.access_token
                );

                navigate("/tickets", { state: { formData: values } });
            } catch {

            }


        },
    });

    return (
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
            <h1 className="mb-2 text-center text-3xl font-bold">
                Login
            </h1>

            <p className="mb-6 text-center text-gray-500">
                Entre para acessar seus tickets
            </p>

            <form onSubmit={formik.handleSubmit} className="space-y-4">

                <div>
                    <MainInput
                        label="Email"
                        name="email"
                        placeholder="Digite seu email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    {formik.touched.email && formik.errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {formik.errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <MainInput
                        label="Senha"
                        name="password"
                        placeholder="Digite seu password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    {formik.touched.password && formik.errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {formik.errors.password}
                        </p>
                    )}
                </div>

                <div>
                    <p className="text-xs text-gray-600">
                        Não possui uma conta?
                        <NavLink className="font-semibold text-blue-600 hover:underline" rel="stylesheet" to="/register">
                            Clique Aqui!
                        </NavLink>
                    </p>
                </div>

                <MainButton buttonText="Entrar"></MainButton>

            </form>
        </div>
    );
}
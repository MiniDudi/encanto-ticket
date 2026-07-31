import { useFormik } from "formik";
import { loginSchema } from "../schemas/LoginSchema";
import { NavLink, useNavigate } from "react-router-dom";
import { MainButton } from "../../../shared/components/MainButton";
import { MainInput } from "../../../shared/components/inputs/MainInput";
import logo from "../../../assets/encanto-telecom.png";
import { login } from "../api/auth_api";
import axios from "axios";

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

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.name)
                );

                navigate("/tickets", { state: { formData: values } });
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error(error.response?.data);

                    alert("Email ou senha inválido");
                } else {
                    alert("Oh oh! Algo deu errado.");
                }
            }


        },
    });

    return (
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

            <div className="mb-4 flex justify-center">
                <img
                    src={logo}
                    alt="Encanto Telecom"
                    className="h-20 w-auto"
                />
            </div>

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
                        touched={formik.touched.email}
                        error={formik.errors.email}
                    />
                </div>

                <div>
                    <MainInput
                        label="Senha"
                        name="password"
                        placeholder="Digite sua senha"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.password}
                        error={formik.errors.password}
                    />
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
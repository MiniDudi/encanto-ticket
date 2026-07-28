import * as Yup from "yup";

export const loginSchema = Yup.object({
    email: Yup.string()
        .email("Digite um e-mail válido")
        .required("O e-mail é obrigatório"),

    password: Yup.string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .required("A senha é obrigatória"),
});
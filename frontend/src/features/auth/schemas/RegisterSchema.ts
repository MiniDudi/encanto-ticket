import * as Yup from "yup";

export const registerSchema = Yup.object({
    name: Yup.string()
        .min(1)
        .required("O nome é obrigatório"),

    email: Yup.string()
        .email("Digite um e-mail válido")
        .required("O e-mail é obrigatório"),

    password: Yup.string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .required("A senha é obrigatória"),

    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'As senhas devem coincidir')
        .required("A senha é obrigatória"),
});
import * as Yup from "yup";

export const ticketSchema = Yup.object({
    title: Yup.string()
        .required("O título é obrigatório"),

    description: Yup.string(),

    status: Yup.string()
        .oneOf(
            ["aberto", "em_andamento", "resolvido"],
            "Status inválido"
        )
        .required("O status é obrigatório"),

    priority: Yup.string()
        .oneOf(
            ["baixa", "média", "alta"],
            "Prioridade inválida"
        )
        .required("A prioridade é obrigatória"),
});
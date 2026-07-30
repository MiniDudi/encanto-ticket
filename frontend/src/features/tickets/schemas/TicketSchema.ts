import * as Yup from "yup";
import { TicketPriority, TicketStatus } from "../types/ticket";

export const ticketSchema = Yup.object({
    title: Yup.string()
        .required("O título é obrigatório"),

    description: Yup.string(),

    status: Yup.string()
        .oneOf(
            Object.values(TicketStatus),
            "Status inválido"
        )
        .required("O status é obrigatório"),

    priority: Yup.string()
        .oneOf(
            Object.values(TicketPriority),
            "Prioridade inválida"
        )
        .required("A prioridade é obrigatória"),
});
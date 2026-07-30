import { api } from "../../../core/api/api";
import type { Ticket, TicketPriority } from "../types/ticket";

export async function getTickets(): Promise<Ticket[]> {
    const response = await api.get<Ticket[]>("/tickets");

    return response.data;
}

export async function getTicketById(
    id: number
) {
    const response = await api.get(`/tickets/${id}`);

    return response.data;
}

export async function createTicket(data: {
    title: string;
    description: string;
    priority: TicketPriority;
}) {
    const response = await api.post(
        "/tickets",
        data
    );

    return response.data;
}

export async function updateTicket(
    id: number,
    data: {
        title: string;
        description: string;
        priority: string;
    }
) {
    const response = await api.patch(
        `/tickets/${id}`,
        data
    );

    return response.data;
}

export async function deleteTicket(id: number) {
    const response = await api.delete(`/tickets/${id}`);

    return response.data;
}
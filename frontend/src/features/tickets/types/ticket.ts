export type TicketStatus =
    | "OPEN"
    | "IN_PROGRESS"
    | "RESOLVED";


export type TicketPriority =
    | "LOW"
    | "MEDIUM"
    | "HIGH";

export interface Ticket {
    id: number;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
}
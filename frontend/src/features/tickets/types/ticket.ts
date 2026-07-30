export enum TicketStatus {
    OPEN = "Aberto",
    IN_PROGRESS = "Em progresso",
    RESOLVED = "Resolvido",
}

export enum TicketPriority {
    LOW = "Baixo",
    MEDIUM = "Médio",
    HIGH = "Alto",
}

export interface Ticket {
    id: number;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
}
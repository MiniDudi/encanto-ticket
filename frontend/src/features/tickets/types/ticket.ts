export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: "aberto" | "em_andamento" | "resolvido";
  priority: "baixa" | "media" | "alta";
  createdAt: string;
  updatedAt: string;
}
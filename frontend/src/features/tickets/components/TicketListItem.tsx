import { FaCircle } from "react-icons/fa";
import { capitalizeFirstLetter } from "../../../shared/utils/StringUtils";
import type { Ticket } from "../types/ticket";
import { useNavigate } from "react-router-dom";

interface Props {
    ticket: Ticket;
}

function returnPriorityColor(priority: string) {
    switch (priority) {
        case "alta":
            return "red";
        case "media":
            return "orange";
        case "baixa":
            return "cyan";
    }
}

export function TicketListItem({ ticket }: Props) {
    const navigate = useNavigate();
    
    function goToNewTicket() {
        return navigate("/ticket/${ticket.id}/edit");
    }

    return (
        <div className="rounded-lg border bg-white p-4 shadow">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    {ticket.title}
                </h2>

                <span className="rounded bg-blue-100 px-3 py-1 text-sm">
                    {ticket.status == "em_andamento" ? `Em Andamento` : capitalizeFirstLetter(ticket.status)}
                </span>
            </div>

            <p className="mt-3 text-gray-600">
                {ticket.description}
            </p>

            <div className="mt-4 flex justify-between">
                <span className=" flex gap-4 items-center text-center font-medium">
                    <FaCircle color={returnPriorityColor(ticket.priority)}></FaCircle>
                    Prioridade: {ticket.priority}
                </span>

                <button onClick={goToNewTicket} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Editar
                </button>
            </div>
        </div>
    );
}
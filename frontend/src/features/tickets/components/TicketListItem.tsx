import { FaCircle } from "react-icons/fa";
import { capitalizeFirstLetter } from "../../../shared/utils/StringUtils";
import { type Ticket } from "../types/ticket";
import { useNavigate } from "react-router-dom";
import { returnPriorityColor } from "../utils/PriorityUtils";
import { returnStatusColor } from "../utils/StatusUtils";

interface Props {
    ticket: Ticket;
}

export function TicketListItem({ ticket }: Props) {
    const navigate = useNavigate();

    console.log(ticket.status);

    function goToEditTicket() {
        return navigate(`/ticket/${ticket.id}/edit`);
    }

    return (
        <div className="rounded-lg border bg-white p-4 shadow">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    {ticket.title}
                </h2>

                <span className={`rounded ${returnStatusColor(ticket.status)} px-3 py-1 text-sm`}>
                    {capitalizeFirstLetter(ticket.status)}
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

                <button onClick={goToEditTicket} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Editar
                </button>
            </div>
        </div>
    );
}
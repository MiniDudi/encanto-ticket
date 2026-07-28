import { FaPlus } from "react-icons/fa";
import { TicketListItem } from "../components/TicketListItem";
import { mockTickets } from "../mocks/mockTicket";
import { useNavigate } from "react-router-dom";

export function TicketListPage() {
const navigate = useNavigate();

    function goToNewTicket() {
        return navigate("/tickets/new");
    }

    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-between">

                <h1 className="mb-8 text-start text-3xl font-bold">
                    Lista de Tickets
                </h1>

                <button onClick={goToNewTicket} className="flex items-center gap-5 w-60 rounded-lg bg-blue-600 p-3 text-white transition hover:bg-blue-700" >
                    <FaPlus/> Criar Novo Ticket
                </button>

            </div>

            <div className="flex max-w-4xl flex-col gap-4">
                {mockTickets.map((ticket) => (
                    <TicketListItem
                        key={ticket.id}
                        ticket={ticket}
                    />
                ))}
            </div>
        </main>
    );
}
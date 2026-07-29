import { FaPlus } from "react-icons/fa";
import { TicketListItem } from "../components/TicketListItem";
import { useNavigate } from "react-router-dom";
import { MainInput } from "../../../shared/components/inputs/MainInput";
import { useState } from "react";
import { MainDropDown } from "../../../shared/components/inputs/MainDropDown";
import { useTickets } from "../hooks/useTickets";
import { ClipLoader } from "react-spinners";

export function TicketListPage() {
    const navigate = useNavigate();

    const { tickets, loading } = useTickets();

    const [filters, setFilters] = useState({
        title: "",
        status: "",
    });

    const itensFiltrados = tickets.filter((item) => {
        const matchesTitle = item.title
            .toLowerCase()
            .includes(filters.title.toLowerCase());

        const matchesStatus =
            filters.status === "" || item.status === filters.status;

        return matchesTitle && matchesStatus;
    });

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
                    <FaPlus /> Criar Novo Ticket
                </button>

            </div>

            <div className="flex items-center gap-4 w-100 mb-6">
                <MainDropDown
                    label=""
                    name="status"
                    value={filters.status}
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            status: e.target.value,
                        }))
                    }
                    options={[
                        { label: "Todos", value: "" },
                        { label: "Aberto", value: "aberto" },
                        { label: "Em andamento", value: "em_andamento" },
                        { label: "Resolvido", value: "resolvido" },
                    ]}
                />

                <MainInput
                    label=""
                    name="title"
                    placeholder="Título do ticket"
                    value={filters.title}
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            title: e.target.value,
                        }))
                    }
                    onBlur={() => { }}
                />
            </div>

            <div className="flex max-w-4xl flex-col gap-4">
                {loading ? (
                    <div className="flex items-center mb-6 w-200 justify-center gap-1">
                        <p>Carregando tickets...</p>
                        <ClipLoader
                            color="bg-black"
                            loading={loading}
                            size={25}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                ) : itensFiltrados.length == 0 ? (
                    <p>Não há tickets registrados!</p>
                ) : (
                    itensFiltrados.map((ticket) => (
                        <TicketListItem
                            key={ticket.id}
                            ticket={ticket}
                        />
                    ))
                )}
            </div>
        </main>
    );
}
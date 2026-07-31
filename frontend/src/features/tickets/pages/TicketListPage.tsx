import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import { TicketListItem } from "../components/TicketListItem";
import { useNavigate } from "react-router-dom";
import { MainInput } from "../../../shared/components/inputs/MainInput";
import { useState } from "react";
import { MainDropDown } from "../../../shared/components/inputs/MainDropDown";
import { useTickets } from "../hooks/useTickets";
import { ClipLoader } from "react-spinners";
import { TicketPriority, TicketStatus } from "../types/ticket";
import { MainButton } from "../../../shared/components/MainButton";
import logo from "../../../assets/encanto-telecom.png";

export function TicketListPage() {
    const navigate = useNavigate();

    const userName = JSON.parse(localStorage.getItem("user") ?? "{}");

    const { tickets, loading } = useTickets();

    const [filters, setFilters] = useState({
        title: "",
        status: "",
        priority: "",
    });

    const itensFiltrados = tickets.filter((item) => {
        const matchesTitle = item.title
            .toLowerCase()
            .includes(filters.title.toLowerCase());

        const matchesStatus =
            filters.status === "" || item.status === filters.status;

        const matchesPriority =
            filters.priority === "" || item.priority === filters.priority;

        return matchesTitle && matchesStatus && matchesPriority;
    });

    function goToNewTicket() {
        return navigate("/tickets/new");
    }

    function logout() {
        localStorage.removeItem("access_token");
        navigate("/");
    }

    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-between items-center">

                <h1 className="mb-8 text-start text-3xl font-bold">
                    Lista de Tickets
                </h1>

                <div>
                    <div className="flex items-center gap-3 mb-5">
                        <h2 className=" text-start text-2xl font-bold">
                            Olá, {userName}!
                        </h2>
                        <img
                            src={logo}
                            alt="Encanto Telecom"
                            className="h-10 w-auto mt-2"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-100">
                        <MainButton onClick={goToNewTicket} buttonText="Criar Novo Ticket" buttonColor="bg-blue-600" hoverColor="hover:bg-blue-700" prefixIcon={<FaPlus />} type="button" />
                        <div className="w-25">
                            <MainButton onClick={logout} buttonText="Sair" buttonColor="bg-red-600" hoverColor="hover:bg-red-700" prefixIcon={<FaSignOutAlt />} type="button" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-5 w-200 mb-6">
                <MainDropDown
                    label="Status"
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
                        { label: "Aberto", value: TicketStatus.OPEN },
                        { label: "Em progresso", value: TicketStatus.IN_PROGRESS },
                        { label: "Resolvido", value: TicketStatus.RESOLVED },
                    ]}
                />

                <MainDropDown
                    label="Prioridade"
                    name="priority"
                    value={filters.priority}
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            priority: e.target.value,
                        }))
                    }
                    options={[
                        { label: "Todos", value: "" },
                        { label: "Alto", value: TicketPriority.HIGH },
                        { label: "Médio", value: TicketPriority.MEDIUM },
                        { label: "Baixo", value: TicketPriority.LOW },
                    ]}
                />

                <div className="mt-5">
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
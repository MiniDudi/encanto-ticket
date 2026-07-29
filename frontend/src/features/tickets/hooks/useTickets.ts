import { useEffect, useState } from "react";
import { getTickets } from "../api/tickets_api";
import type { Ticket } from "../types/ticket";

export function useTickets() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchTickets() {
        try {
            setLoading(true);

            const data = await getTickets();

            setTickets(data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTickets();
    }, []);

    return {
        tickets,
        loading,
        refetch: fetchTickets,
    };
}
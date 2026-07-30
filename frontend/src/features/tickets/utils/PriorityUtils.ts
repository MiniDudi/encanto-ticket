export function returnPriorityColor(priority: string) {
    switch (priority) {
        case "Alto":
            return "red";
        case "Médio":
            return "orange";
        case "Baixo":
            return "cyan";
    }
}

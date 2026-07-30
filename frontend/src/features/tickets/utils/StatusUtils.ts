export function returnStatusColor(priority: string) {
    switch (priority) {
        case "Aberto":
            return "bg-blue-100";
        case "Em progresso":
            return "bg-yellow-100";
        case "Resolvido":
            return "bg-green-100";
    }
}

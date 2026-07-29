export function returnPriorityColor(priority: string) {
    switch (priority) {
        case "alta":
            return "red";
        case "media":
            return "orange";
        case "baixa":
            return "cyan";
    }
}

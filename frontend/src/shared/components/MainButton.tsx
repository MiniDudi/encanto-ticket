interface ButtonProps {
    buttonText: string;
    buttonColor?: string;
    hoverColor?: string;
    onClick?: () => void;
    disable?: boolean;
    type?: "button" | "submit";
}

export function MainButton({
    buttonText,
    buttonColor = "bg-blue-600",
    hoverColor = "hover:bg-blue-700",
    onClick,
    disable = false,
    type = "submit",
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disable}
            className={`w-full rounded-lg p-3 text-white transition ${buttonColor} ${hoverColor}`}
        >
            {buttonText}
        </button>
    );
}
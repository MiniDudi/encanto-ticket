interface ButtonProps {
    buttonText: string;
    buttonColor?: string;
    hoverColor?: string;
    onClick?: () => void;
    type?: "button" | "submit";
}

export function MainButton({
    buttonText,
    buttonColor = "bg-blue-600",
    hoverColor = "hover:bg-blue-700",
    onClick,
    type = "submit",
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`w-full rounded-lg p-3 text-white transition ${buttonColor} ${hoverColor}`}
        >
            {buttonText}
        </button>
    );
}
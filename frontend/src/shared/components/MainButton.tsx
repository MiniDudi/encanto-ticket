interface ButtonProps {
    buttonText: string;
    buttonColor?: string;
    hoverColor?: string;
}

export function MainButton({
    buttonText,
    buttonColor = "bg-blue-600",
    hoverColor = "hover:bg-blue-700",
}: ButtonProps) {
    return (
        <button
            className={`w-full rounded-lg p-3 text-white transition ${buttonColor} ${hoverColor}`}
        >
            {buttonText}
        </button>
    );
}
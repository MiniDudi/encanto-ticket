import type { ReactNode } from "react";

interface ButtonProps {
    buttonText: string;
    buttonColor?: string;
    hoverColor?: string;
    prefixIcon?: ReactNode;
    onClick?: () => void;
    disable?: boolean;
    type?: "button" | "submit";
}

export function MainButton({
    buttonText,
    buttonColor = "bg-blue-600",
    hoverColor = "hover:bg-blue-700",
    onClick,
    prefixIcon,
    disable = false,
    type = "submit",
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disable}
            className={`${prefixIcon ? `flex gap-3 items-center` : ``} w-full rounded-lg p-3 text-white transition ${buttonColor} ${hoverColor}`}
        >
            {prefixIcon}
            <span>
                {buttonText}
            </span>
        </button>
    );
}
interface ButtonProps {
    buttonText: string;
}

export function MainButton({ buttonText }: ButtonProps) {
    return (
        <button className="w-full rounded-lg bg-blue-600 p-3 text-white transition hover:bg-blue-700" >
            {buttonText}
        </button>
    )
}
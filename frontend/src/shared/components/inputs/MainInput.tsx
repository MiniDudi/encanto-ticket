interface MainInputProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    value?: string;
    error?: string;
    touched?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export function MainInput({
    label,
    name,
    type = "text",
    placeholder,
    value,
    error,
    touched,
    onChange,
    onBlur,
}: MainInputProps) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium">
                {label}
            </label>

            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`w-full rounded-lg border p-3 outline-none focus:border-blue-500 ${touched && error
                        ? "border-red-500"
                        : "border-black-300"
                    }`}
            />

            {touched && error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}
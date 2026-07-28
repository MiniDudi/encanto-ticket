interface MainInputProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
}

export function MainInput({
    label,
    name,
    type = "text",
    placeholder,
    value,
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
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            />
        </div>
    );
}
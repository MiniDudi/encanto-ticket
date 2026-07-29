interface MainTextAreaProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    onBlur: React.FocusEventHandler<HTMLTextAreaElement>;
}

export function MainTextArea({
    label,
    name,
    placeholder,
    value,
    onChange,
    onBlur,
}: MainTextAreaProps) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium">
                {label}
            </label>

            <textarea
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                rows={4}
            />
        </div>
    );
}
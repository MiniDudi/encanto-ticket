interface DropDownOption {
    label: string;
    value: string;
}

interface DropDownProps {
    label: string;
    name: string;
    value: string;
    options: DropDownOption[];
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export function MainDropDown({
    label,
    name,
    value,
    options,
    onChange,
}: DropDownProps) {
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-1 block text-sm font-medium"
            >
                {label}
            </label>

            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
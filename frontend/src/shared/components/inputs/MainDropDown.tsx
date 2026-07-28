interface DropDownnOptions {
    label: string;
    value: string;
}

interface DropDownProps {
    label: string;
    name: string;
    value: string;
    options: DropDownnOptions[];
    onChange: React.ChangeEventHandler<HTMLInputElement>;
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
            <p className="mb-2 text-sm font-medium">{label}</p>

            <div className="flex gap-6">
                {options.map((option) => (
                    <label
                        key={option.value}
                        className="flex cursor-pointer items-center gap-2"
                    >
                        <input
                            type=""
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={onChange}
                        />

                        <span>{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
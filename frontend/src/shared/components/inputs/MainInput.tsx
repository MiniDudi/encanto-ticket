import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
        type === "password"
            ? (showPassword ? "text" : "password")
            : type;
    return (
        <div>
            <label className="mb-1 block text-sm font-medium">
                {label}
            </label>

            <div className="relative">
                <input
                    type={inputType}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`w-full rounded-lg border bg-white p-3 ${type === "password" ? "pr-12" : ""
                        } outline-none focus:border-blue-500 ${touched && error
                            ? "border-red-500"
                            : "border-black-300"
                        }`}
                />

                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                )}
            </div>

            {touched && error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}
import { NavLink } from "react-router-dom";


export function LoginCard() {
    return (
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
            <h1 className="mb-2 text-center text-3xl font-bold">
                Login
            </h1>

            <p className="mb-6 text-center text-gray-500">
                Entre para acessar seus tickets
            </p>

            <form className="space-y-4">

                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Digite seu email"
                        className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Senha
                    </label>

                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <p className="text-xs text-gray-600">Não possui uma conta? <NavLink className="font-semibold text-blue-600 hover:underline" rel="stylesheet" to="/register">Clique Aqui!</NavLink> </p>
                </div>

                <button
                    className="w-full rounded-lg bg-blue-600 p-3 text-white transition hover:bg-blue-700"
                >
                    Entrar
                </button>

            </form>
        </div>
    );
}
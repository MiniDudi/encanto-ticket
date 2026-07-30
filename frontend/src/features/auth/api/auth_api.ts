import { api } from "../../../core/api/api";

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

interface LoginResponse {
    name: string
    access_token: string;
}


export async function login(
    data: LoginRequest
): Promise<LoginResponse> {

    const response = await api.post<LoginResponse>(
        "/auth/login",
        data
    );

    return response.data;
}

export async function register(
    data: RegisterRequest
): Promise<void> {
    await api.post<void>(
        "/auth/register",
        data
    );
}
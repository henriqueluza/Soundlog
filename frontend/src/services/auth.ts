import api from './api'

export async function register(username : string, email: string, password: string) {
    const response = await api.post('/auth/register', { username, email, password })
    return response.data // envia os dados de cadastro para o backend
}

export async function login(username : string, password: string) {
    const response = await api.post('/auth/login', { username, password })
    return response.data
}

export async function logout() {
    await api.post("/auth/logout") // remove o token do localStorage, fazendo logout no usuário
}
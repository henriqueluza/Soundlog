import api from './api'

export async function register(username : string, password: string, email: string) {
    const response = await api.post('/api/register', { username, email, password })
    return response.data
}

export async function login(username : string, password: string) {
    const response = await api.post('/api/login', { username, password })
    localStorage.setItem('token', response.data.access_token)
    return response.data
}

export async function logout() {
    localStorage.removeItem('token')
}
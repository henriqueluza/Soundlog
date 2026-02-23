import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000', // define o endereço do backend para comunicações
})

api.interceptors.request.use((config) => { // função interceptor do axios. É executada TODAS as vezes antes de uma requisição
    const token: string | null = localStorage.getItem('token') // busca um token do tipo string ou null na localStorage do navegador
    if (token) {
        config.headers.Authorization = `Bearer ${token}` // se o token existir, define a string de autorização com o tipo do token (bearer) e com o próprio token
    }
    return config
})

export default api // exporta a api
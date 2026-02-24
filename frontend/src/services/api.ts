import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000',// define o endereço do backend para comunicações
    withCredentials: true
})

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            return location.href='/login'
        }
        return Promise.reject(error)
    }
)

export default api // exporta a api
import { createContext, useContext, useState, useEffect} from "react";
import api from "../services/api";
import type {User, LoginRequest} from "../services/types.ts";
import { login, logout } from "../services/auth.ts";


interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    handleLogin: (data: LoginRequest) => Promise<void>;
    handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get("/auth/me").then(response => {
            setUser(response.data);

        })
            .catch(() => {
                setUser(null);
            })
            .finally(() => setIsLoading(false));

    }, [])

    const handleLogin = async (data: LoginRequest) => {
        await login(data.username, data.password) // chama auth.ts → seta o cookie
        const response = await api.get("/auth/me") // busca os dados do usuário
        setUser(response.data) // atualiza o contexto
    }

    const handleLogout = async () => {
        await logout() // chama auth.ts → apaga o cookie
        setUser(null) // limpa o contexto
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: user !== null, isLoading, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>

    )
}

export const useAuth = () => useContext(AuthContext);
import {Navigate} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext.tsx'

export default function ProtectedRoute({children}: {children: React.ReactNode}) {

   const {isAuthenticated, isLoading} = useAuth()

    if (isLoading) {
        return <div>Aguardando...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    return children

}
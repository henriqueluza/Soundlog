import { useEffect, useState } from "react";
import {Navigate, useParams} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import type {UserPublicResponse} from "../services/types.ts";


export default function Profile() {

    const {username} = useParams()
    const {user} = useAuth()
    const [profile, setProfile] = useState<UserPublicResponse | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        api.get(`/${username}/profile`).then((response) => {
            setProfile(response.data)
        }).catch(() => {
            setProfile(null)
        }
        ).finally(() => {
                setIsLoading(false)
            }
        );
    }, [username])

    if (isLoading) {
        return <div>Aguardando...</div>
    }

    if (profile == null) {
        return <div> Usuário não encontrado</div>
    }
    return (

    )
}

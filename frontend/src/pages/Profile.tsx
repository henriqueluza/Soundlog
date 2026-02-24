import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import type {UserPublicResponse} from "../services/types.ts";


export default function Profile() {

    const {username} = useParams()
    const {user} = useAuth()
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserPublicResponse | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'albums' | 'reviews' | 'lists'>('albums')

    const isOwnProfile = user?.username === username

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
        return (
            <div className="min-h-screen bg-[#030712] flex items-center justify-center">
                <p className="text-white/30 text-sm tracking-widest uppercase">Carregando...</p>
            </div>
        )
    }

    if (profile == null) {
        return (
            <div className="min-h-screen bg-[#030712] flex items-center justify-center">
                <p className="text-white/30 text-sm tracking-widest uppercase">Usuário não encontrado</p>
            </div>)
    }
    return (
        <div className="min-h-screen bg-[#030712] flex text-white">

            {/* SIDEBAR */}
            <aside className="w-[220px] border-r border-white/[0.06] px-5 py-7 flex flex-col gap-8 sticky top-0 h-screen flex-shrink-0">
                <div className="text-lg font-bold">
                    Sound<span className="text-emerald-500">log</span>
                </div>

                <nav className="flex flex-col gap-1">
                    <span className="text-[0.7rem] tracking-[1.5px] text-white/20 uppercase px-3 mb-1">Menu</span>
                    {[
                        { icon: '🏠', label: 'Home', path: '/home' },
                        { icon: '🔍', label: 'Descobrir', path: '/discover' },
                        { icon: '⭐', label: 'Favoritos', path: '/favorites' },
                        { icon: '📋', label: 'Minhas Listas', path: '/lists' },
                    ].map(item => (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/[0.04] transition-all text-left"
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </button>
                    ))}

                    <span className="text-[0.7rem] tracking-[1.5px] text-white/20 uppercase px-3 mt-4 mb-1">Social</span>
                    {[
                        { icon: '📰', label: 'Feed', path: '/feed' },
                        { icon: '👤', label: 'Perfil', path: `/${user?.username}/profile` },
                    ].map(item => (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left ${
                                item.label === 'Perfil'
                                    ? 'bg-emerald-500/10 text-emerald-500'
                                    : 'text-white/40 hover:text-white hover:bg-white/[0.04]'
                            }`}
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* usuário logado na sidebar */}
                <div className="mt-auto flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-900 flex-shrink-0" />
                    <div>
                        {/* CONECTAR: nome do usuário logado */}
                        <div className="text-sm font-semibold">{user?.username}</div>
                        <div className="text-[0.7rem] text-white/30">
                            {/* CONECTAR: total de álbuns do usuário logado */}
                            — álbuns
                        </div>
                    </div>
                </div>
            </aside>

            {/* CONTEÚDO PRINCIPAL */}
            <main className="flex-1 p-10 overflow-y-auto">

                {/* CARD DE PERFIL */}
                <div className="flex gap-8 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 mb-8 items-start">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-900 flex-shrink-0" />

                    <div className="flex-1">
                        {/* CONECTAR: nome e username do perfil visualizado */}
                        <h1 className="text-3xl font-bold tracking-tight">{profile.username}</h1>
                        <p className="text-white/30 text-sm mt-1">
                            @{profile.username} · membro desde {new Date(profile.created_at).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                        </p>

                        {/* CONECTAR: bio do usuário (adicionar campo no backend futuramente) */}
                        <p className="text-white/40 text-sm mt-3 leading-relaxed max-w-md">
                            —
                        </p>

                        {/* ESTATÍSTICAS */}
                        <div className="flex gap-6 mt-4">
                            {[
                                { num: '—', label: 'álbuns' },             // CONECTAR: total de álbuns avaliados
                                { num: '—', label: 'reviews' },            // CONECTAR: total de reviews
                                { num: profile.followers.length, label: 'seguidores' },
                                { num: profile.following.length, label: 'seguindo' },
                            ].map(stat => (
                                <div key={stat.label}>
                                    <div className="text-2xl font-bold">{stat.num}</div>
                                    <div className="text-[0.72rem] text-white/30 mt-0.5">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BOTÃO — muda dependendo de quem está vendo */}
                    <div className="flex flex-col gap-2">
                        {isOwnProfile ? (
                            <button
                                onClick={() => navigate('/settings')}
                                className="bg-white/[0.05] border border-white/10 text-white px-6 py-2.5 rounded-lg text-sm hover:bg-white/[0.08] transition-all whitespace-nowrap"
                            >
                                Editar perfil
                            </button>
                        ) : (
                            // CONECTAR: lógica de seguir/deixar de seguir
                            <button className="bg-emerald-500 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-600 transition-all whitespace-nowrap">
                                Seguir
                            </button>
                        )}
                    </div>
                </div>

                {/* LAYOUT DE DUAS COLUNAS */}
                <div className="grid grid-cols-[1fr_260px] gap-5">

                    {/* COLUNA ESQUERDA — tabs + grid */}
                    <div>
                        <div className="flex border-b border-white/[0.06] mb-5">
                            {(['albums', 'reviews', 'lists'] as const).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-3 text-sm border-b-2 transition-all ${
                                        activeTab === tab
                                            ? 'text-white border-emerald-500'
                                            : 'text-white/35 border-transparent hover:text-white/60'
                                    }`}
                                >
                                    {tab === 'albums' ? 'Álbuns' : tab === 'reviews' ? 'Reviews' : 'Listas'}
                                </button>
                            ))}
                        </div>

                        {/* GRID DE ÁLBUNS — CONECTAR com dados reais */}
                        {activeTab === 'albums' && (
                            <div className="grid grid-cols-5 gap-2.5">
                                {[
                                    { title: 'Dark Side', stars: '★★★★★', gradient: 'from-[#1a1a2e] to-[#16213e]' },
                                    { title: 'Rumours', stars: '★★★★½', gradient: 'from-[#2d1b69] to-[#11998e]' },
                                    { title: 'OK Computer', stars: '★★★★½', gradient: 'from-[#0f3460] to-[#533483]' },
                                    { title: 'Purple Rain', stars: '★★★★★', gradient: 'from-[#1a0533] to-[#4a0072]' },
                                    { title: 'Kind of Blue', stars: '★★★★★', gradient: 'from-[#003333] to-[#006666]' },
                                    { title: 'Thriller', stars: '★★★★★', gradient: 'from-[#1a0a00] to-[#4a1800]' },
                                    { title: 'Abbey Road', stars: '★★★★★', gradient: 'from-[#001a00] to-[#003300]' },
                                    { title: 'Nevermind', stars: '★★★★', gradient: 'from-[#1a0000] to-[#4a0000]' },
                                    { title: 'Blonde', stars: '★★★★½', gradient: 'from-[#1a1a00] to-[#3d3d00]' },
                                    { title: 'MBDTF', stars: '★★★★★', gradient: 'from-[#0a0a1a] to-[#1a1a3e]' },
                                ].map((album, i) => (
                                    <div
                                        key={i}
                                        className={`aspect-square rounded-lg bg-gradient-to-br ${album.gradient} relative overflow-hidden cursor-pointer group`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                            <div className="text-[0.65rem] font-semibold">{album.title}</div>
                                            <div className="text-emerald-400 text-[0.55rem]">{album.stars}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <p className="text-white/20 text-sm">— Nenhuma review ainda</p>
                        )}

                        {activeTab === 'lists' && (
                            <p className="text-white/20 text-sm">— Nenhuma lista ainda</p>
                        )}
                    </div>

                    {/* COLUNA DIREITA — distribuição de ratings */}
                    <div>
                        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
                            <h3 className="text-sm font-semibold mb-4">Distribuição de ratings</h3>
                            {/* CONECTAR: dados reais de distribuição de ratings */}
                            {[
                                { star: '★5', pct: '70%', count: 42 },
                                { star: '★4', pct: '50%', count: 31 },
                                { star: '★3', pct: '30%', count: 18 },
                                { star: '★2', pct: '15%', count: 9 },
                                { star: '★1', pct: '5%', count: 3 },
                            ].map(row => (
                                <div key={row.star} className="flex items-center gap-2.5 mb-2">
                                    <span className="text-[0.72rem] text-emerald-500 w-7 text-right flex-shrink-0">{row.star}</span>
                                    <div className="flex-1 h-2 bg-white/[0.05] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 rounded-full opacity-70"
                                            style={{ width: row.pct }}
                                        />
                                    </div>
                                    <span className="text-[0.7rem] text-white/25 w-5">{row.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </div>

    )
}

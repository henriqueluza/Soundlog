import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()

    return (
        <div className="flex min-h-screen bg-[#030712] text-white font-['Space_Grotesk']">

            {/* Sidebar */}
            <aside className="w-[220px] border-r border-white/[0.06] px-5 py-7 flex flex-col gap-8 sticky top-0 h-screen flex-shrink-0">
                <div className="text-xl font-bold tracking-tight">
                    Sound<span className="text-emerald-500">log</span>
                </div>

                <nav className="flex flex-col gap-1">
                    <div className="text-[10px] tracking-[1.5px] text-white/20 uppercase px-3 mb-1">Menu</div>
                    {[
                        { icon: '🏠', label: 'Home', active: true },
                        { icon: '🔍', label: 'Descobrir' },
                        { icon: '⭐', label: 'Favoritos' },
                        { icon: '📋', label: 'Minhas Listas' },
                    ].map((item) => (
                        <div key={item.label} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm cursor-pointer transition-all ${
                            item.active
                                ? 'bg-emerald-500/10 text-emerald-500'
                                : 'text-white/40 hover:bg-white/[0.04] hover:text-white'
                        }`}>
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </div>
                    ))}

                    <div className="text-[10px] tracking-[1.5px] text-white/20 uppercase px-3 mt-4 mb-1">Social</div>
                    {[
                        { icon: '📰', label: 'Feed' },
                        { icon: '👥', label: 'Amigos' },
                    ].map((item) => (
                        <div key={item.label} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm cursor-pointer text-white/40 hover:bg-white/[0.04] hover:text-white transition-all">
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </div>
                    ))}
                </nav>

                {/* Avatar */}
                <div className="mt-auto flex items-center gap-3 bg-white/[0.03] px-3 py-3 rounded-xl cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-900 flex-shrink-0" />
                    <div>
                        <div className="text-sm font-semibold">henrique</div>
                        <div className="text-[11px] text-white/30">142 álbuns</div>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 px-10 py-8 overflow-y-auto">

                {/* Topbar */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold">Boa tarde, Henrique 👋</h2>
                        <p className="text-white/30 text-sm mt-1">O que você quer ouvir hoje?</p>
                    </div>
                    <input
                        placeholder="Buscar álbum, artista..."
                        className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white/30 placeholder-white/20 outline-none focus:border-emerald-500/40 transition-all w-56 font-['Space_Grotesk']"
                    />
                </div>

                {/* Populares esta semana */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-base font-semibold">🔥 Populares esta semana</div>
                        <div className="text-emerald-500 text-sm cursor-pointer">Ver todos</div>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                        {[
                            { title: 'Dark Side', artist: 'Pink Floyd', stars: '★★★★★', bg: 'from-[#1a1a2e] to-[#16213e]' },
                            { title: 'Rumours', artist: 'Fleetwood Mac', stars: '★★★★½', bg: 'from-[#2d1b69] to-[#11998e]' },
                            { title: 'OK Computer', artist: 'Radiohead', stars: '★★★★½', bg: 'from-[#0f3460] to-[#533483]' },
                            { title: 'Purple Rain', artist: 'Prince', stars: '★★★★★', bg: 'from-[#1a0533] to-[#4a0072]' },
                            { title: 'Kind of Blue', artist: 'Miles Davis', stars: '★★★★★', bg: 'from-[#003333] to-[#006666]' },
                        ].map((album) => (
                            <div key={album.title} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 cursor-pointer hover:border-emerald-500/30 transition-all">
                                <div className={`w-full aspect-square rounded-lg bg-gradient-to-br ${album.bg} mb-3`} />
                                <div className="text-xs font-semibold truncate">{album.title}</div>
                                <div className="text-[11px] text-white/30 mt-0.5">{album.artist}</div>
                                <div className="text-emerald-500 text-[10px] mt-1">{album.stars}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Feed + Recomendações */}
                <div className="grid grid-cols-2 gap-5">

                    {/* Feed */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-base font-semibold">📰 Feed de atividade</div>
                            <div className="text-emerald-500 text-sm cursor-pointer">Ver todos</div>
                        </div>
                        <div className="flex flex-col gap-3">
                            {[
                                { user: 'maria', action: 'avaliou', item: 'Abbey Road', detail: '★★★★★', time: 'há 5 min' },
                                { user: 'joao', action: 'adicionou', item: 'Thriller', detail: 'aos favoritos', time: 'há 20 min' },
                                { user: 'ana', action: 'criou a lista', item: '"Para correr"', detail: '', time: 'há 1h' },
                            ].map((entry) => (
                                <div key={entry.time} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex gap-3">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-900 flex-shrink-0" />
                                    <div>
                                        <div className="text-sm font-semibold">{entry.user}</div>
                                        <div className="text-xs text-white/35 mt-0.5">
                                            {entry.action} <span className="text-white font-medium">{entry.item}</span> {entry.detail}
                                        </div>
                                        <div className="text-[10px] text-white/20 mt-1">{entry.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recomendações */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-base font-semibold">✨ Recomendados para você</div>
                            <div className="text-emerald-500 text-sm cursor-pointer">Ver todos</div>
                        </div>
                        <div className="flex flex-col gap-3">
                            {[
                                { title: 'Nevermind', reason: 'Porque você amou OK Computer', stars: '★★★★', bg: 'from-[#1a0a00] to-[#4a1800]' },
                                { title: 'Abbey Road', reason: 'Popular entre seus amigos', stars: '★★★★★', bg: 'from-[#001a00] to-[#003300]' },
                                { title: 'Blonde', reason: 'Baseado no seu gosto', stars: '★★★★½', bg: 'from-[#1a0000] to-[#4a0000]' },
                            ].map((rec) => (
                                <div key={rec.title} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex gap-3 items-center cursor-pointer hover:border-emerald-500/20 transition-all">
                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${rec.bg} flex-shrink-0`} />
                                    <div className="flex-1">
                                        <div className="text-sm font-semibold">{rec.title}</div>
                                        <div className="text-[11px] text-white/30 mt-0.5">{rec.reason}</div>
                                    </div>
                                    <div className="text-emerald-500 text-xs">{rec.stars}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </main>
        </div>
    )
}
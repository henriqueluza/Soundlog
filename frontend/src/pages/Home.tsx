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

                {/* Conteúdo aqui */}

            </main>
        </div>
    )
}
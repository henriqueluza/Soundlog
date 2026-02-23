import { useNavigate } from 'react-router-dom'
import dark_side from '../assets/Dark_Side_of_the_Moon.png'
import blonde from '../assets/blonde.jpg'
import abbey_road from '../assets/abbey_road.jpg'
import kind_of_blue from '../assets/kind_of_blue.png'
import ok_computer from '../assets/ok_computer.png'
import purple_rain from '../assets/purple_rain.jpg'
import rumours from '../assets/rumours.png'
import thriller from '../assets/thriller.jpg'
import nevermind from '../assets/nevermind.jpg'

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="bg-[#030712] min-h-screen text-white font-['Space_Grotesk'] overflow-x-hidden">

            {/* Círculos de fundo */}
            <div className="fixed w-[700px] h-[700px] bg-emerald-500 rounded-full blur-[100px] opacity-10 -top-72 -right-48 pointer-events-none" />
            <div className="fixed w-[500px] h-[500px] bg-emerald-900 rounded-full blur-[100px] opacity-10 -bottom-48 -left-24 pointer-events-none" />

            <nav className="flex justify-between items-center px-20 py-6 relative z-10">
                <div className="text-xl font-bold tracking-tight">
                    Sound<span className="text-emerald-500">log</span>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/login')}
                        className="border border-white/10 text-white/70 px-6 py-2 rounded-full text-sm cursor-pointer hover:border-white/30 transition-all"
                    >
                        Entrar
                    </button>
                    <button
                        onClick={() => navigate('/register')}
                        className="bg-emerald-500 text-white px-6 py-2 rounded-full text-sm font-semibold cursor-pointer hover:bg-emerald-600 transition-all"
                    >
                        Cadastrar grátis
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <section className="grid grid-cols-2 min-h-[calc(100vh-80px)] px-20 items-center gap-16 relative z-10">

                {/* Lado esquerdo */}
                <div>
                    <h1 className="text-6xl font-bold tracking-tight leading-tight mb-6">
                        Sua jornada musical,<br/>
                        <em className="not-italic text-emerald-500">documentada</em>.
                    </h1>
                    <p className="text-white/40 leading-relaxed mb-10 max-w-md">
                        Avalie álbuns e músicas, escreva reviews, crie listas e descubra novas obras com recomendações inteligentes.
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-emerald-500 text-white px-7 py-4 rounded-full font-semibold hover:bg-emerald-600 transition-all"
                        >
                            Criar conta grátis
                        </button>
                        <button className="border border-white/15 text-white px-7 py-4 rounded-full hover:border-white/30 transition-all">
                            Explorar
                        </button>
                    </div>
                </div>

                {/* Grid de álbuns */}
                <div className="grid grid-cols-3 gap-3" style={{ transform: 'perspective(800px) rotateY(-8deg) rotateX(4deg)' }}>
                    {[
                        { img: dark_side, title: 'Dark Side', stars: '★★★★★' },
                        { img: rumours, title: 'Rumours', stars: '★★★★½' },
                        { img: kind_of_blue, title: 'Kind of Blue', stars: '★★★★★' },
                        { img: purple_rain, title: 'Purple Rain', stars: '★★★★★' },
                        { img: ok_computer, title: 'OK Computer', stars: '★★★★½' },
                        { img: thriller, title: 'Thriller', stars: '★★★★★' },
                        { img: abbey_road, title: 'Abbey Road', stars: '★★★★★' },
                        { img: nevermind, title: 'Nevermind', stars: '★★★★' },
                        { img: blonde, title: 'Blonde', stars: '★★★★½' },
                    ].map((album, i) => (
                        <div key={i} className="rounded-lg aspect-square relative overflow-hidden">
                            <img src={album.img} alt={album.title} className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                                <div className="text-xs font-semibold truncate">{album.title}</div>
                                <div className="text-emerald-500 text-[10px]">{album.stars}</div>
                            </div>
                        </div>
                    ))}
                </div>

            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/[0.06] px-20 py-8 flex justify-between items-center">
                <div className="text-sm font-bold tracking-tight">
                    Sound<span className="text-emerald-500">log</span>
                </div>
                <p className="text-white/20 text-sm">© 2026 Soundlog. Todos os direitos reservados.</p>
                <div className="flex gap-6">
                    <span className="text-white/20 text-sm cursor-pointer hover:text-white/40 transition-all">Sobre</span>
                    <span className="text-white/20 text-sm cursor-pointer hover:text-white/40 transition-all">Contato</span>
                    <span className="text-white/20 text-sm cursor-pointer hover:text-white/40 transition-all">Privacidade</span>
                </div>
            </footer>

        </div>
    )
}
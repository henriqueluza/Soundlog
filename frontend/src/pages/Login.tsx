import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/auth'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleSubmit() {
        setError('')
        try {
            await login(username, password)
            navigate('/home')
        } catch {
            setError('Credenciais inválidas. Tente novamente.')
        }
    }

    return (
        <div className="min-h-screen bg-[#030712] flex items-center justify-center overflow-hidden relative">
            <div className="absolute w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[80px] opacity-15 -top-48 -left-48" />
            <div className="absolute w-[400px] h-[400px] bg-emerald-900 rounded-full blur-[80px] opacity-15 -bottom-24 -right-24" />
            <div className="absolute w-[300px] h-[300px] bg-emerald-600 rounded-full blur-[80px] opacity-15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="relative z-10 flex flex-col items-center gap-10">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-[3px] items-end h-5 mb-2">
                        {[10, 16, 20, 12, 18].map((h, i) => (
                            <div key={i} className="w-[3px] bg-emerald-500 rounded-sm" style={{ height: `${h}px` }} />
                        ))}
                    </div>
                    <h1 className="text-5xl font-bold text-white tracking-tight">
                        Sound<span className="text-emerald-500">log</span>
                    </h1>
                    <p className="text-white/30 text-xs tracking-[4px] uppercase">
                        bem-vindo de volta
                    </p>
                </div>

                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-10 w-[400px] flex flex-col gap-5">
                    <h2 className="text-lg font-bold text-white">Entrar</h2>

                    <input
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-5 py-4 text-white placeholder-white/20 outline-none focus:border-emerald-500/50 transition-all"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        autoComplete="current-password"
                        className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-5 py-4 text-white placeholder-white/20 outline-none focus:border-emerald-500/50 transition-all"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button onClick={handleSubmit} className="bg-emerald-500 text-white font-bold py-4 rounded-xl hover:bg-emerald-600 transition-all mt-1">
                        ENTRAR →
                    </button>

                    <p className="text-white/30 text-sm text-center">
                        Não tem conta?{' '}
                        <span onClick={() => navigate('/register')} className="text-emerald-500 cursor-pointer hover:text-emerald-400">
                            Cadastrar grátis
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}
import { useState } from "react";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true); // desestruturação de array

    return (
        <div className = "min-h-screen bg-[#030712] flex items-center justify-center overflow-hidden relative">
            <div className = "absolute w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[80px] opacity-15 -top-48 -left-48"></div>
            <div className = "absolute w-[400px] h-[400px] bg-emerald-900 rounded-full blur-[80px] opacity-15 -bottom-24 -right-24"></div>
            <div className = "absolute w-[300px] h-[300px] bg-emerald-600 rounded-full blur-[80px] opacity-15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

            <div className = "relative z-10 flex flex-col items-center gap-10">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-[3px] items-end h-5 mb-2">
                        {[10, 16, 20, 12, 18].map((h, i) => (
                            <div
                                key={i}
                                className="w-[3px] bg-emerald-500 rounded-sm"
                                style={{ height: `${h}px` }}
                            />
                        ))}
                    </div>
                    <h1 className="text-5xl font-bold text-white tracking-tight">
                        Sound<span className="text-emerald-500">log</span>
                    </h1>
                    <p className="text-white/30 text-xs tracking-[4px] uppercase">
                        avalie · descubra · compartilhe
                    </p>
                </div>
                {/* Card */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-10 w-[400px] flex flex-col gap-5">

                    {/* Toggle Entrar / Cadastrar */}
                    <div className="flex gap-6 border-b border-white/[0.08] pb-5">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`font-bold text-base pb-1 border-b-2 transition-all ${ /* renderização condicional com template literal - aplica diferentes estilos com base no valor do isLogin */
                                isLogin ? 'text-white border-emerald-500' : 'text-white/25 border-transparent'
                            }`}
                        >
                            Entrar
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`font-bold text-base pb-1 border-b-2 transition-all ${
                                !isLogin ? 'text-white border-emerald-500' : 'text-white/25 border-transparent'
                            }`}
                        >
                            Cadastrar
                        </button>
                    </div>

                    {/* Campos aqui depois */}

                </div>
            </div>
        </div>
    )
}
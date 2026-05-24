'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErro(data.erro || 'Erro ao fazer login')
        return
      }

      router.push('/admin/dashboard')
    } catch {
      setErro('Erro de conexão. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo / Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl mb-4 shadow-lg">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" fill="#F97316"/>
              <path d="M14 24L21 31L34 18" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">Painel Administrativo</h1>
          <p className="text-orange-100 text-lg font-semibold mt-1">Certo Atacado e Varejo</p>
        </div>

        {/* Card do formulário */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Campo email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@certoatacado.com.br"
                required
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
            </div>

            {/* Campo senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
            </div>

            {/* Mensagem de erro */}
            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                {erro}
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 text-sm transition shadow-lg"
            >
              {carregando ? 'Entrando...' : 'Entrar no painel'}
            </button>

          </form>
        </div>

        <p className="text-center text-orange-100 text-xs mt-6">
          Conexão segura — acesso restrito a administradores
        </p>
      </div>
    </div>
  )
}

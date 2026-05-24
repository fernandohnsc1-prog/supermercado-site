'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/encartes', label: 'Encartes', icon: '🗞️' },
  { href: '/admin/categorias', label: 'Categorias', icon: '📁' },
  { href: '/admin/temas', label: 'Temas & Cores', icon: '🎨' },
  { href: '/admin/sorteios', label: 'Sorteios', icon: '🎰' },
  { href: '/admin/produtos', label: 'Produtos', icon: '📦' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [saindo, setSaindo] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)

  if (pathname === '/admin/login') return <>{children}</>

  async function handleLogout() {
    setSaindo(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-orange-50 flex">

      {/* Mobile menu button */}
      <button
        onClick={() => setMenuAberto(!menuAberto)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-orange-600 text-white p-2 rounded-xl shadow-lg"
      >
        {menuAberto ? '✕' : '☰'}
      </button>

      {/* Overlay mobile */}
      {menuAberto && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMenuAberto(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-white border-r border-orange-100 flex flex-col fixed h-full z-40 shadow-lg transition-transform ${
        menuAberto ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>

        {/* Logo */}
        <div className="p-6 border-b border-orange-100 bg-gradient-to-r from-orange-600 to-orange-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" fill="#EB6E10"/>
                <path d="M14 24L21 31L34 18" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Certo Atacado</p>
              <p className="text-orange-200 text-xs">Painel Admin</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const ativo = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuAberto(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  ativo
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-700'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Botão logout */}
        <div className="p-4 border-t border-orange-100">
          <button
            onClick={handleLogout}
            disabled={saindo}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <span>🚪</span>
            {saindo ? 'Saindo...' : 'Sair do painel'}
          </button>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 pt-16 lg:pt-8">
        {children}
      </main>

    </div>
  )
}

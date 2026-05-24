'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/encartes', label: 'Encartes', icon: '🗞️' },
  { href: '/admin/temas', label: 'Temas & Cores', icon: '🎨' },
  { href: '/admin/sorteios', label: 'Sorteios', icon: '🎰' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [saindo, setSaindo] = useState(false)

  // Não aplica o layout na página de login
  if (pathname === '/admin/login') return <>{children}</>

  async function handleLogout() {
    setSaindo(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col fixed h-full">

        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-xl">
              🛒
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Certo Atacado</p>
              <p className="text-gray-500 text-xs">Painel Admin</p>
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
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  ativo
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Botão logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            disabled={saindo}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-orange-400 transition-all"
          >
            <span>🚪</span>
            {saindo ? 'Saindo...' : 'Sair do painel'}
          </button>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>

    </div>
  )
}
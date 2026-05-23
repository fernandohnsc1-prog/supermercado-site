import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase'

async function getDados() {
  const [encartes, temas, sorteios] = await Promise.all([
    supabaseAdmin.from('encartes').select('id', { count: 'exact' }),
    supabaseAdmin.from('temas').select('id', { count: 'exact' }),
    supabaseAdmin.from('sorteios').select('id', { count: 'exact' }),
  ])

  return {
    totalEncartes: encartes.count ?? 0,
    totalTemas: temas.count ?? 0,
    totalSorteios: sorteios.count ?? 0,
  }
}

export default async function DashboardPage() {
  const { totalEncartes, totalTemas, totalSorteios } = await getDados()

  const cards = [
    {
      label: 'Encartes ativos',
      valor: totalEncartes,
      icon: '🗞️',
      cor: 'bg-blue-600',
      href: '/admin/encartes',
    },
    {
      label: 'Temas cadastrados',
      valor: totalTemas,
      icon: '🎨',
      cor: 'bg-purple-600',
      href: '/admin/temas',
    },
    {
      label: 'Sorteios',
      valor: totalSorteios,
      icon: '🎰',
      cor: 'bg-green-600',
      href: '/admin/sorteios',
    },
  ]

  return (
    <div>
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Bem-vindo ao painel administrativo
        </p>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card.cor} rounded-xl flex items-center justify-center text-2xl`}>
                {card.icon}
              </div>
              <span className="text-gray-600 text-xs group-hover:text-gray-400 transition">
                Ver todos →
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{card.valor}</p>
            <p className="text-gray-400 text-sm mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Ações rápidas */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-4">Ações rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/encartes"
            className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 rounded-xl px-4 py-3 text-sm text-gray-300 hover:text-white transition"
          >
            <span>➕</span> Novo encarte
          </Link>
          <Link
            href="/admin/temas"
            className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 rounded-xl px-4 py-3 text-sm text-gray-300 hover:text-white transition"
          >
            <span>🎨</span> Mudar tema do site
          </Link>
          <Link
            href="/admin/sorteios"
            className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 rounded-xl px-4 py-3 text-sm text-gray-300 hover:text-white transition"
          >
            <span>🎰</span> Novo sorteio
          </Link>
        </div>
      </div>
    </div>
  )
}
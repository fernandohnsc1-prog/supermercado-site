import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase'

async function getDados() {
  const [encartes, temas, sorteios, produtos] = await Promise.all([
    supabaseAdmin.from('encartes').select('id', { count: 'exact' }),
    supabaseAdmin.from('temas').select('id', { count: 'exact' }),
    supabaseAdmin.from('sorteios').select('id', { count: 'exact' }),
    supabaseAdmin.from('produtos').select('id', { count: 'exact' }),
  ])

  return {
    totalEncartes: encartes.count ?? 0,
    totalTemas: temas.count ?? 0,
    totalSorteios: sorteios.count ?? 0,
    totalProdutos: produtos.count ?? 0,
  }
}

export default async function DashboardPage() {
  const { totalEncartes, totalTemas, totalSorteios, totalProdutos } = await getDados()

  const cards = [
    {
      label: 'Encartes ativos',
      valor: totalEncartes,
      icon: '🗞️',
      cor: 'bg-orange-500',
      href: '/admin/encartes',
    },
    {
      label: 'Temas cadastrados',
      valor: totalTemas,
      icon: '🎨',
      cor: 'bg-orange-600',
      href: '/admin/temas',
    },
    {
      label: 'Sorteios',
      valor: totalSorteios,
      icon: '🎰',
      cor: 'bg-orange-700',
      href: '/admin/sorteios',
    },
    {
      label: 'Produtos',
      valor: totalProdutos,
      icon: '📦',
      cor: 'bg-orange-800',
      href: '/admin/produtos',
    },
  ]

  return (
    <div>
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Bem-vindo ao painel administrativo do Certo Atacado
        </p>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white border border-orange-100 rounded-2xl p-6 hover:shadow-lg hover:border-orange-300 transition group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card.cor} rounded-xl flex items-center justify-center text-2xl shadow-md`}>
                {card.icon}
              </div>
              <span className="text-gray-400 text-xs group-hover:text-orange-500 transition">
                Ver todos →
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{card.valor}</p>
            <p className="text-gray-500 text-sm mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Ações rápidas */}
      <div className="bg-white border border-orange-100 rounded-2xl p-6">
        <h2 className="text-gray-800 font-semibold mb-4">Ações rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            href="/admin/encartes/novo"
            className="flex items-center gap-3 bg-orange-50 hover:bg-orange-100 rounded-xl px-4 py-3 text-sm text-orange-700 hover:text-orange-800 transition border border-orange-200"
          >
            <span>➕</span> Novo encarte
          </Link>
          <Link
            href="/admin/temas"
            className="flex items-center gap-3 bg-orange-50 hover:bg-orange-100 rounded-xl px-4 py-3 text-sm text-orange-700 hover:text-orange-800 transition border border-orange-200"
          >
            <span>🎨</span> Mudar tema do site
          </Link>
          <Link
            href="/admin/sorteios/novo"
            className="flex items-center gap-3 bg-orange-50 hover:bg-orange-100 rounded-xl px-4 py-3 text-sm text-orange-700 hover:text-orange-800 transition border border-orange-200"
          >
            <span>🎰</span> Novo sorteio
          </Link>
          <Link
            href="/admin/produtos/novo"
            className="flex items-center gap-3 bg-orange-50 hover:bg-orange-100 rounded-xl px-4 py-3 text-sm text-orange-700 hover:text-orange-800 transition border border-orange-200"
          >
            <span>📦</span> Novo produto
          </Link>
        </div>
      </div>
    </div>
  )
}

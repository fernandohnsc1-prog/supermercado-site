'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Produto {
  id: string
  nome: string
  descricao: string
  preco_varejo: number
  preco_atacado: number
  unidade: string
  imagem_url: string
  destaque: boolean
  ativo: boolean
  categoria: { nome: string; icone: string } | null
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [carregando, setCarregando] = useState(true)

  async function carregar() {
    const res = await fetch('/api/produtos')
    const data = await res.json()
    setProdutos(data)
    setCarregando(false)
  }

  useEffect(() => {
    let active = true
    fetch('/api/produtos')
      .then((r) => r.json())
      .then((data) => { if (active) { setProdutos(data); setCarregando(false) } })
    return () => { active = false }
  }, [])

  async function toggleAtivo(id: string, ativo: boolean) {
    await fetch(`/api/produtos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ativo: !ativo }),
    })
    carregar()
  }

  async function toggleDestaque(id: string, destaque: boolean) {
    await fetch(`/api/produtos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destaque: !destaque }),
    })
    carregar()
  }

  async function deletar(id: string) {
    if (!confirm('Deletar este produto?')) return
    await fetch(`/api/produtos/${id}`, { method: 'DELETE' })
    carregar()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
          <p className="text-gray-500 text-sm mt-1">Gerencie os produtos e promoções</p>
        </div>
        <Link
          href="/admin/produtos/novo"
          className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition shadow-md"
        >
          + Novo produto
        </Link>
      </div>

      {carregando ? (
        <p className="text-gray-500">Carregando...</p>
      ) : produtos.length === 0 ? (
        <div className="bg-white border border-orange-100 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">📦</p>
          <p className="text-gray-500">Nenhum produto cadastrado.</p>
          <Link href="/admin/produtos/novo" className="text-orange-600 text-sm mt-2 inline-block hover:underline">
            Criar primeiro produto
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {produtos.map((produto) => (
            <div key={produto.id} className="bg-white border border-orange-100 rounded-2xl p-4 hover:shadow-md transition">
              {produto.imagem_url && (
                <img src={produto.imagem_url} alt={produto.nome} className="w-full h-40 object-cover rounded-xl mb-3 border border-orange-50" />
              )}
              <div className="flex items-center gap-2 mb-1">
                {produto.categoria && (
                  <span className="text-xs text-gray-500">{produto.categoria.icone} {produto.categoria.nome}</span>
                )}
                {produto.destaque && (
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">Destaque</span>
                )}
              </div>
              <h3 className="text-gray-800 font-semibold">{produto.nome}</h3>
              <div className="flex items-center gap-3 mt-2">
                <div>
                  <p className="text-xs text-gray-400">Varejo</p>
                  <p className="text-orange-600 font-bold">R$ {Number(produto.preco_varejo).toFixed(2)}</p>
                </div>
                {produto.preco_atacado && (
                  <div>
                    <p className="text-xs text-gray-400">Atacado</p>
                    <p className="text-green-600 font-bold">R$ {Number(produto.preco_atacado).toFixed(2)}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-orange-50">
                <button onClick={() => toggleDestaque(produto.id, produto.destaque)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition ${produto.destaque ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
                  {produto.destaque ? 'Remover destaque' : 'Destacar'}
                </button>
                <button onClick={() => toggleAtivo(produto.id, produto.ativo)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition ${produto.ativo ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'}`}>
                  {produto.ativo ? 'Desativar' : 'Ativar'}
                </button>
                <button onClick={() => deletar(produto.id)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-500 transition ml-auto">
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

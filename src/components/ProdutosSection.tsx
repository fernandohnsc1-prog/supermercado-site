'use client'

import { useEffect, useState } from 'react'

interface Produto {
  id: string
  nome: string
  descricao: string
  preco_varejo: number
  preco_atacado: number
  unidade: string
  imagem_url: string | null
  categoria: { nome: string; icone: string } | null
}

export default function ProdutosSection() {
  const [produtos, setProdutos] = useState<Produto[]>([])

  useEffect(() => {
    fetch('/api/site')
      .then((r) => r.json())
      .then((data) => setProdutos(data.produtos ?? []))
  }, [])

  if (produtos.length === 0) return null

  return (
    <section id="produtos" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Produtos em Destaque
          </h2>
          <p className="text-gray-500 mt-2">Confira os melhores preços do atacado e varejo</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition group"
            >
              {produto.imagem_url ? (
                <img
                  src={produto.imagem_url}
                  alt={produto.nome}
                  className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-36 bg-orange-50 flex items-center justify-center text-4xl">
                  📦
                </div>
              )}
              <div className="p-3">
                {produto.categoria && (
                  <span className="text-[10px] text-gray-400">
                    {produto.categoria.icone} {produto.categoria.nome}
                  </span>
                )}
                <h3 className="text-gray-800 font-semibold text-sm leading-tight mt-1">{produto.nome}</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-gray-400">Varejo:</span>
                    <span className="text-orange-600 font-extrabold text-lg">
                      R$ {Number(produto.preco_varejo).toFixed(2)}
                    </span>
                  </div>
                  {produto.preco_atacado && (
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-gray-400">Atacado:</span>
                      <span className="text-green-600 font-bold text-sm">
                        R$ {Number(produto.preco_atacado).toFixed(2)}
                      </span>
                    </div>
                  )}
                  <span className="text-[10px] text-gray-400">{produto.unidade}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

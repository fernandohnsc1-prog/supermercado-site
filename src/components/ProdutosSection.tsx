'use client'

import { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Produto {
  id: string
  nome: string
  descricao: string
  preco_varejo: number
  preco_atacado: number
  unidade: string
  quantidade_atacado?: number | null
  imagem_url: string | null
  categoria: { nome: string; icone: string } | null
}

export default function ProdutosSection() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const { ref: revealRef, visible } = useScrollReveal()

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 3500, stopOnInteraction: true })]
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    let active = true
    fetch('/api/site')
      .then((r) => r.json())
      .then((data) => { if (active) setProdutos(data.produtos ?? []) })
    return () => { active = false }
  }, [])

  if (produtos.length === 0) return <section id="produtos" />

  return (
    <section id="produtos" className="py-16 bg-white">
      <div ref={revealRef} className={`max-w-7xl mx-auto px-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            Preços imbatíveis
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Produtos em Destaque
          </h2>
          <p className="text-gray-500 mt-2">Confira os melhores preços do atacado e varejo</p>
        </div>

        <div className="relative">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {produtos.map((produto) => (
                <div key={produto.id} className="embla__slide--3 px-3">
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
                    {produto.imagem_url ? (
                      <div className="aspect-square bg-white flex items-center justify-center overflow-hidden p-4">
                        <img
                          src={produto.imagem_url}
                          alt={produto.nome}
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center text-5xl">
                        📦
                      </div>
                    )}
                    <div className="p-4">
                      {produto.categoria && (
                        <span className="text-[10px] text-gray-400 font-medium">
                          {produto.categoria.icone} {produto.categoria.nome}
                        </span>
                      )}
                      <h3 className="text-gray-800 font-semibold text-sm leading-tight mt-1">{produto.nome}</h3>
                      <div className="mt-3 space-y-1">
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs text-gray-400">Varejo:</span>
                          <span className="text-orange-600 font-extrabold text-xl">
                            R$ {Number(produto.preco_varejo).toFixed(2)}
                          </span>
                        </div>
                        {produto.preco_atacado && (
                          <div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-xs text-gray-400">Atacado:</span>
                              <span className="text-green-600 font-bold text-sm">
                                R$ {Number(produto.preco_atacado).toFixed(2)}
                              </span>
                            </div>
                            {produto.quantidade_atacado && produto.quantidade_atacado > 1 && (
                              <span className="inline-block mt-1 text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                            A partir de {produto.quantidade_atacado} unidades no clube
                              </span>
                            )}
                          </div>
                        )}
                        <span className="text-[10px] text-gray-400">{produto.unidade}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white shadow-lg border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-orange-600 hover:border-orange-300 transition z-10"
          >
            ‹
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white shadow-lg border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-orange-600 hover:border-orange-300 transition z-10"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}

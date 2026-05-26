'use client'

import { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Imagem {
  id: string
  imagem_url: string
  ordem: number
}

interface Encarte {
  id: string
  titulo: string
  descricao: string
  data_fim: string
  categoria: { nome: string; icone: string; cor: string } | null
  imagens: Imagem[]
}

export default function EncartesSection() {
  const [encartes, setEncartes] = useState<Encarte[]>([])
  const [imagemAberta, setImagemAberta] = useState<string | null>(null)
  const { ref: revealRef, visible } = useScrollReveal()

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    let active = true
    fetch('/api/site')
      .then((r) => r.json())
      .then((data) => { if (active) setEncartes(data.encartes ?? []) })
    return () => { active = false }
  }, [])

  if (encartes.length === 0) return <section id="encartes" />

  return (
    <section id="encartes" className="py-16 bg-white">
      <div ref={revealRef} className={`max-w-7xl mx-auto px-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-3 animate-scaleIn">
            Ofertas da Semana
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Encartes
          </h2>
          <p className="text-gray-500 mt-2">Confira nossas ofertas imperdíveis!</p>
        </div>

        <div className="relative">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {encartes.map((encarte) => (
                <div key={encarte.id} className="embla__slide--3 px-3">
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
                    {encarte.imagens && encarte.imagens.length > 0 && (
                      <div className="relative cursor-pointer overflow-hidden" onClick={() => setImagemAberta(encarte.imagens[0].imagem_url)}>
                        <img
                          src={encarte.imagens[0].imagem_url}
                          alt={encarte.titulo}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {encarte.imagens.length > 1 && (
                          <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
                            +{encarte.imagens.length - 1} fotos
                          </span>
                        )}
                      </div>
                    )}
                    <div className="p-5">
                      {encarte.categoria && (
                        <span
                          className="text-xs font-medium px-2.5 py-1 rounded-full inline-block mb-2"
                          style={{
                            backgroundColor: encarte.categoria.cor + '22',
                            color: encarte.categoria.cor,
                          }}
                        >
                          {encarte.categoria.icone} {encarte.categoria.nome}
                        </span>
                      )}
                      <h3 className="text-gray-800 font-bold text-lg">{encarte.titulo}</h3>
                      {encarte.descricao && (
                        <p className="text-gray-500 text-sm mt-1">{encarte.descricao}</p>
                      )}
                      <p className="text-orange-600 text-xs font-medium mt-3">
                        Válido até {new Date(encarte.data_fim + 'T00:00:00').toLocaleDateString('pt-BR')}
                      </p>
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

      {imagemAberta && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setImagemAberta(null)}
        >
          <div className="relative max-w-4xl w-full animate-scaleIn">
            <img src={imagemAberta} alt="" className="w-full rounded-2xl" />
            <button
              onClick={() => setImagemAberta(null)}
              className="absolute top-4 right-4 bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold hover:bg-gray-100 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

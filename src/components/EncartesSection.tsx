'use client'

import { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import ImageViewer from './ImageViewer'

interface Imagem {
  id: string
  imagem_url: string
  ordem: number
}

interface Televendas {
  id: string
  whatsapp: string
  ativo: boolean
}

interface Encarte {
  id: string
  titulo: string
  descricao: string
  data_fim: string
  televendas: Televendas | null
  categoria: { nome: string; icone: string; cor: string } | null
  imagens: Imagem[]
}

export default function EncartesSection() {
  const [encartes, setEncartes] = useState<Encarte[]>([])
  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerImages, setViewerImages] = useState<Imagem[]>([])
  const [viewerTitulo, setViewerTitulo] = useState('')
  const [whatsAppUrl, setWhatsAppUrl] = useState<string | undefined>()
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

  const openViewer = useCallback((encarte: Encarte) => {
    setViewerImages(encarte.imagens)
    setViewerTitulo(encarte.titulo)
    // Se o encarte tem televendas ativo, cria URL com mensagem pré-definida
    if (encarte.televendas?.ativo && encarte.televendas.whatsapp) {
      const phone = encarte.televendas.whatsapp.replace(/\D/g, '')
      setWhatsAppUrl(`https://wa.me/${phone}?text=Vim%20pelo%20encarte%20do%20site%3A%20${encodeURIComponent(encarte.titulo)}`)
    } else {
      setWhatsAppUrl(undefined)
    }
    setViewerOpen(true)
  }, [])

  if (encartes.length === 0) return null

  return (
    <>
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
                        <div 
                          className="relative cursor-pointer overflow-hidden aspect-[4/3] bg-gray-100"
                          onClick={() => openViewer(encarte)}
                        >
                          <img
                            src={encarte.imagens[0].imagem_url}
                            alt={encarte.titulo}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* Overlay com ícone de zoom */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all duration-300">
                            <div className="bg-white/90 rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
                              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </div>
                          </div>
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
      </section>

      {viewerOpen && (
        <ImageViewer
          images={viewerImages}
          titulo={viewerTitulo}
          whatsAppUrl={whatsAppUrl}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </>
  )
}

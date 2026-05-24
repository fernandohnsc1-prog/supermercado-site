'use client'

import { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Sorteio {
  id: string
  titulo: string
  descricao: string
  imagem_url: string | null
  link_criterio: string | null
  descricao_link: string | null
  data_fim: string
}

export default function SorteiosSection() {
  const [sorteios, setSorteios] = useState<Sorteio[]>([])
  const [participando, setParticipando] = useState<string | null>(null)
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [enviando, setEnviando] = useState(false)
  const { ref: revealRef, visible } = useScrollReveal()

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    let active = true
    fetch('/api/site')
      .then((r) => r.json())
      .then((data) => { if (active) setSorteios(data.sorteios ?? []) })
    return () => { active = false }
  }, [])

  async function handleParticipar(sorteioId: string) {
    if (!nome || !telefone) {
      setMensagem('Preencha nome e telefone')
      return
    }
    setEnviando(true)
    setMensagem('')

    const res = await fetch(`/api/sorteios/${sorteioId}/participar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, telefone }),
    })

    const data = await res.json()
    if (res.ok) {
      setMensagem('Inscrição realizada com sucesso! Boa sorte!')
      setNome('')
      setTelefone('')
    } else {
      setMensagem(data.erro || 'Erro ao participar')
    }
    setEnviando(false)
  }

  if (sorteios.length === 0) return null

  return (
    <section id="sorteios" className="py-16 bg-orange-50">
      <div ref={revealRef} className={`max-w-7xl mx-auto px-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            Concorra a prêmios
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Sorteios
          </h2>
          <p className="text-gray-500 mt-2">Participe e concorra a prêmios incríveis!</p>
        </div>

        <div className="relative">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {sorteios.map((sorteio) => (
                <div key={sorteio.id} className="embla__slide--2 px-3">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-orange-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    {sorteio.imagem_url && (
                      <div className="overflow-hidden">
                        <img
                          src={sorteio.imagem_url}
                          alt={sorteio.titulo}
                          className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-gray-800 font-bold text-xl mb-2">{sorteio.titulo}</h3>
                      {sorteio.descricao && (
                        <p className="text-gray-500 text-sm mb-3">{sorteio.descricao}</p>
                      )}
                      <p className="text-orange-600 text-xs font-medium mb-4">
                        Participe até {new Date(sorteio.data_fim).toLocaleDateString('pt-BR')}
                      </p>

                      {sorteio.link_criterio && (
                        <a
                          href={sorteio.link_criterio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center text-sm font-semibold px-4 py-3 rounded-xl mb-4 hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
                        >
                          {sorteio.descricao_link || 'Cumprir critério para participar'}
                        </a>
                      )}

                      {participando === sorteio.id ? (
                        <div className="space-y-3 animate-fadeIn">
                          <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Seu nome completo"
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                          />
                          <input
                            type="tel"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            placeholder="(00) 00000-0000"
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                          />
                          {mensagem && (
                            <p className={`text-sm ${mensagem.includes('sucesso') ? 'text-green-600' : 'text-red-500'}`}>
                              {mensagem}
                            </p>
                          )}
                          <button
                            onClick={() => handleParticipar(sorteio.id)}
                            disabled={enviando}
                            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold rounded-xl py-3 text-sm transition shadow-md hover:shadow-lg"
                          >
                            {enviando ? 'Enviando...' : 'Confirmar participação'}
                          </button>
                          <button
                            onClick={() => { setParticipando(null); setMensagem('') }}
                            className="w-full text-gray-500 text-sm hover:text-gray-700 transition"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setParticipando(sorteio.id); setMensagem('') }}
                          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl py-3 text-base transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02]"
                        >
                          Quero participar!
                        </button>
                      )}
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

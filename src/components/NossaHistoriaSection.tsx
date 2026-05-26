'use client'

import { useEffect, useRef, useState } from 'react'

interface TimelineEvent {
  year: string
  title: string
  description: string
  icon: string
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '1976',
    title: 'Fundação do Grupo Müller',
    description:
      'O Grupo Müller foi fundado em 1976, em Taquara (RS), como uma empresa familiar do ramo supermercadista. O foco inicial era varejo tradicional. O grupo cresceu no Vale do Paranhana e manteve capital familiar.',
    icon: '🏗️',
  },
  {
    year: '1980–2000',
    title: 'Consolidação Local',
    description:
      'O grupo se consolidou em Taquara e região como supermercado tradicional, ampliando presença no varejo alimentar e fortalecendo-se no município ao longo de duas décadas.',
    icon: '📈',
  },
  {
    year: '2000–2010',
    title: 'Expansão Regional',
    description:
      'Expansão das operações no Vale do Paranhana, fortalecendo lojas da marca Rede Müller em Taquara e Parobé. A empresa passou a trabalhar com açougue, hortifruti, padaria e maior variedade de produtos.',
    icon: '🏪',
  },
  {
    year: '2018',
    title: 'Nasce o Certo Atacadista',
    description:
      'O Certo Atacadista de Taquara foi inaugurado na Av. Oscar Martins Rangel, bairro Santa Maria. A proposta era trabalhar como atacado e varejo (atacarejo), atendendo famílias e comerciantes da região com foco em preços baixos.',
    icon: '🎉',
  },
  {
    year: '2019',
    title: 'Grupo Müller entra no Atacarejo',
    description:
      'O Grupo Müller inaugurou seu primeiro atacarejo, o M+ Atacado & Super, em Taquara, em 4 de abril de 2019, com mais de 6 mil itens, 42 funcionários e estacionamento.',
    icon: '🚀',
  },
  {
    year: '2020–2021',
    title: 'Crescimento na Pandemia',
    description:
      'O modelo atacarejo ganhou força no Brasil. O Certo cresceu atendendo famílias e comerciantes buscando economia, enquanto o Grupo Müller expandia sua presença nesse formato.',
    icon: '💪',
  },
  {
    year: '2022',
    title: 'Grande Virada: Aquisição do Certo',
    description:
      'Em agosto de 2022, o Grupo Müller adquiriu o Certo Atacadista. A loja ganhou padaria e fiambreria, atendendo pedidos dos clientes, e já recebia cerca de mil clientes por dia.',
    icon: '🤝',
  },
  {
    year: '2023',
    title: 'Nasce "Certo Atacado & Varejo"',
    description:
      'Em março de 2023, o Grupo Müller anunciou a nova identidade visual: Certo Atacado & Varejo. As unidades M+ foram migradas para a marca Certo, unificando o negócio em Taquara e Parobé.',
    icon: '✨',
  },
  {
    year: '2024',
    title: 'Expansão e Fortalecimento',
    description:
      'A conversão para o formato Certo trouxe aumento de 42% no faturamento. O grupo anunciou planos de abrir novas unidades nos anos seguintes, consolidando a marca no mercado regional.',
    icon: '📊',
  },
  {
    year: '2025–2026',
    title: 'Consolidação da Marca',
    description:
      'O Grupo Müller opera lojas Certo Atacado & Varejo e Rede Müller com presença forte em Taquara e Parobé, com expansão do atacarejo, clube de vantagens, promoções e geração de empregos na região.',
    icon: '🏆',
  },
]

const lojas = [
  { cidade: 'Taquara', nome: 'Certo Atacado & Varejo – RS 115' },
  { cidade: 'Taquara', nome: 'Certo Atacado & Varejo – Picada Gravatá' },
  { cidade: 'Taquara', nome: 'Certo Atacado & Varejo – Av. Sebastião Amoretti' },
  { cidade: 'Parobé', nome: 'Certo Atacado & Varejo – Centro de Parobé' },
]

function useTimelineReveal() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisibleItems((prev) => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    )

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return { visibleItems, itemRefs }
}

export default function NossaHistoriaSection() {
  const { visibleItems, itemRefs } = useTimelineReveal()
  const [headerVisible, setHeaderVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true)
      },
      { threshold: 0.3 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="nossa-historia" className="py-20 bg-gradient-to-b from-orange-50 via-white to-orange-50 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            Quem somos
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800">
            Nossa História
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Uma trajetória de mais de 48 anos de tradição, crescimento e compromisso com a economia das famílias gaúchas.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Linha central */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-300 via-orange-500 to-orange-300 -translate-x-1/2 hidden md:block" />
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-300 via-orange-500 to-orange-300 md:hidden" />

          <div className="space-y-12 md:space-y-16">
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0
              const isVisible = visibleItems.has(index)

              return (
                <div
                  key={event.year}
                  ref={(el) => { itemRefs.current[index] = el }}
                  data-index={index}
                  className={`relative flex items-start md:items-center transition-all duration-700 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  {/* Mobile layout */}
                  <div className="md:hidden flex items-start gap-4 w-full pl-14">
                    {/* Dot on line */}
                    <div className="absolute left-4 top-1 w-5 h-5 rounded-full bg-orange-500 border-4 border-white shadow-lg z-10 flex items-center justify-center">
                      <div className={`w-2 h-2 rounded-full bg-white ${isVisible ? 'animate-ping-once' : ''}`} />
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-lg border border-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full group">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{event.icon}</span>
                        <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {event.year}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 w-full items-center">
                    {/* Left side */}
                    <div className={`${isLeft ? '' : 'order-3'}`}>
                      {isLeft && (
                        <div
                          className={`bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${
                            isVisible ? 'animate-slideInLeft' : 'opacity-0'
                          }`}
                          style={{ animationDelay: `${index * 80 + 200}ms`, animationFillMode: 'both' }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">{event.icon}</span>
                            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                              {event.year}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                        </div>
                      )}
                    </div>

                    {/* Center dot */}
                    <div className="relative flex flex-col items-center order-2">
                      <div className={`w-6 h-6 rounded-full bg-orange-500 border-4 border-white shadow-lg z-10 transition-transform duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`}>
                        <div className={`w-full h-full rounded-full ${isVisible ? 'animate-ping-once' : ''}`} style={{ background: 'rgba(249,115,22,0.4)' }} />
                      </div>
                    </div>

                    {/* Right side */}
                    <div className={`${isLeft ? 'order-3' : 'order-1'}`}>
                      {!isLeft && (
                        <div
                          className={`bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${
                            isVisible ? 'animate-slideInRight' : 'opacity-0'
                          }`}
                          style={{ animationDelay: `${index * 80 + 200}ms`, animationFillMode: 'both' }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">{event.icon}</span>
                            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                              {event.year}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Nossas Lojas */}
        <div className={`mt-20 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800">
              Nossas Lojas
            </h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-3 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lojas.map((loja) => (
              <div
                key={loja.nome}
                className="bg-white rounded-2xl p-5 shadow-md border border-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-colors">
                    <svg className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">{loja.cidade}</span>
                    <p className="text-gray-800 font-bold text-sm">{loja.nome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

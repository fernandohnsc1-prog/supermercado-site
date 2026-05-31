'use client'

import { useEffect, useRef, useState } from 'react'

const timeline = [
  {
    ano: '1976',
    titulo: 'Fundação do Grupo Müller',
    descricao: 'O Grupo Müller foi fundado em 1976, em Taquara (RS), como uma empresa familiar do ramo supermercadista. O foco inicial era varejo tradicional (mercado de bairro/supermercado). O grupo cresceu no Vale do Paranhana e manteve capital familiar.',
    icone: '🏗️',
    cor: 'from-amber-500 to-amber-600',
  },
  {
    ano: '1980–1990',
    titulo: 'Consolidação local',
    descricao: 'Nessa fase, o grupo foi se consolidando em Taquara e região como supermercado tradicional. A empresa ampliou presença no varejo alimentar e começou a se fortalecer no município.',
    icone: '📈',
    cor: 'from-orange-400 to-orange-500',
  },
  {
    ano: '2000–2010',
    titulo: 'Expansão regional',
    descricao: 'O Grupo Müller expandiu suas operações no Vale do Paranhana, fortalecendo lojas da marca Rede Müller e ganhando presença em Taquara e Parobé. A empresa passou a trabalhar com açougue, hortifruti, padaria e maior variedade de produtos.',
    icone: '🚀',
    cor: 'from-orange-500 to-orange-600',
  },
  {
    ano: '2018',
    titulo: 'Nasce o Certo Atacadista',
    descricao: 'O Certo Atacadista de Taquara foi aberto em 2018, na Avenida Oscar Martins Rangel, bairro Santa Maria. Criado pelos empresários Maurício Marcus Valandro e Adelina Teresinha Valandro, a proposta era trabalhar como atacado e varejo (atacarejo), atendendo famílias e comerciantes da região com foco em preços baixos e compra em volume.',
    icone: '🎉',
    cor: 'from-orange-600 to-red-500',
  },
  {
    ano: '2019',
    titulo: 'Grupo Müller entra no atacarejo',
    descricao: 'O Grupo Müller inaugurou seu primeiro atacarejo, chamado M+ Atacado & Super, em Taquara. A unidade abriu em 4 de abril de 2019, com mais de 6 mil itens, 42 funcionários, estacionamento e preços para varejo e atacado.',
    icone: '🏪',
    cor: 'from-red-500 to-red-600',
  },
  {
    ano: '2020–2021',
    titulo: 'Crescimento durante a pandemia',
    descricao: 'O modelo atacarejo ganhou força no Brasil inteiro, inclusive em Taquara. O Certo cresceu atendendo famílias e comerciantes buscando economia, enquanto o Grupo Müller expandia sua presença nesse formato.',
    icone: '💪',
    cor: 'from-orange-500 to-orange-600',
  },
  {
    ano: '2022',
    titulo: 'Grande virada: Grupo Müller compra o Certo',
    descricao: 'Em agosto de 2022, o Grupo Müller adquiriu o Certo Atacadista. O Certo de Taquara ganhou padaria e fiambreria, atendendo pedidos dos clientes. A loja já recebia cerca de mil clientes por dia, incluindo moradores da região e do interior.',
    icone: '🤝',
    cor: 'from-orange-600 to-orange-700',
  },
  {
    ano: '2023',
    titulo: 'Nasce "Certo Atacado & Varejo"',
    descricao: 'Em março de 2023, o Grupo Müller anunciou oficialmente a nova identidade visual: Certo Atacado & Varejo. O grupo decidiu migrar suas lojas atacadistas da marca M+ Atacado & Super para a marca Certo, unificando o negócio. Taquara e Parobé receberam a nova marca.',
    icone: '✨',
    cor: 'from-orange-500 to-amber-500',
  },
  {
    ano: '2024',
    titulo: 'Expansão e fortalecimento',
    descricao: 'A mudança para o modelo atacarejo trouxe forte crescimento financeiro. Uma conversão para o formato Certo trouxe aumento de 42% no faturamento, e o grupo anunciou planos de abrir novas unidades nos anos seguintes.',
    icone: '📊',
    cor: 'from-amber-500 to-yellow-500',
  },
  {
    ano: '2025–2026',
    titulo: 'Consolidação da marca',
    descricao: 'Hoje o Grupo Müller opera lojas da marca Certo Atacado & Varejo e Rede Müller, mantendo presença forte em Taquara e Parobé, com expansão do atacarejo, clube de vantagens, promoções e geração de empregos na região.',
    icone: '🏆',
    cor: 'from-yellow-500 to-orange-500',
  },
]

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const isLeft = index % 2 === 0

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`flex items-center w-full mb-8 md:mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      <div className={`w-full md:w-5/12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        style={{ transitionDelay: `${index * 100}ms` }}>
        <div className={`bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.cor} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
              {item.icone}
            </div>
            <div>
              <span className="text-orange-600 font-black text-lg">{item.ano}</span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">{item.titulo}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{item.descricao}</p>
        </div>
      </div>

      <div className="hidden md:flex w-2/12 justify-center relative">
        <div className={`w-5 h-5 bg-gradient-to-br ${item.cor} rounded-full border-4 border-white shadow-lg z-10 transition-all duration-500 ${visible ? 'scale-100' : 'scale-0'}`}
          style={{ transitionDelay: `${index * 100 + 200}ms` }} />
      </div>

      <div className="hidden md:block w-5/12" />
    </div>
  )
}

export default function NossaHistoriaSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true) },
      { threshold: 0.3 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="nossa-historia" className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div ref={headerRef} className={`text-center mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            Quem somos
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-800">
            Nossa História
          </h2>
          <p className="text-gray-500 mt-3 text-lg">A trajetória do Certo Atacado &amp; Varejo — do Grupo Müller até hoje</p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-300 via-orange-400 to-orange-300 -translate-x-1/2" />

          {timeline.map((item, i) => (
            <TimelineItem key={item.ano} item={item} index={i} />
          ))}
        </div>


      </div>
    </section>
  )
}

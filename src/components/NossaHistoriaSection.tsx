'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function NossaHistoriaSection() {
  const { ref, visible } = useScrollReveal()

  return (
    <section id="nossa-historia" className="py-20 bg-orange-50">
      <div ref={ref} className="max-w-5xl mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            Quem somos
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Nossa História
          </h2>
          <p className="text-gray-500 mt-2">Conheça a trajetória do Certo Atacado</p>
        </div>

        <div className={`bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-orange-100 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className={`transition-all duration-700 delay-300 ${visible ? 'animate-slideInLeft' : 'opacity-0'}`}>
              <div className="w-full h-64 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-orange-700/30 to-transparent" />
                <svg width="120" height="120" viewBox="0 0 48 48" fill="none" className="relative z-10 animate-float">
                  <circle cx="24" cy="24" r="22" fill="white" fillOpacity="0.3"/>
                  <path d="M14 24L21 31L34 17" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className={`transition-all duration-700 delay-500 ${visible ? 'animate-slideInRight' : 'opacity-0'}`}>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                O lugar certo de comprar barato
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                O Certo Atacado nasceu com a missão de oferecer os melhores preços do atacado e varejo
                para famílias e comerciantes da nossa região. Com comprometimento e respeito ao cliente,
                crescemos e nos tornamos referência em economia e qualidade.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nossa equipe trabalha diariamente para garantir que você encontre tudo o que precisa
                com preços que cabem no seu bolso, sem abrir mão da qualidade dos produtos.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Venha nos visitar e descubra por que somos o <strong className="text-orange-600">lugar certo
                de comprar barato</strong>!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

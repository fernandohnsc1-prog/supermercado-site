'use client'

import CertoLogo from './CertoLogo'

export default function HeroSection() {
  return (
    <section id="inicio" className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-yellow-300 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-orange-300 rounded-full blur-2xl animate-pulse [animation-delay:2s]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Logo com animação de entrada (puxado da esquerda) */}
          <div className="text-center lg:text-left animate-pullFromLeft">
            <CertoLogo size="xl" light />
          </div>

          {/* Mascote real puxando o logo */}
          <div className="relative animate-mascotEntrance hidden md:block">
            {/* Corda/conexão visual */}
            <div className="absolute left-0 top-1/2 -translate-x-full w-16 h-1 bg-gradient-to-l from-white/60 to-transparent animate-ropeWiggle origin-right" />

            <div className="relative w-56 h-56 lg:w-72 lg:h-72 animate-float">
              <img
                src="/mascote-certo.png"
                alt="Mascote Certo Atacado"
                className="w-full h-full object-contain drop-shadow-2xl"
              />

              {/* Balão de fala */}
              <div className="absolute -top-2 -right-2 bg-white text-orange-600 font-bold text-sm px-4 py-2 rounded-full shadow-lg animate-bounce [animation-duration:2s]">
                Vem! 🛒
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-xl md:text-2xl text-orange-100 max-w-2xl mx-auto text-center animate-fadeIn [animation-delay:0.8s] opacity-0">
          Os melhores preços do atacado e varejo para você e sua família!
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeIn [animation-delay:1.1s] opacity-0">
          <a
            href="#encartes"
            className="bg-white text-orange-600 font-bold px-10 py-4 rounded-2xl text-lg hover:bg-orange-50 hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Ver encartes
          </a>
          <a
            href="#sorteios"
            className="bg-orange-800/50 text-white font-bold px-10 py-4 rounded-2xl text-lg hover:bg-orange-800 hover:scale-105 transition-all duration-300 border border-orange-400/30"
          >
            Participar de sorteios
          </a>
        </div>
      </div>
    </section>
  )
}

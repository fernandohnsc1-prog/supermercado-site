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

          {/* Mascote SVG animada puxando o logo */}
          <div className="relative animate-mascotEntrance hidden md:block">
            {/* Corda/conexão visual */}
            <div className="absolute left-0 top-1/2 -translate-x-full w-16 h-1 bg-gradient-to-l from-white/60 to-transparent animate-ropeWiggle origin-right" />

            {/* Mascote - personagem estilizado */}
            <div className="relative w-48 h-48 lg:w-56 lg:h-56 animate-float">
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                {/* Corpo */}
                <circle cx="100" cy="90" r="50" fill="#FFD4A3" stroke="#F97316" strokeWidth="3"/>
                {/* Cabelo */}
                <ellipse cx="100" cy="55" rx="52" ry="30" fill="#5C3317"/>
                <ellipse cx="65" cy="70" rx="8" ry="25" fill="#5C3317"/>
                <ellipse cx="135" cy="70" rx="8" ry="25" fill="#5C3317"/>
                {/* Olhos */}
                <circle cx="82" cy="85" r="8" fill="white"/>
                <circle cx="118" cy="85" r="8" fill="white"/>
                <circle cx="84" cy="86" r="4" fill="#2D5016"/>
                <circle cx="120" cy="86" r="4" fill="#2D5016"/>
                <circle cx="85" cy="84" r="1.5" fill="white"/>
                <circle cx="121" cy="84" r="1.5" fill="white"/>
                {/* Boca sorrindo */}
                <path d="M88 102 Q100 115 112 102" fill="none" stroke="#D4522A" strokeWidth="2.5" strokeLinecap="round"/>
                {/* Bochechas */}
                <circle cx="72" cy="98" r="6" fill="#FFB5B5" opacity="0.5"/>
                <circle cx="128" cy="98" r="6" fill="#FFB5B5" opacity="0.5"/>
                {/* Avental/uniforme Certo */}
                <path d="M60 130 Q100 125 140 130 L145 180 Q100 185 55 180 Z" fill="#F97316" stroke="#EA580C" strokeWidth="2"/>
                {/* Checkmark no avental */}
                <path d="M88 155 L97 164 L115 146" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Braço esquerdo (puxando) */}
                <path d="M55 140 Q30 130 15 120" fill="none" stroke="#FFD4A3" strokeWidth="12" strokeLinecap="round"/>
                <circle cx="15" cy="118" r="8" fill="#FFD4A3" stroke="#F0C090" strokeWidth="1.5"/>
                {/* Braço direito */}
                <path d="M145 140 Q160 150 165 160" fill="none" stroke="#FFD4A3" strokeWidth="12" strokeLinecap="round"/>
                <circle cx="167" cy="162" r="8" fill="#FFD4A3" stroke="#F0C090" strokeWidth="1.5"/>
              </svg>

              {/* Balão de fala */}
              <div className="absolute -top-4 -right-4 bg-white text-orange-600 font-bold text-xs px-3 py-1.5 rounded-full shadow-lg animate-bounce [animation-duration:2s]">
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

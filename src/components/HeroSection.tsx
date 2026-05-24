'use client'

import CertoLogo from './CertoLogo'

export default function HeroSection() {
  return (
    <section id="inicio" className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-yellow-300 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-8 lg:gap-4">

          {/* Esquerda — Clube Mais Vantagens */}
          <div className="text-center lg:text-left animate-slideInLeft opacity-0 [animation-delay:0.3s]">
            <div className="inline-block mb-3">
              <span className="text-yellow-300 text-4xl">+</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase leading-tight">
              Clube <span className="text-yellow-300">Mais</span><br />Vantagens
            </h2>
            <div className="mt-2 flex items-center justify-center lg:justify-start gap-1">
              <CertoLogo size="sm" light />
            </div>
            <div className="mt-4 flex items-center justify-center lg:justify-start gap-3">
              <a href="#" className="bg-black/30 hover:bg-black/50 transition rounded-lg px-3 py-2 flex items-center gap-2 text-xs">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <div className="text-left leading-tight">
                  <div className="text-[8px] opacity-70">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </a>
              <a href="#" className="bg-black/30 hover:bg-black/50 transition rounded-lg px-3 py-2 flex items-center gap-2 text-xs">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.64.71.64 1.19s-.3.92-.64 1.19l-2.34 1.37-2.5-2.56 2.5-2.56 2.34 1.37zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/></svg>
                <div className="text-left leading-tight">
                  <div className="text-[8px] opacity-70">GET IT ON</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Centro — Logo + Mascotes */}
          <div className="text-center">
            <div className="animate-pullFromLeft">
              <CertoLogo size="xl" light />
            </div>
            <div className="relative mt-6 flex justify-center animate-mascotEntrance">
              <div className="relative w-56 h-56 lg:w-64 lg:h-64 animate-float">
                <img
                  src="/mascote-certo.png"
                  alt="Mascote Certo Atacado"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
                <div className="absolute -top-2 right-0 bg-white text-orange-600 font-bold text-sm px-4 py-2 rounded-full shadow-lg animate-bounce [animation-duration:2s]">
                  Vem! 🛒
                </div>
              </div>
            </div>
          </div>

          {/* Direita — Rede Müller */}
          <div className="text-center lg:text-right animate-slideInRight opacity-0 [animation-delay:0.3s]">
            <p className="text-sm font-medium tracking-widest uppercase opacity-80">Rede</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Müller</h2>
            <span className="inline-block w-2 h-2 bg-yellow-400 rotate-45 mt-1" />
            <p className="text-base italic opacity-80 mt-1">pra viver bem</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeIn [animation-delay:1.1s] opacity-0">
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

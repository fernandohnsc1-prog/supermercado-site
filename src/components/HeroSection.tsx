'use client'

import CertoLogo from './CertoLogo'
import { useTheme } from './ThemeProvider'

function withBgRemoval(url: string | null | undefined): string {
  if (!url) return '/mascote-certo.png'
  // Apply Cloudinary background removal transformation if it's a Cloudinary URL
  // Insert e_background_removal/q_auto,f_auto after /upload/ in the URL
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', '/upload/e_background_removal/q_auto,f_auto/')
  }
  return url
}

export default function HeroSection() {
  const tema = useTheme()

  const heroStyle = tema
    ? { background: `linear-gradient(to right, ${tema.cor_primaria}, ${tema.cor_secundaria}, ${tema.cor_primaria})` }
    : undefined

  return (
    <section id="inicio" className={`relative text-white overflow-hidden ${tema ? '' : 'bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600'}`} style={heroStyle}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-yellow-300 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-4 lg:gap-4">

          {/* Esquerda — Clube Mais Vantagens */}
          <div className="text-center lg:text-left animate-slideInLeft opacity-0 [animation-delay:0.3s]">
            <div className="inline-block mb-2">
              <span className="text-yellow-300 text-4xl font-bold">+</span>
            </div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-black uppercase leading-tight">
              Clube <span className="text-yellow-300">Mais</span><br />Vantagens
            </h2>
            <div className="mt-2 flex items-center justify-center lg:justify-start gap-1">
              <CertoLogo size="sm" light />
            </div>
            <div className="mt-3 flex items-center justify-center lg:justify-start gap-2">
              <a href="https://apps.apple.com/br/app/clube-vantagens/id1580602045" target="_blank" rel="noopener noreferrer" className="bg-black/30 hover:bg-black/50 transition rounded-lg px-3 py-2 flex items-center gap-2 text-xs">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <div className="text-left leading-tight">
                  <div className="text-[8px] opacity-70">Download on the</div>
                  <div className="font-semibold text-sm">App Store</div>
                </div>
              </a>
              <a href="https://play.google.com/store/apps/details?id=br.com.sysmo.b2c.muller" target="_blank" rel="noopener noreferrer" className="bg-black/30 hover:bg-black/50 transition rounded-lg px-3 py-2 flex items-center gap-2 text-xs">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.64.71.64 1.19s-.3.92-.64 1.19l-2.34 1.37-2.5-2.56 2.5-2.56 2.34 1.37zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/></svg>
                <div className="text-left leading-tight">
                  <div className="text-[8px] opacity-70">GET IT ON</div>
                  <div className="font-semibold text-sm">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Centro — Logo + Mascotes */}
          <div className="text-center">
            <div className="animate-pullFromLeft">
              <CertoLogo size="xl" light />
            </div>
            <div className="relative mt-3 flex justify-center animate-mascotEntrance">
              <div className="relative w-40 h-40 lg:w-48 lg:h-48 animate-float">
                <img
                  src={withBgRemoval(tema?.mascote_url)}
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
            <p className="text-sm md:text-base font-medium tracking-widest uppercase opacity-80">Rede</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight">Müller</h2>
            <span className="inline-block w-2 h-2 bg-yellow-400 rotate-45 mt-1" />
            <p className="text-sm md:text-base italic opacity-80 mt-1">pra viver bem</p>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fadeIn [animation-delay:1.1s] opacity-0">
          <a
            href="#encartes"
            className="bg-white text-orange-600 font-bold px-8 py-3 rounded-2xl text-base hover:bg-orange-50 hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Ver encartes
          </a>
          <a
            href="https://cartao.redemuller.com.br/cartao"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-orange-600 font-bold px-8 py-3 rounded-2xl text-base hover:bg-orange-50 hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zm-8-1h4v-2h-4v2zm-6-4h10v-2H6v2zm0-4h10V7H6v2z"/></svg>
            Pedir Cartão
          </a>
          <a
            href="#sorteios"
            className="bg-orange-800/50 text-white font-bold px-8 py-3 rounded-2xl text-base hover:bg-orange-800 hover:scale-105 transition-all duration-300 border border-orange-400/30"
          >
            Participar de sorteios
          </a>
        </div>
      </div>
    </section>
  )
}

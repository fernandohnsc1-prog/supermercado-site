import CertoLogo from './CertoLogo'

export default function HeroSection() {
  return (
    <section id="inicio" className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-yellow-300 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-orange-300 rounded-full blur-2xl animate-pulse [animation-delay:2s]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24 md:py-36 relative z-10">
        <div className="text-center">
          <div className="inline-block animate-fadeIn">
            <CertoLogo size="xl" light />
          </div>

          <p className="mt-10 text-xl md:text-2xl text-orange-100 max-w-2xl mx-auto animate-fadeIn [animation-delay:0.3s] opacity-0">
            Os melhores preços do atacado e varejo para você e sua família!
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeIn [animation-delay:0.6s] opacity-0">
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
      </div>
    </section>
  )
}

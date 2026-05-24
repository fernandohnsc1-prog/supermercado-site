import CertoLogo from './CertoLogo'

export default function HeroSection() {
  return (
    <section id="inicio" className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-yellow-300 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-orange-300 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="text-center">
          <div className="[&_span]:!text-white [&_.text-gray-800]:!text-white [&_.text-orange-600]:!text-orange-200 [&_.text-gray-500]:!text-orange-100 inline-block">
            <CertoLogo size="lg" />
          </div>

          <p className="mt-8 text-xl md:text-2xl text-orange-100 max-w-2xl mx-auto">
            Os melhores preços do atacado e varejo para você e sua família!
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#encartes"
              className="bg-white text-orange-600 font-bold px-8 py-4 rounded-2xl text-lg hover:bg-orange-50 transition shadow-xl"
            >
              Ver encartes
            </a>
            <a
              href="#sorteios"
              className="bg-orange-800/50 text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-orange-800 transition border border-orange-400/30"
            >
              Participar de sorteios
            </a>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full">
          <path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 45C1200 40 1320 30 1380 25L1440 20V80H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}

export default function NossaHistoriaSection() {
  return (
    <section id="nossa-historia" className="py-16 bg-orange-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Nossa História
          </h2>
          <p className="text-gray-500 mt-2">Conheça a trajetória do Certo Atacado</p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-orange-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="w-full h-64 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center">
                <svg width="120" height="120" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" fill="white" fillOpacity="0.3"/>
                  <path d="M14 24L21 31L34 17" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div>
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

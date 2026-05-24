import Link from 'next/link'

const lojas = [
  {
    nome: 'Taquara – Medianeira',
    endereco: 'R. Picada Gravatá, 1350',
    bairro: 'Medianeira, Taquara – RS',
    mapsLink: 'https://maps.google.com/?q=R.+Picada+Gravat%C3%A1,+1350+Medianeira+Taquara+RS',
  },
  {
    nome: 'Taquara – Santa Maria',
    endereco: 'Av. Oscar Martins Rangel, 3621',
    bairro: 'Santa Maria, Taquara – RS',
    mapsLink: 'https://maps.google.com/?q=Av.+Oscar+Martins+Rangel,+3621+Santa+Maria+Taquara+RS',
  },
  {
    nome: 'Parobé – Centro',
    endereco: 'R. Vera Cruz, 285, Sala 2',
    bairro: 'Centro, Parobé – RS',
    mapsLink: 'https://maps.google.com/?q=R.+Vera+Cruz,+285+Centro+Parob%C3%A9+RS',
  },
  {
    nome: 'Taquara – Centro',
    endereco: 'Av. Júlio de Castilhos, 2279',
    bairro: 'Centro, Taquara – RS',
    mapsLink: 'https://maps.google.com/?q=Av.+J%C3%BAlio+de+Castilhos,+2279+Centro+Taquara+RS',
  },
]

export default function SiteFooter() {
  return (
    <footer>
      {/* Nossas Lojas */}
      <div id="nossas-lojas" className="bg-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-3xl">🏪</span>
              <h2 className="text-3xl md:text-4xl font-black text-orange-600">Nossas Lojas</h2>
            </div>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-3 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {lojas.map((loja) => (
              <div key={loja.nome} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <a
                  href={loja.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block h-48 bg-gradient-to-br from-orange-400 to-orange-600 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-orange-500/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    <span className="text-white font-bold mt-2">Ver no Mapa</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="white"><path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z"/></svg>
                  </div>
                </a>
                <div className="p-5 text-center">
                  <h3 className="text-orange-600 font-bold text-lg mb-2">{loja.nome}</h3>
                  <p className="text-gray-600 text-sm">{loja.endereco}</p>
                  <p className="text-gray-500 text-sm">{loja.bairro}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer principal */}
      <div className="bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo e slogan */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#F97316" strokeWidth="0.5"/>
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-black tracking-tight">Certo</span>
                  <p className="text-orange-200 text-xs font-semibold tracking-wider">Atacado & Varejo</p>
                </div>
              </div>
              <p className="text-orange-100 text-sm mb-1">Lugar certo de comprar barato.</p>
              <p className="text-orange-200 text-sm">Qualidade e economia para você e sua família.</p>
            </div>

            {/* Informações */}
            <div>
              <h3 className="text-lg font-bold mb-1">Informações</h3>
              <div className="w-8 h-0.5 bg-orange-300 mb-4" />
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-200" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
                  <div>
                    <p className="font-bold text-sm">Horário de Funcionamento</p>
                    <p className="text-orange-100 text-sm">Seg a Dom: 8h–20h</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-200" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  <div>
                    <p className="font-bold text-sm">Localização</p>
                    <p className="text-orange-100 text-sm">Taquara, RS</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contato */}
            <div>
              <h3 className="text-lg font-bold mb-1">Contato</h3>
              <div className="w-8 h-0.5 bg-orange-300 mb-4" />
              <div className="space-y-3">
                <a href="mailto:contato@certoatacado.com" className="flex items-center gap-3 hover:text-orange-200 transition text-sm">
                  <svg className="w-5 h-5 flex-shrink-0 text-orange-200" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  contato@certoatacado.com
                </a>
                <a href="tel:+5551911198639" className="flex items-center gap-3 hover:text-orange-200 transition text-sm">
                  <svg className="w-5 h-5 flex-shrink-0 text-orange-200" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  (51) 9119-8639 — Fale Conosco
                </a>
                <a href="https://wa.me/5551970748458" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-orange-200 transition text-sm">
                  <svg className="w-5 h-5 flex-shrink-0 text-green-300" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
                  (51) 9707-8458 — Televendas
                </a>
                <a href="https://wa.me/5551947538382" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-orange-200 transition text-sm">
                  <svg className="w-5 h-5 flex-shrink-0 text-orange-200" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2 6.89 2 8V19C2 20.11 2.89 21 4 21H20C21.11 21 20 20.11 20 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4Z"/></svg>
                  (51) 9475-8382 — Trabalhe Conosco
                </a>
              </div>
            </div>

            {/* Redes Sociais */}
            <div>
              <h3 className="text-lg font-bold mb-1">Redes Sociais</h3>
              <div className="w-8 h-0.5 bg-orange-300 mb-4" />
              <div className="flex gap-3">
                <a href="https://facebook.com/certoatacado" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
                  <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://instagram.com/certoatacado" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
                  <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://linkedin.com/company/certoatacado" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
                  <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formas de Pagamento */}
      <div className="bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 pb-6">
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <h3 className="text-lg font-black text-gray-800 tracking-wider mb-6">FORMAS DE PAGAMENTO</h3>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
              {[
                { name: 'Visa', color: '#1A1F71', textColor: 'white' },
                { name: 'Master', color: '#EB001B', textColor: 'white' },
                { name: 'Amex', color: '#006FCF', textColor: 'white' },
                { name: 'Discover', color: '#FF6600', textColor: 'white' },
                { name: 'JCB', color: '#0B7B3E', textColor: 'white' },
                { name: 'Diners', color: '#004A97', textColor: 'white' },
                { name: 'Elo', color: '#000000', textColor: 'white' },
                { name: 'Hiper', color: '#F37021', textColor: 'white' },
                { name: 'PIX', color: '#32BCAD', textColor: 'white' },
              ].map((card) => (
                <span
                  key={card.name}
                  className="inline-flex items-center justify-center w-16 h-11 rounded-lg text-xs font-bold shadow-sm border border-gray-100"
                  style={{ backgroundColor: card.color, color: card.textColor }}
                >
                  {card.name}
                </span>
              ))}
            </div>
            <p className="text-gray-500 text-xs">* Aceitamos todas as principais bandeiras e cartões de benefícios.</p>
          </div>
        </div>
      </div>

      {/* Pesquisa de Satisfação */}
      <div className="bg-orange-100 border-t-4 border-orange-400">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center">
          <a
            href="#pesquisa"
            className="inline-flex items-center gap-2 text-orange-700 font-bold text-lg hover:text-orange-800 transition"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM6 20V4h6v6h6v10H6z"/></svg>
            Pesquisa de Satisfação
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-orange-700 border-t border-orange-600">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-orange-200 text-xs">
            © {new Date().getFullYear()} Certo Atacado & Varejo. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/politica-de-privacidade" className="text-orange-200 hover:text-white transition underline">
              Política de Privacidade
            </Link>
            <Link href="/termos-de-uso" className="text-orange-200 hover:text-white transition underline">
              Termos de Uso
            </Link>
            <Link href="/admin/login" className="text-orange-300 hover:text-white transition flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
              Acesso Restrito
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

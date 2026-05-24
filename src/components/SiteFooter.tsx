import Link from 'next/link'
import CertoLogo from './CertoLogo'

const lojas = [
  {
    nome: 'Loja Centro',
    endereco: 'Rua Principal, 123 - Centro',
    telefone: '(00) 0000-0000',
    mapsLink: 'https://maps.google.com',
  },
  {
    nome: 'Loja Bairro Novo',
    endereco: 'Av. Brasil, 456 - Bairro Novo',
    telefone: '(00) 0000-0000',
    mapsLink: 'https://maps.google.com',
  },
]

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div id="nossas-lojas" className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Nossas Lojas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {lojas.map((loja) => (
              <div key={loja.nome} className="bg-gray-700/50 rounded-2xl p-6 border border-gray-600 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-white font-semibold text-lg mb-2">{loja.nome}</h3>
                <p className="text-gray-400 text-sm mb-1">{loja.endereco}</p>
                <p className="text-gray-400 text-sm mb-4">{loja.telefone}</p>
                <div className="flex gap-3">
                  <a
                    href={loja.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition hover:scale-105"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    Google Maps
                  </a>
                  <a
                    href={`https://waze.com/ul?q=${encodeURIComponent(loja.endereco)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition hover:scale-105"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    Waze
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="mb-4 [&_span]:!text-white [&_.text-gray-800]:!text-white [&_.text-gray-500]:!text-gray-400">
              <CertoLogo size="sm" />
            </div>
            <p className="text-gray-400 text-sm">
              O lugar certo de comprar barato. Atacado e varejo com os melhores preços da região.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-orange-400 transition">Início</Link></li>
              <li><Link href="/#encartes" className="hover:text-orange-400 transition">Encartes</Link></li>
              <li><Link href="/#sorteios" className="hover:text-orange-400 transition">Sorteios</Link></li>
              <li><Link href="/#produtos" className="hover:text-orange-400 transition">Promoções</Link></li>
              <li><Link href="/nossa-historia" className="hover:text-orange-400 transition">Nossa História</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/fale-conosco" className="hover:text-orange-400 transition">Fale Conosco</Link></li>
              <li><Link href="/trabalhe-conosco" className="hover:text-orange-400 transition">Trabalhe Conosco</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Formas de pagamento</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Visa', 'Master', 'Elo', 'Hiper', 'Amex', 'PIX'].map((card) => (
                <span key={card} className="bg-gray-700 text-gray-300 text-xs px-3 py-1.5 rounded-lg border border-gray-600">
                  {card}
                </span>
              ))}
            </div>

            <a
              href="#pesquisa"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition hover:scale-105 mt-2"
            >
              Pesquisa de satisfação
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Certo Atacado e Varejo. Todos os direitos reservados.
          </p>
          <Link
            href="/admin/login"
            className="text-gray-600 hover:text-gray-400 text-xs transition"
          >
            Acesso restrito
          </Link>
        </div>
      </div>
    </footer>
  )
}

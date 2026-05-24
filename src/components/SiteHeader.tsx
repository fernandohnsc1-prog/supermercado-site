'use client'

import { useState } from 'react'
import Link from 'next/link'
import CertoLogo from './CertoLogo'

const menuItems = [
  { href: '/#inicio', label: 'Início' },
  { href: '/#encartes', label: 'Encartes' },
  { href: '/#sorteios', label: 'Sorteios' },
  { href: '/#produtos', label: 'Promoções' },
  { href: '/#nossa-historia', label: 'Nossa História' },
  { href: '/#fale-conosco', label: 'Fale Conosco' },
  { href: '/#trabalhe-conosco', label: 'Trabalhe Conosco' },
]

export default function SiteHeader() {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex-shrink-0">
            <CertoLogo size="sm" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-orange-600 transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="lg:hidden text-gray-600 p-2"
          >
            {menuAberto ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile nav */}
        {menuAberto && (
          <nav className="lg:hidden pb-4 border-t border-gray-100 pt-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuAberto(false)}
                className="block py-2 text-sm font-medium text-gray-600 hover:text-orange-600 transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

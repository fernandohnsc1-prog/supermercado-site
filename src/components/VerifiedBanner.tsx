'use client'

import { useTheme } from './ThemeProvider'

export default function VerifiedBanner() {
  const tema = useTheme()
  const src = tema?.verificados_url || '/verificados.png'

  return (
    <section className="bg-orange-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <img
          src={src}
          alt="Agora somos verificados — Nos siga para acompanhar tudo nessa nova etapa"
          className="w-full h-auto rounded-2xl shadow-lg animate-float"
        />
      </div>
    </section>
  )
}

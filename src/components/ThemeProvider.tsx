'use client'

import { useEffect, useState } from 'react'

interface Tema {
  cor_primaria: string
  cor_secundaria: string
  cor_fundo: string
  cor_texto: string
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [tema, setTema] = useState<Tema | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetch('/api/site')
      .then((r) => r.json())
      .then((data) => {
        if (data.tema) {
          setTema(data.tema)
        }
      })
      .catch(() => {
        // Silently fail - use default theme
      })
  }, [])

  // Apply theme CSS variables
  useEffect(() => {
    if (tema) {
      document.documentElement.style.setProperty('--tema-cor-primaria', tema.cor_primaria)
      document.documentElement.style.setProperty('--tema-cor-secundaria', tema.cor_secundaria)
      document.documentElement.style.setProperty('--tema-cor-fundo', tema.cor_fundo)
      document.documentElement.style.setProperty('--tema-cor-texto', tema.cor_texto)
    }
  }, [tema])

  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}
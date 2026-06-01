'use client'

import { useEffect, useState, createContext, useContext } from 'react'

interface Tema {
  cor_primaria: string
  cor_secundaria: string
  cor_fundo: string
  cor_texto: string
  mascote_url?: string | null
  verificados_url?: string | null
}

const ThemeContext = createContext<Tema | null>(null)

export function useTheme() {
  return useContext(ThemeContext)
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '0 0 0'
  return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [tema, setTema] = useState<Tema | null>(null)

  useEffect(() => {
    let active = true
    fetch('/api/site')
      .then((r) => r.json())
      .then((data) => {
        if (active && data.tema) {
          setTema(data.tema)
        }
      })
      .catch(() => {})
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!tema) return
    const root = document.documentElement

    root.style.setProperty('--theme-primary', tema.cor_primaria)
    root.style.setProperty('--theme-secondary', tema.cor_secundaria)
    root.style.setProperty('--theme-bg', tema.cor_fundo)
    root.style.setProperty('--theme-text', tema.cor_texto)

    root.style.setProperty('--theme-primary-rgb', hexToRgb(tema.cor_primaria))
    root.style.setProperty('--theme-secondary-rgb', hexToRgb(tema.cor_secundaria))
  }, [tema])

  return (
    <ThemeContext.Provider value={tema}>
      {children}
    </ThemeContext.Provider>
  )
}

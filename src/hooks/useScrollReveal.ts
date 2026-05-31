'use client'

import { useCallback, useRef, useState } from 'react'

export function useScrollReveal(threshold = 0.15) {
  const [visible, setVisible] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const ref = useCallback(
    (el: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }

      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(el)
          }
        },
        { threshold }
      )

      observer.observe(el)
      observerRef.current = observer
    },
    [threshold]
  )

  return { ref, visible }
}

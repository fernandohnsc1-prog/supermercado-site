'use client'

import Image from 'next/image'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function VerificadosSection() {
  const { ref, visible } = useScrollReveal()

  return (
    <section className="bg-orange-500 overflow-hidden">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <Image
          src="/somos-verificados.png"
          alt="Agora somos verificados — Nos siga para acompanhar tudo nessa nova etapa"
          width={1920}
          height={600}
          className="w-full h-auto object-cover"
          priority
        />
      </div>
    </section>
  )
}

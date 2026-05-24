export default function CertoLogo({ size = 'lg', light = false }: { size?: 'sm' | 'md' | 'lg' | 'xl'; light?: boolean }) {
  const sizes = {
    sm: { text: 'text-3xl', o: 26, check: 2.5, sub: 'text-xs', slogan: 'text-[10px]' },
    md: { text: 'text-5xl', o: 40, check: 3, sub: 'text-base', slogan: 'text-xs' },
    lg: { text: 'text-7xl', o: 56, check: 4, sub: 'text-xl', slogan: 'text-sm' },
    xl: { text: 'text-8xl md:text-9xl', o: 72, check: 4.5, sub: 'text-2xl md:text-3xl', slogan: 'text-base md:text-lg' },
  }
  const s = sizes[size]
  const textColor = light ? 'text-white' : 'text-gray-800'
  const subColor = light ? 'text-orange-200' : 'text-orange-600'
  const sloganColor = light ? 'text-orange-100' : 'text-gray-500'

  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex items-baseline">
        <span className={`${s.text} font-black ${textColor} tracking-tighter drop-shadow-sm`}>Cert</span>
        <span className="inline-flex items-center justify-center relative" style={{ width: s.o, height: s.o }}>
          <svg width={s.o} height={s.o} viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" fill="#F97316"/>
            <path d="M14 24L21 31L34 17" stroke="white" strokeWidth={s.check} strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      <span className={`${s.sub} font-bold ${subColor} uppercase tracking-[0.2em] -mt-1`}>
        Atacado e Varejo
      </span>
      <span className={`${s.slogan} ${sloganColor} italic`}>
        Lugar certo de comprar barato
      </span>
    </div>
  )
}

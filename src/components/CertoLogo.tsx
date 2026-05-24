export default function CertoLogo({ size = 'lg' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { text: 'text-2xl', o: 20, check: 2.5, sub: 'text-xs', slogan: 'text-[10px]' },
    md: { text: 'text-4xl', o: 32, check: 3, sub: 'text-sm', slogan: 'text-xs' },
    lg: { text: 'text-5xl', o: 44, check: 4, sub: 'text-lg', slogan: 'text-sm' },
  }
  const s = sizes[size]

  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex items-baseline">
        <span className={`${s.text} font-extrabold text-gray-800 tracking-tight`}>Cert</span>
        <span className="inline-flex items-center justify-center relative" style={{ width: s.o, height: s.o }}>
          <svg width={s.o} height={s.o} viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" fill="#F97316"/>
            <path d="M14 24L21 31L34 17" stroke="white" strokeWidth={s.check} strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      <span className={`${s.sub} font-bold text-orange-600 uppercase tracking-widest -mt-1`}>
        Atacado e Varejo
      </span>
      <span className={`${s.slogan} text-gray-500 italic`}>
        Lugar certo de comprar barato
      </span>
    </div>
  )
}

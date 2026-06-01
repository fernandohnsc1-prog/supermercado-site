'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Imagem {
  id: string
  imagem_url: string
  ordem: number
}

interface Encarte {
  id: string
  titulo: string
  descricao: string
  data_fim: string
  categoria: { nome: string; icone: string; cor: string } | null
  imagens: Imagem[]
}

const TELEVENDAS = '555197078458'
const TELEVENDAS_MSG = encodeURIComponent('Olá! Vim pelo encarte do site e gostaria de mais informações.')
const TELEVENDAS_LINK = `https://wa.me/${TELEVENDAS}?text=${TELEVENDAS_MSG}`

function isTelevendas(encarte: Encarte): boolean {
  return (encarte.categoria?.nome ?? '').toLowerCase().includes('televendas')
}

function ShareButtons({ titulo, imageUrl }: { titulo: string; imageUrl?: string }) {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const texto = encodeURIComponent(`Confira o encarte "${titulo}" do Certo Atacado! ${siteUrl}`)
  const url = encodeURIComponent(siteUrl)

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-400">Compartilhar:</span>
      <a
        href={`https://wa.me/?text=${texto}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition"
        title="WhatsApp"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${texto}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
        title="Facebook"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      </a>
      {imageUrl && (
        <a
          href={imageUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition"
          title="Salvar imagem (compartilhe no Instagram)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3"/></svg>
        </a>
      )}
    </div>
  )
}

function TelevendasButton({ compact }: { compact?: boolean }) {
  return (
    <a
      href={TELEVENDAS_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition ${compact ? 'text-xs px-3 py-2' : 'text-sm px-4 py-2.5 rounded-xl gap-2'}`}
    >
      <svg className={compact ? 'w-4 h-4' : 'w-5 h-5'} fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      {compact ? 'Televendas' : 'Televendas — Vim pelo encarte'}
    </a>
  )
}

export default function EncartesSection() {
  const [encartes, setEncartes] = useState<Encarte[]>([])
  const [encarteAberto, setEncarteAberto] = useState<Encarte | null>(null)
  const [imagemIdx, setImagemIdx] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const modalRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { ref: revealRef, visible } = useScrollReveal()

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    let active = true
    fetch('/api/site')
      .then((r) => r.json())
      .then((data) => { if (active) setEncartes(data.encartes ?? []) })
    return () => { active = false }
  }, [])

  // Track native fullscreen changes (e.g. user pressing Esc)
  useEffect(() => {
    function onFsChange() { setFullscreen(!!document.fullscreenElement) }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  const fecharEncarte = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.()
    setEncarteAberto(null)
    setZoom(1)
  }, [])

  const irParaPagina = useCallback((idx: number, total: number) => {
    setImagemIdx(Math.max(0, Math.min(total - 1, idx)))
    setZoom(1)
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [])

  // Keyboard navigation while viewer is open
  useEffect(() => {
    if (!encarteAberto) return
    const total = encarteAberto.imagens.length
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && !document.fullscreenElement) fecharEncarte()
      else if (e.key === 'ArrowLeft') irParaPagina(imagemIdx - 1, total)
      else if (e.key === 'ArrowRight') irParaPagina(imagemIdx + 1, total)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [encarteAberto, imagemIdx, fecharEncarte, irParaPagina])

  function abrirEncarte(encarte: Encarte) {
    setEncarteAberto(encarte)
    setImagemIdx(0)
    setZoom(1)
  }

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) await modalRef.current?.requestFullscreen?.()
      else await document.exitFullscreen?.()
    } catch {
      // Fullscreen API may be blocked; ignore silently
    }
  }

  function handleZoom(delta: number) {
    setZoom((prev) => Math.max(1, Math.min(4, Math.round((prev + delta) * 100) / 100)))
  }

  function handleDoubleClick() {
    setZoom((prev) => (prev === 1 ? 2.5 : 1))
  }

  if (encartes.length === 0) return <section id="encartes" />

  return (
    <section id="encartes" className="py-16 bg-white">
      <div ref={revealRef} className={`max-w-7xl mx-auto px-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-3 animate-scaleIn">
            Ofertas da Semana
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Encartes
          </h2>
          <p className="text-gray-500 mt-2">Confira nossas ofertas imperdíveis!</p>
        </div>

        <div className="relative">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {encartes.map((encarte) => (
                <div key={encarte.id} className="embla__slide--3 px-3">
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
                    {encarte.imagens && encarte.imagens.length > 0 && (
                      <div
                        className="relative cursor-pointer overflow-hidden aspect-[3/4]"
                        onClick={() => abrirEncarte(encarte)}
                      >
                        <img
                          src={encarte.imagens[0].imagem_url}
                          alt={encarte.titulo}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-gray-800 font-semibold text-sm px-4 py-2 rounded-xl transition-opacity shadow">
                            Abrir encarte
                          </span>
                        </div>
                        {encarte.imagens.length > 1 && (
                          <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
                            {encarte.imagens.length} páginas
                          </span>
                        )}
                      </div>
                    )}
                    <div className="p-4">
                      {encarte.categoria && (
                        <span
                          className="text-xs font-medium px-2.5 py-1 rounded-full inline-block mb-2"
                          style={{
                            backgroundColor: encarte.categoria.cor + '22',
                            color: encarte.categoria.cor,
                          }}
                        >
                          {encarte.categoria.icone} {encarte.categoria.nome}
                        </span>
                      )}
                      <h3 className="text-gray-800 font-bold text-base">{encarte.titulo}</h3>
                      {encarte.descricao && (
                        <p className="text-gray-500 text-xs mt-1 line-clamp-2">{encarte.descricao}</p>
                      )}
                      <p className="text-orange-600 text-xs font-medium mt-2">
                        Válido até {new Date(encarte.data_fim + 'T00:00:00').toLocaleDateString('pt-BR')}
                      </p>
                      <div className={`mt-3 flex items-center gap-2 ${isTelevendas(encarte) ? 'justify-between' : 'justify-end'}`}>
                        {isTelevendas(encarte) && <TelevendasButton compact />}
                        <ShareButtons titulo={encarte.titulo} imageUrl={encarte.imagens?.[0]?.imagem_url} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white shadow-lg border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-orange-600 hover:border-orange-300 transition z-10"
          >
            ‹
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white shadow-lg border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-orange-600 hover:border-orange-300 transition z-10"
          >
            ›
          </button>
        </div>
      </div>

      {/* Fullscreen-capable viewer — fit to screen, zoom, scroll, page nav */}
      {encarteAberto && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex flex-col bg-black"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/60 text-white shrink-0">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm md:text-base truncate">{encarteAberto.titulo}</h3>
              {encarteAberto.imagens.length > 1 && (
                <p className="text-xs text-gray-300">{imagemIdx + 1} de {encarteAberto.imagens.length}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => handleZoom(-0.5)} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition text-lg font-bold" title="Diminuir zoom">−</button>
              <span className="text-xs text-gray-300 min-w-[3rem] text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={() => handleZoom(0.5)} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition text-lg font-bold" title="Aumentar zoom">+</button>
              <div className="w-px h-6 bg-white/20 mx-1" />
              <button onClick={toggleFullscreen} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition" title={fullscreen ? 'Sair da tela cheia' : 'Tela cheia'}>
                {fullscreen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"/></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/></svg>
                )}
              </button>
              <button onClick={fecharEncarte} className="w-9 h-9 flex items-center justify-center rounded-full bg-red-600/80 hover:bg-red-600 transition text-sm font-bold" title="Fechar">✕</button>
            </div>
          </div>

          {/* Image viewer — fits screen by default, scroll when zoomed */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-auto overscroll-contain"
            onClick={(e) => { if (e.target === e.currentTarget) fecharEncarte() }}
          >
            <div className="min-h-full w-full flex items-start justify-center p-2 md:p-4">
              <img
                src={encarteAberto.imagens[imagemIdx]?.imagem_url}
                alt={`${encarteAberto.titulo} — página ${imagemIdx + 1}`}
                draggable={false}
                onDoubleClick={handleDoubleClick}
                className="select-none mx-auto transition-[width] duration-150"
                style={zoom === 1
                  ? { maxWidth: '100%', maxHeight: 'calc(100vh - 180px)', objectFit: 'contain', cursor: 'zoom-in' }
                  : { width: `${zoom * 100}%`, maxWidth: 'none', height: 'auto', cursor: 'zoom-out' }}
              />
            </div>
          </div>

          {/* Page navigation */}
          {encarteAberto.imagens.length > 1 && (
            <div className="flex items-center justify-center gap-2 py-3 bg-black/60 shrink-0">
              <button
                onClick={() => irParaPagina(imagemIdx - 1, encarteAberto.imagens.length)}
                disabled={imagemIdx === 0}
                className="bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white px-4 py-2 rounded-lg transition text-sm"
              >
                Anterior
              </button>
              <div className="flex gap-1">
                {encarteAberto.imagens.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => irParaPagina(i, encarteAberto.imagens.length)}
                    className={`w-2.5 h-2.5 rounded-full transition ${i === imagemIdx ? 'bg-orange-500' : 'bg-white/30 hover:bg-white/50'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => irParaPagina(imagemIdx + 1, encarteAberto.imagens.length)}
                disabled={imagemIdx === encarteAberto.imagens.length - 1}
                className="bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white px-4 py-2 rounded-lg transition text-sm"
              >
                Próxima
              </button>
            </div>
          )}

          {/* Bottom bar — televendas (only Televendas category) + share */}
          <div className="flex items-center justify-between gap-2 px-4 py-3 bg-black/60 text-white shrink-0">
            {isTelevendas(encarteAberto) ? <TelevendasButton /> : <span />}
            <ShareButtons titulo={encarteAberto.titulo} imageUrl={encarteAberto.imagens[imagemIdx]?.imagem_url} />
          </div>
        </div>
      )}
    </section>
  )
}

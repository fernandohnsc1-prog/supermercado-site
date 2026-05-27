'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface ImageViewerProps {
  images: { imagem_url: string }[]
  titulo: string
  whatsAppUrl?: string
  onClose: () => void
}

export default function ImageViewer({ images, titulo, whatsAppUrl, onClose }: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const hideControlsTimer = useRef<NodeJS.Timeout>()

  const currentImage = images[currentIndex]

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.5, 4))
  }, [])

  const handleZoomOut = useCallback(() => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.5, 1)
      if (newScale === 1) setPosition({ x: 0, y: 0 })
      return newScale
    })
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(prev + 0.25, 4))
    } else {
      setScale((prev) => {
        const newScale = Math.max(prev - 0.25, 1)
        if (newScale === 1) setPosition({ x: 0, y: 0 })
        return newScale
      })
    }
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }, [scale, position])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }, [isDragging, dragStart, scale])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const resetZoom = useCallback(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen)
  }, [isFullscreen])

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`Confira o encarte: ${titulo}`)
    const url = encodeURIComponent(currentImage.imagem_url)
    window.open(`https://wa.me/?text=${text}%0A${url}`, '_blank')
  }

  const shareToFacebook = () => {
    const url = encodeURIComponent(currentImage.imagem_url)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
  }

  const shareToInstagram = () => {
    // Instagram não permite compartilhamento via URL para posts - abre o app
    const url = encodeURIComponent(currentImage.imagem_url)
    window.open(`https://instagram.com/intent/tweet?url=${url}`, '_blank')
  }

  // Reset zoom when changing images
  useEffect(() => {
    resetZoom()
  }, [currentIndex, resetZoom])

  // Hide controls after 3 seconds of inactivity
  useEffect(() => {
    const resetTimer = () => {
      setShowControls(true)
      if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current)
      hideControlsTimer.current = setTimeout(() => setShowControls(false), 3000)
    }
    resetTimer()
    return () => {
      if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current)
    }
  }, [])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col ${isFullscreen ? 'bg-black' : 'bg-black/90'}`}
      onClick={() => !isFullscreen && onClose()}
    >
      {/* Header Controls */}
      <div
        className={`absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-lg">{titulo}</span>
          {images.length > 1 && (
            <span className="text-white/70 text-sm ml-2">
              {currentIndex + 1}/{images.length}
            </span>
          )}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onClose() }}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xl font-bold transition"
        >
          ✕
        </button>
      </div>

      {/* Main Image Container */}
      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center overflow-hidden cursor-zoom-in"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseEnter={() => setShowControls(true)}
      >
        <img
          ref={imgRef}
          src={currentImage.imagem_url}
          alt={titulo}
          className="max-w-full max-h-full transition-transform duration-200 select-none"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
          }}
          draggable={false}
        />
      </div>

      {/* Bottom Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setShowControls(true)}
      >
        {/* Zoom Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xl font-bold transition"
            disabled={scale <= 1}
          >
            −
          </button>
          <span className="text-white text-sm w-16 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xl font-bold transition"
            disabled={scale >= 4}
          >
            +
          </button>
          {(scale > 1 || position.x !== 0 || position.y !== 0) && (
            <button
              onClick={resetZoom}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-sm font-bold transition ml-2"
            >
              Reset
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white text-sm font-medium flex items-center gap-2 transition"
          >
            {isFullscreen ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                </svg>
                Sair da Tela Cheia
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
                Tela Cheia
              </>
            )}
          </button>

          {/* WhatsApp Televendas */}
          {whatsAppUrl && (
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-bold flex items-center gap-2 transition shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
              </svg>
              Televendas
            </a>
          )}

          {/* Share Buttons */}
          <button
            onClick={shareToWhatsApp}
            className="px-4 py-2 rounded-full bg-green-500/80 hover:bg-green-500 text-white text-sm font-medium flex items-center gap-2 transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            WhatsApp
          </button>

          <button
            onClick={shareToFacebook}
            className="px-4 py-2 rounded-full bg-blue-600/80 hover:bg-blue-600 text-white text-sm font-medium flex items-center gap-2 transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>

          <button
            onClick={shareToInstagram}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 text-white text-sm font-medium flex items-center gap-2 transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            Instagram
          </button>
        </div>

        {/* Image Navigation (if multiple images) */}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xl font-bold transition"
            >
              ‹
            </button>
            <div className="flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition ${index === currentIndex ? 'bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xl font-bold transition"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
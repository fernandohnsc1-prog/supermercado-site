'use client'

import { useEffect, useState } from 'react'

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

export default function EncartesSection() {
  const [encartes, setEncartes] = useState<Encarte[]>([])
  const [imagemAberta, setImagemAberta] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/site')
      .then((r) => r.json())
      .then((data) => setEncartes(data.encartes ?? []))
  }, [])

  if (encartes.length === 0) return null

  return (
    <section id="encartes" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Encartes da Semana
          </h2>
          <p className="text-gray-500 mt-2">Confira nossas ofertas imperdíveis!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {encartes.map((encarte) => (
            <div
              key={encarte.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition group"
            >
              {encarte.imagens && encarte.imagens.length > 0 && (
                <div className="relative cursor-pointer" onClick={() => setImagemAberta(encarte.imagens[0].imagem_url)}>
                  <img
                    src={encarte.imagens[0].imagem_url}
                    alt={encarte.titulo}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {encarte.imagens.length > 1 && (
                    <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg">
                      +{encarte.imagens.length - 1} fotos
                    </span>
                  )}
                </div>
              )}
              <div className="p-5">
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
                <h3 className="text-gray-800 font-bold text-lg">{encarte.titulo}</h3>
                {encarte.descricao && (
                  <p className="text-gray-500 text-sm mt-1">{encarte.descricao}</p>
                )}
                <p className="text-orange-600 text-xs font-medium mt-3">
                  Válido até {new Date(encarte.data_fim + 'T00:00:00').toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de imagem */}
      {imagemAberta && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setImagemAberta(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img src={imagemAberta} alt="" className="w-full rounded-2xl" />
            <button
              onClick={() => setImagemAberta(null)}
              className="absolute top-4 right-4 bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold hover:bg-gray-100 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

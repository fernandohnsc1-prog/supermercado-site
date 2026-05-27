'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Imagem {
  id: string
  imagem_url: string
  ordem: number
}

interface Televendas {
  id: string
  nome: string
  whatsapp: string
}

interface Encarte {
  id: string
  titulo: string
  descricao: string
  data_inicio: string
  data_fim: string
  ativo: boolean
  televendas: Televendas | null
  categoria: { nome: string; icone: string; cor: string }
  imagens: Imagem[]
}

export default function EncartesPage() {
  const [encartes, setEncartes] = useState<Encarte[]>([])
  const [carregando, setCarregando] = useState(true)

  async function carregar() {
    const res = await fetch('/api/encartes')
    const data = await res.json()
    setEncartes(data)
    setCarregando(false)
  }

  async function toggleAtivo(id: string, ativo: boolean) {
    await fetch(`/api/encartes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ativo: !ativo }),
    })
    carregar()
  }

  async function deletar(id: string) {
    if (!confirm('Deletar este encarte e todas as imagens?')) return
    await fetch(`/api/encartes/${id}`, { method: 'DELETE' })
    carregar()
  }

  useEffect(() => {
    let active = true
    fetch('/api/encartes')
      .then((r) => r.json())
      .then((data) => { if (active) { setEncartes(data); setCarregando(false) } })
    return () => { active = false }
  }, [])

  function formatarData(data: string) {
    return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR')
  }

  function estaVencido(data_fim: string) {
    return new Date(data_fim + 'T23:59:59') < new Date()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Encartes</h1>
          <p className="text-gray-500 text-sm mt-1">Gerencie os encartes do site</p>
        </div>
        <Link
          href="/admin/encartes/novo"
          className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition shadow-md"
        >
          + Novo encarte
        </Link>
      </div>

      {carregando ? (
        <p className="text-gray-500">Carregando...</p>
      ) : encartes.length === 0 ? (
        <div className="bg-white border border-orange-100 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">🗞️</p>
          <p className="text-gray-500">Nenhum encarte cadastrado ainda.</p>
          <Link href="/admin/encartes/novo" className="text-orange-600 text-sm mt-2 inline-block hover:underline">
            Criar primeiro encarte
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {encartes.map((encarte) => {
            const vencido = estaVencido(encarte.data_fim)
            return (
              <div key={encarte.id} className="bg-white border border-orange-100 rounded-2xl p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {encarte.categoria && (
                        <span
                          className="text-xs font-medium px-2.5 py-1 rounded-full"
                          style={{
                            backgroundColor: encarte.categoria.cor + '22',
                            color: encarte.categoria.cor,
                          }}
                        >
                          {encarte.categoria.icone} {encarte.categoria.nome}
                        </span>
                      )}
                      {encarte.televendas && (
                        <span className="text-xs bg-green-50 text-green-600 px-2.5 py-1 rounded-full border border-green-200">
                          📱 Televendas vinculado
                        </span>
                      )}
                      {vencido && (
                        <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                          Expirado
                        </span>
                      )}
                      {!encarte.ativo && !vencido && (
                        <span className="text-xs bg-yellow-50 text-yellow-600 px-2.5 py-1 rounded-full border border-yellow-200">
                          Desativado
                        </span>
                      )}
                      {encarte.ativo && !vencido && (
                        <span className="text-xs bg-green-50 text-green-600 px-2.5 py-1 rounded-full border border-green-200">
                          Ativo
                        </span>
                      )}
                    </div>

                    <h2 className="text-gray-800 font-semibold text-lg">{encarte.titulo}</h2>
                    {encarte.descricao && (
                      <p className="text-gray-500 text-sm mt-1">{encarte.descricao}</p>
                    )}

                    <p className="text-gray-400 text-xs mt-2">
                      {formatarData(encarte.data_inicio)} até {formatarData(encarte.data_fim)}
                      {' · '}
                      {encarte.imagens?.length ?? 0} imagem(ns)
                    </p>
                  </div>

                  {encarte.imagens && encarte.imagens.length > 0 && (
                    <div className="flex gap-2 flex-shrink-0">
                      {encarte.imagens.slice(0, 3).map((img) => (
                        <img
                          key={img.id}
                          src={img.imagem_url}
                          alt=""
                          className="w-16 h-16 object-cover rounded-lg border border-orange-100"
                        />
                      ))}
                      {encarte.imagens.length > 3 && (
                        <div className="w-16 h-16 bg-orange-50 rounded-lg border border-orange-100 flex items-center justify-center text-orange-500 text-sm font-medium">
                          +{encarte.imagens.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-orange-50">
                  <button
                    onClick={() => toggleAtivo(encarte.id, encarte.ativo)}
                    className={`text-sm px-4 py-2 rounded-xl transition font-medium ${
                      encarte.ativo
                        ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100 border border-yellow-200'
                        : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'
                    }`}
                  >
                    {encarte.ativo ? 'Desativar' : 'Ativar'}
                  </button>

                  <button
                    onClick={() => deletar(encarte.id)}
                    className="text-sm px-4 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition ml-auto border border-red-200"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

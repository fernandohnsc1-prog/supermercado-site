'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Imagem {
  id: string
  imagem_url: string
  ordem: number
}

interface Encarte {
  id: string
  titulo: string
  descricao: string
  data_inicio: string
  data_fim: string
  ativo: boolean
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

  useEffect(() => { carregar() }, [])

  function formatarData(data: string) {
    return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR')
  }

  function estaVencido(data_fim: string) {
    return new Date(data_fim + 'T23:59:59') < new Date()
  }

  return (
    <div>
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Encartes</h1>
          <p className="text-gray-400 text-sm mt-1">Gerencie os encartes do site</p>
        </div>
        <Link
          href="/admin/encartes/novo"
          className="bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
        >
          + Novo encarte
        </Link>
      </div>

      {/* Lista */}
      {carregando ? (
        <p className="text-gray-400">Carregando...</p>
      ) : encartes.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">🗞️</p>
          <p className="text-gray-400">Nenhum encarte cadastrado ainda.</p>
          <Link href="/admin/encartes/novo" className="text-orange-400 text-sm mt-2 inline-block hover:underline">
            Criar primeiro encarte
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {encartes.map((encarte) => {
            const vencido = estaVencido(encarte.data_fim)
            return (
              <div key={encarte.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">

                  {/* Info */}
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
                      {vencido && (
                        <span className="text-xs bg-gray-800 text-gray-500 px-2.5 py-1 rounded-full">
                          Expirado
                        </span>
                      )}
                      {!encarte.ativo && !vencido && (
                        <span className="text-xs bg-yellow-950 text-yellow-500 px-2.5 py-1 rounded-full">
                          Desativado
                        </span>
                      )}
                      {encarte.ativo && !vencido && (
                        <span className="text-xs bg-green-950 text-green-500 px-2.5 py-1 rounded-full">
                          Ativo
                        </span>
                      )}
                    </div>

                    <h2 className="text-white font-semibold text-lg">{encarte.titulo}</h2>
                    {encarte.descricao && (
                      <p className="text-gray-400 text-sm mt-1">{encarte.descricao}</p>
                    )}

                    <p className="text-gray-500 text-xs mt-2">
                      📅 {formatarData(encarte.data_inicio)} até {formatarData(encarte.data_fim)}
                      {' · '}
                      🖼️ {encarte.imagens?.length ?? 0} imagem(ns)
                    </p>
                  </div>

                  {/* Preview das imagens */}
                  {encarte.imagens && encarte.imagens.length > 0 && (
                    <div className="flex gap-2 flex-shrink-0">
                      {encarte.imagens.slice(0, 3).map((img) => (
                        <img
                          key={img.id}
                          src={img.imagem_url}
                          alt=""
                          className="w-16 h-16 object-cover rounded-lg border border-gray-700"
                        />
                      ))}
                      {encarte.imagens.length > 3 && (
                        <div className="w-16 h-16 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center text-gray-400 text-sm font-medium">
                          +{encarte.imagens.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Ações */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-800">
                  <button
                    onClick={() => toggleAtivo(encarte.id, encarte.ativo)}
                    className={`text-sm px-4 py-2 rounded-xl transition font-medium ${
                      encarte.ativo
                        ? 'bg-yellow-950 text-yellow-400 hover:bg-yellow-900'
                        : 'bg-green-950 text-green-400 hover:bg-green-900'
                    }`}
                  >
                    {encarte.ativo ? '⏸ Desativar' : '▶ Ativar'}
                  </button>

                  <Link
                    href={`/admin/encartes/${encarte.id}/editar`}
                    className="text-sm px-4 py-2 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
                  >
                    ✏️ Editar
                  </Link>

                  <button
                    onClick={() => deletar(encarte.id)}
                    className="text-sm px-4 py-2 rounded-xl bg-orange-950 text-orange-400 hover:bg-orange-900 transition ml-auto"
                  >
                    🗑 Deletar
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
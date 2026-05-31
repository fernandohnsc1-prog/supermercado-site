'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Sorteio {
  id: string
  titulo: string
  descricao: string
  imagem_url: string
  data_sorteio: string
  premio: string | null
  ativo: boolean
}

export default function SorteiosPage() {
  const [sorteios, setSorteios] = useState<Sorteio[]>([])
  const [carregando, setCarregando] = useState(true)

  async function carregar() {
    const res = await fetch('/api/sorteios')
    const data = await res.json()
    setSorteios(data)
    setCarregando(false)
  }

  useEffect(() => {
    let active = true
    fetch('/api/sorteios')
      .then((r) => r.json())
      .then((data) => { if (active) { setSorteios(data); setCarregando(false) } })
    return () => { active = false }
  }, [])

  async function toggleAtivo(id: string, ativo: boolean) {
    await fetch(`/api/sorteios/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ativo: !ativo }),
    })
    carregar()
  }

  async function deletar(id: string) {
    if (!confirm('Deletar este sorteio e todos os participantes?')) return
    await fetch(`/api/sorteios/${id}`, { method: 'DELETE' })
    carregar()
  }

  function formatarData(data: string) {
    return new Date(data).toLocaleDateString('pt-BR')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sorteios</h1>
          <p className="text-gray-500 text-sm mt-1">Gerencie os sorteios do site</p>
        </div>
        <Link
          href="/admin/sorteios/novo"
          className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition shadow-md"
        >
          + Novo sorteio
        </Link>
      </div>

      {carregando ? (
        <p className="text-gray-500">Carregando...</p>
      ) : sorteios.length === 0 ? (
        <div className="bg-white border border-orange-100 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">🎰</p>
          <p className="text-gray-500">Nenhum sorteio cadastrado.</p>
          <Link href="/admin/sorteios/novo" className="text-orange-600 text-sm mt-2 inline-block hover:underline">
            Criar primeiro sorteio
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sorteios.map((sorteio) => (
            <div key={sorteio.id} className="bg-white border border-orange-100 rounded-2xl p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {sorteio.ativo ? (
                      <span className="text-xs bg-green-50 text-green-600 px-2.5 py-1 rounded-full border border-green-200">
                        Ativo
                      </span>
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                        Inativo
                      </span>
                    )}
                  </div>
                  <h2 className="text-gray-800 font-semibold text-lg">{sorteio.titulo}</h2>
                  {sorteio.descricao && <p className="text-gray-500 text-sm mt-1">{sorteio.descricao}</p>}
                  {sorteio.premio && (
                    <p className="text-orange-600 text-xs font-medium mt-1">Prêmio: {sorteio.premio}</p>
                  )}
                  <p className="text-gray-400 text-xs mt-2">
                    Sorteio em {formatarData(sorteio.data_sorteio)}
                  </p>
                </div>
                {sorteio.imagem_url && (
                  <img src={sorteio.imagem_url} alt="" className="w-20 h-20 object-cover rounded-xl border border-orange-100" />
                )}
              </div>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-orange-50">
                <Link
                  href={`/admin/sorteios/${sorteio.id}`}
                  className="text-sm px-4 py-2 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-100 transition border border-orange-200"
                >
                  Ver participantes
                </Link>
                <button
                  onClick={() => toggleAtivo(sorteio.id, sorteio.ativo)}
                  className={`text-sm px-4 py-2 rounded-xl transition font-medium ${
                    sorteio.ativo
                      ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100 border border-yellow-200'
                      : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'
                  }`}
                >
                  {sorteio.ativo ? 'Desativar' : 'Ativar'}
                </button>
                <button
                  onClick={() => deletar(sorteio.id)}
                  className="text-sm px-4 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition ml-auto border border-red-200"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface Participante {
  id: string
  nome: string
  telefone: string
  created_at: string
}

interface Sorteio {
  id: string
  titulo: string
  descricao: string
  ativo: boolean
  sorteado: boolean
  ganhador_id: string | null
  participantes: Participante[]
}

interface Ganhador {
  id: string
  nome: string
  whatsapp_link: string
}

export default function SorteioDetalhePage() {
  const params = useParams()
  const id = params.id as string
  const [sorteio, setSorteio] = useState<Sorteio | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [sorteando, setSorteando] = useState(false)
  const [ganhador, setGanhador] = useState<Ganhador | null>(null)

  async function carregar() {
    const res = await fetch(`/api/sorteios/${id}`)
    const data = await res.json()
    setSorteio(data)
    setCarregando(false)
  }

  useEffect(() => {
    let active = true
    fetch(`/api/sorteios/${id}`)
      .then((r) => r.json())
      .then((data) => { if (active) { setSorteio(data); setCarregando(false) } })
    return () => { active = false }
  }, [id])

  async function realizarSorteio() {
    if (!confirm('Deseja realizar o sorteio agora?')) return
    setSorteando(true)
    const res = await fetch(`/api/sorteios/${id}/sortear`, { method: 'POST' })
    const data = await res.json()
    if (data.sucesso) {
      setGanhador(data.ganhador)
      carregar()
    } else {
      alert(data.erro || 'Erro ao sortear')
    }
    setSorteando(false)
  }

  if (carregando) return <p className="text-gray-500">Carregando...</p>
  if (!sorteio) return <p className="text-gray-500">Sorteio não encontrado.</p>

  const ganhadorParticipante = sorteio.ganhador_id
    ? sorteio.participantes.find(p => p.id === sorteio.ganhador_id)
    : null

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">{sorteio.titulo}</h1>
        <p className="text-gray-500 text-sm mt-1">{sorteio.descricao}</p>
      </div>

      {/* Ganhador */}
      {(ganhador || ganhadorParticipante) && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
          <h2 className="text-green-800 font-bold text-lg mb-2">Ganhador do sorteio!</h2>
          <p className="text-green-700 text-xl font-semibold">
            {ganhador?.nome || ganhadorParticipante?.nome}
          </p>
          {ganhador?.whatsapp_link && (
            <a
              href={ganhador.whatsapp_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
            >
              Contatar via WhatsApp
            </a>
          )}
        </div>
      )}

      {/* Ações */}
      <div className="flex items-center gap-4 mb-6">
        {!sorteio.sorteado && sorteio.participantes.length > 0 && (
          <button
            onClick={realizarSorteio}
            disabled={sorteando}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white text-sm font-semibold px-6 py-3 rounded-xl transition shadow-md"
          >
            {sorteando ? 'Sorteando...' : 'Realizar sorteio'}
          </button>
        )}
        {sorteio.sorteado && (
          <button
            onClick={realizarSorteio}
            disabled={sorteando}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white text-sm font-semibold px-6 py-3 rounded-xl transition shadow-md"
          >
            {sorteando ? 'Sorteando...' : 'Sortear novamente'}
          </button>
        )}
        <span className="text-gray-500 text-sm">
          {sorteio.participantes.length} participante(s)
        </span>
      </div>

      {/* Lista de participantes */}
      <div className="bg-white border border-orange-100 rounded-2xl p-6">
        <h2 className="text-gray-800 font-semibold mb-4">Participantes</h2>
        {sorteio.participantes.length === 0 ? (
          <p className="text-gray-500 text-sm">Nenhum participante inscrito ainda.</p>
        ) : (
          <div className="space-y-2">
            {sorteio.participantes.map((p, i) => (
              <div
                key={p.id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition ${
                  p.id === sorteio.ganhador_id ? 'border-green-300 bg-green-50' : 'border-gray-100'
                }`}
              >
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium text-sm">{p.nome}</p>
                  <p className="text-gray-400 text-xs">{p.telefone}</p>
                </div>
                {p.id === sorteio.ganhador_id && (
                  <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">Ganhador</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

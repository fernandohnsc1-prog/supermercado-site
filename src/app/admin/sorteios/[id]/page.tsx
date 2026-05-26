'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface Participante {
  id: string
  nome: string
  telefone: string
  comprovante_url?: string | null
  created_at: string
}

interface Sorteio {
  id: string
  titulo: string
  descricao: string
  premio: string | null
  data_sorteio: string
  ativo: boolean
  participantes: Participante[]
}

interface Ganhador {
  id: string
  nome: string
  whatsapp_link: string
}

function formatWhatsAppLink(telefone: string): string {
  const limpo = telefone.replace(/\D/g, '')
  return `https://wa.me/55${limpo}`
}

export default function SorteioDetalhePage() {
  const params = useParams()
  const id = params.id as string
  const [sorteio, setSorteio] = useState<Sorteio | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [sorteando, setSorteando] = useState(false)
  const [ganhador, setGanhador] = useState<Ganhador | null>(null)
  const [fotoAberta, setFotoAberta] = useState<string | null>(null)

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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">{sorteio.titulo}</h1>
        <p className="text-gray-500 text-sm mt-1">{sorteio.descricao}</p>
        {sorteio.premio && (
          <p className="text-orange-600 text-sm font-medium mt-1">Prêmio: {sorteio.premio}</p>
        )}
        <p className="text-gray-400 text-xs mt-1">
          Data do sorteio: {new Date(sorteio.data_sorteio + 'T00:00:00').toLocaleDateString('pt-BR')}
        </p>
      </div>

      {ganhador && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
          <h2 className="text-green-800 font-bold text-lg mb-2">Ganhador do sorteio!</h2>
          <p className="text-green-700 text-xl font-semibold">{ganhador.nome}</p>
          <a
            href={ganhador.whatsapp_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Contatar via WhatsApp
          </a>
        </div>
      )}

      <div className="flex items-center gap-4 mb-6">
        {sorteio.participantes.length > 0 && (
          <button
            onClick={realizarSorteio}
            disabled={sorteando}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white text-sm font-semibold px-6 py-3 rounded-xl transition shadow-md"
          >
            {sorteando ? 'Sorteando...' : 'Realizar sorteio'}
          </button>
        )}
        <span className="text-gray-500 text-sm">
          {sorteio.participantes.length} participante(s)
        </span>
      </div>

      <div className="bg-white border border-orange-100 rounded-2xl p-6">
        <h2 className="text-gray-800 font-semibold mb-4">Participantes</h2>
        {sorteio.participantes.length === 0 ? (
          <p className="text-gray-500 text-sm">Nenhum participante inscrito ainda.</p>
        ) : (
          <div className="space-y-2">
            {sorteio.participantes.map((p, i) => (
              <div
                key={p.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100"
              >
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium text-sm">{p.nome}</p>
                  <p className="text-gray-400 text-xs">{p.telefone}</p>
                </div>
                <a
                  href={formatWhatsAppLink(p.telefone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-green-50 text-green-600 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-green-100 transition"
                  title="Contatar via WhatsApp"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                {p.comprovante_url && (
                  <button
                    onClick={() => setFotoAberta(p.comprovante_url!)}
                    className="flex items-center gap-1 bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-blue-100 transition"
                  >
                    Ver comprovante
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {fotoAberta && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setFotoAberta(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh]">
            <img
              src={fotoAberta}
              alt="Comprovante"
              className="max-w-full max-h-[85vh] rounded-xl shadow-2xl"
            />
            <button
              onClick={() => setFotoAberta(null)}
              className="absolute -top-3 -right-3 bg-white text-gray-800 w-8 h-8 rounded-full shadow-lg flex items-center justify-center text-sm font-bold hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

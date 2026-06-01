'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatDataBR } from '@/lib/format'

interface Sorteio {
  id: string
  titulo: string
  descricao: string
  imagem_url: string
  data_sorteio: string
  premio: string | null
  ativo: boolean
  sorteado?: boolean
  ganhador_nome?: string | null
  ganhador_telefone?: string | null
  data_realizado?: string | null
}

function whatsappLink(telefone?: string | null) {
  const limpo = (telefone ?? '').replace(/\D/g, '')
  return `https://wa.me/55${limpo}`
}

export default function SorteiosPage() {
  const [sorteios, setSorteios] = useState<Sorteio[]>([])
  const [carregando, setCarregando] = useState(true)

  async function carregar() {
    const res = await fetch('/api/sorteios')
    const data = await res.json()
    setSorteios(Array.isArray(data) ? data : [])
    setCarregando(false)
  }

  useEffect(() => {
    let active = true
    fetch('/api/sorteios')
      .then((r) => r.json())
      .then((data) => { if (active) { setSorteios(Array.isArray(data) ? data : []); setCarregando(false) } })
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

  const emAndamento = sorteios.filter((s) => !s.sorteado)
  const realizados = sorteios.filter((s) => s.sorteado)

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
        <div className="space-y-10">
          {/* Em andamento */}
          <div>
            <h2 className="text-gray-700 font-semibold mb-3">Em andamento</h2>
            {emAndamento.length === 0 ? (
              <p className="text-gray-400 text-sm bg-white border border-orange-100 rounded-2xl p-6">Nenhum sorteio em andamento.</p>
            ) : (
              <div className="space-y-4">
                {emAndamento.map((sorteio) => (
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
                          Sorteio em {formatDataBR(sorteio.data_sorteio)}
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
                        Ver participantes / sortear
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

          {/* Já realizados */}
          {realizados.length > 0 && (
            <div>
              <h2 className="text-gray-700 font-semibold mb-3">Sorteios já realizados</h2>
              <div className="space-y-4">
                {realizados.map((sorteio) => (
                  <div key={sorteio.id} className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span className="text-xs bg-gray-200 text-gray-600 px-2.5 py-1 rounded-full mb-2 inline-block">
                          Realizado
                        </span>
                        <h2 className="text-gray-800 font-semibold text-lg">{sorteio.titulo}</h2>
                        {sorteio.premio && (
                          <p className="text-orange-600 text-xs font-medium mt-1">Prêmio: {sorteio.premio}</p>
                        )}
                        <p className="text-gray-400 text-xs mt-1">
                          Sorteado em {formatDataBR(sorteio.data_realizado || sorteio.data_sorteio)}
                        </p>

                        {sorteio.ganhador_nome ? (
                          <div className="mt-3 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-3">
                            <div>
                              <p className="text-xs text-green-700">Ganhador</p>
                              <p className="text-green-800 font-semibold">{sorteio.ganhador_nome}</p>
                            </div>
                            <a
                              href={whatsappLink(sorteio.ganhador_telefone)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-auto flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
                              title="Falar com o ganhador no WhatsApp"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            </a>
                          </div>
                        ) : (
                          <p className="text-gray-400 text-xs mt-2">Sem ganhador registrado.</p>
                        )}
                      </div>
                      {sorteio.imagem_url && (
                        <img src={sorteio.imagem_url} alt="" className="w-20 h-20 object-cover rounded-xl border border-gray-200 grayscale" />
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
                      <Link
                        href={`/admin/sorteios/${sorteio.id}`}
                        className="text-sm px-4 py-2 rounded-xl bg-white text-gray-600 hover:bg-gray-100 transition border border-gray-200"
                      >
                        Ver participantes
                      </Link>
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
            </div>
          )}
        </div>
      )}
    </div>
  )
}

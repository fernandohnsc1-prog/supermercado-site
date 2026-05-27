'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Televendas {
  id: string
  nome: string
  whatsapp: string
  ativo: boolean
  created_at: string
}

export default function TelevendasPage() {
  const [televendas, setTelevendas] = useState<Televendas[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editando, setEditando] = useState<Televendas | null>(null)
  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    carregar()
  }, [])

  async function carregar() {
    const res = await fetch('/api/televendas')
    const data = await res.json()
    setTelevendas(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  function abrirModal(tv?: Televendas) {
    if (tv) {
      setEditando(tv)
      setNome(tv.nome)
      setWhatsapp(tv.whatsapp)
    } else {
      setEditando(null)
      setNome('')
      setWhatsapp('')
    }
    setModalOpen(true)
  }

  function fecharModal() {
    setModalOpen(false)
    setEditando(null)
    setNome('')
    setWhatsapp('')
  }

  async function handleSalvar() {
    if (!nome || !whatsapp) return
    setSalvando(true)

    if (editando) {
      await fetch('/api/televendas', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editando.id, nome, whatsapp }),
      })
    } else {
      await fetch('/api/televendas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, whatsapp }),
      })
    }

    setSalvando(false)
    fecharModal()
    carregar()
  }

  async function toggleAtivo(tv: Televendas) {
    await fetch('/api/televendas', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: tv.id, ativo: !tv.ativo }),
    })
    carregar()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Televendas</h1>
          <p className="text-gray-500 text-sm mt-1">Gerencie os canais de televendas (WhatsApp)</p>
        </div>
        <button
          onClick={() => abrirModal()}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-md flex items-center gap-2"
        >
          <span className="text-lg">+</span> Novo Televendas
        </button>
      </div>

      {televendas.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-4">📱</p>
          <p className="text-gray-500 mb-4">Nenhum televendas cadastrado ainda</p>
          <button
            onClick={() => abrirModal()}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2.5 rounded-xl transition"
          >
            Cadastrar primeiro televendas
          </button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Nome</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">WhatsApp</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {televendas.map((tv) => (
                <tr key={tv.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-800">{tv.nome}</span>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`https://wa.me/${tv.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      </svg>
                      {tv.whatsapp}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleAtivo(tv)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        tv.ativo
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {tv.ativo ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => abrirModal(tv)}
                      className="text-orange-600 hover:text-orange-700 font-medium text-sm mr-4"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-scaleIn">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {editando ? 'Editar Televendas' : 'Novo Televendas'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Nome</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Televendas Principal"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">WhatsApp</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Ex: 5511999999999"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                />
                <p className="text-xs text-gray-400 mt-1">Digite o número com código do país e DDD, sem espaços ou traços</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={fecharModal}
                className="flex-1 px-6 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvar}
                disabled={salvando || !nome || !whatsapp}
                className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold rounded-xl py-3 text-sm transition shadow-md"
              >
                {salvando ? 'Salvando...' : editando ? 'Salvar' : 'Criar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
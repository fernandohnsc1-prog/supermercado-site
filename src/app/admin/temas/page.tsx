'use client'

import { useEffect, useState } from 'react'

interface Tema {
  id: string
  nome: string
  cor_primaria: string
  cor_secundaria: string
  cor_fundo: string
  cor_texto: string
  ativo: boolean
}

export default function TemasPage() {
  const [temas, setTemas] = useState<Tema[]>([])
  const [carregando, setCarregando] = useState(true)
  const [nome, setNome] = useState('')
  const [corPrimaria, setCorPrimaria] = useState('#F97316')
  const [corSecundaria, setCorSecundaria] = useState('#EA580C')
  const [corFundo, setCorFundo] = useState('#FFFFFF')
  const [corTexto, setCorTexto] = useState('#1F2937')
  const [salvando, setSalvando] = useState(false)

  async function carregar() {
    const res = await fetch('/api/temas')
    const data = await res.json()
    setTemas(data)
    setCarregando(false)
  }

  useEffect(() => {
    let active = true
    fetch('/api/temas')
      .then((r) => r.json())
      .then((data) => { if (active) { setTemas(data); setCarregando(false) } })
    return () => { active = false }
  }, [])

  async function handleCriar(e: React.FormEvent) {
    e.preventDefault()
    if (!nome) return
    setSalvando(true)
    await fetch('/api/temas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        cor_primaria: corPrimaria,
        cor_secundaria: corSecundaria,
        cor_fundo: corFundo,
        cor_texto: corTexto,
      }),
    })
    setNome('')
    setSalvando(false)
    carregar()
  }

  async function ativarTema(id: string) {
    await fetch('/api/temas', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ativo: true }),
    })
    carregar()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Temas & Cores</h1>
        <p className="text-gray-500 text-sm mt-1">Personalize a aparência do site público</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-orange-100 rounded-2xl p-6">
          <h2 className="text-gray-800 font-semibold mb-4">Novo tema</h2>
          <form onSubmit={handleCriar} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Nome do tema</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Natal 2025"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Cor primária</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={corPrimaria} onChange={(e) => setCorPrimaria(e.target.value)} className="w-10 h-10 rounded-lg border cursor-pointer" />
                  <span className="text-xs text-gray-500">{corPrimaria}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Cor secundária</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={corSecundaria} onChange={(e) => setCorSecundaria(e.target.value)} className="w-10 h-10 rounded-lg border cursor-pointer" />
                  <span className="text-xs text-gray-500">{corSecundaria}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Cor de fundo</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={corFundo} onChange={(e) => setCorFundo(e.target.value)} className="w-10 h-10 rounded-lg border cursor-pointer" />
                  <span className="text-xs text-gray-500">{corFundo}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Cor do texto</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={corTexto} onChange={(e) => setCorTexto(e.target.value)} className="w-10 h-10 rounded-lg border cursor-pointer" />
                  <span className="text-xs text-gray-500">{corTexto}</span>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="rounded-xl p-4 border" style={{ backgroundColor: corFundo, color: corTexto }}>
              <p className="text-xs mb-1">Preview:</p>
              <p className="font-bold" style={{ color: corPrimaria }}>Certo Atacado</p>
              <p className="text-sm" style={{ color: corSecundaria }}>Lugar certo de comprar barato</p>
            </div>

            <button
              type="submit"
              disabled={salvando || !nome}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold rounded-xl py-3 text-sm transition shadow-md"
            >
              {salvando ? 'Salvando...' : 'Criar tema'}
            </button>
          </form>
        </div>

        <div className="bg-white border border-orange-100 rounded-2xl p-6">
          <h2 className="text-gray-800 font-semibold mb-4">Temas cadastrados</h2>
          {carregando ? (
            <p className="text-gray-500 text-sm">Carregando...</p>
          ) : temas.length === 0 ? (
            <p className="text-gray-500 text-sm">Nenhum tema cadastrado.</p>
          ) : (
            <div className="space-y-3">
              {temas.map((tema) => (
                <div
                  key={tema.id}
                  className={`p-4 rounded-xl border transition ${tema.ativo ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-800 font-medium text-sm">{tema.nome}</span>
                    {tema.ativo ? (
                      <span className="text-xs bg-orange-600 text-white px-2 py-0.5 rounded-full">Ativo</span>
                    ) : (
                      <button
                        onClick={() => ativarTema(tema.id)}
                        className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-orange-100 hover:text-orange-600 transition"
                      >
                        Ativar
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <span className="w-6 h-6 rounded-full border" style={{ backgroundColor: tema.cor_primaria }} title="Primária" />
                    <span className="w-6 h-6 rounded-full border" style={{ backgroundColor: tema.cor_secundaria }} title="Secundária" />
                    <span className="w-6 h-6 rounded-full border" style={{ backgroundColor: tema.cor_fundo }} title="Fundo" />
                    <span className="w-6 h-6 rounded-full border" style={{ backgroundColor: tema.cor_texto }} title="Texto" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

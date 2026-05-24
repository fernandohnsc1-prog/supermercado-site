'use client'

import { useEffect, useState } from 'react'

interface Categoria {
  id: string
  nome: string
  icone: string
  cor: string
  ordem: number
  ativo: boolean
}

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [carregando, setCarregando] = useState(true)
  const [nome, setNome] = useState('')
  const [icone, setIcone] = useState('')
  const [cor, setCor] = useState('#F97316')
  const [salvando, setSalvando] = useState(false)

  async function carregar() {
    const res = await fetch('/api/categorias-encartes')
    const data = await res.json()
    setCategorias(data)
    setCarregando(false)
  }

  useEffect(() => {
    let active = true
    fetch('/api/categorias-encartes')
      .then((r) => r.json())
      .then((data) => { if (active) { setCategorias(data); setCarregando(false) } })
    return () => { active = false }
  }, [])

  async function handleCriar(e: React.FormEvent) {
    e.preventDefault()
    if (!nome) return
    setSalvando(true)
    await fetch('/api/categorias-encartes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, icone: icone || '📁', cor }),
    })
    setNome('')
    setIcone('')
    setCor('#F97316')
    setSalvando(false)
    carregar()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Categorias de Encartes</h1>
        <p className="text-gray-500 text-sm mt-1">Gerencie as categorias dos encartes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulário */}
        <div className="bg-white border border-orange-100 rounded-2xl p-6">
          <h2 className="text-gray-800 font-semibold mb-4">Nova categoria</h2>
          <form onSubmit={handleCriar} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Black Friday"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Ícone (emoji)</label>
                <input
                  type="text"
                  value={icone}
                  onChange={(e) => setIcone(e.target.value)}
                  placeholder="🎄"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Cor</label>
                <input
                  type="color"
                  value={cor}
                  onChange={(e) => setCor(e.target.value)}
                  className="w-full h-12 rounded-xl border border-gray-300 cursor-pointer"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={salvando || !nome}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold rounded-xl py-3 text-sm transition shadow-md"
            >
              {salvando ? 'Salvando...' : 'Criar categoria'}
            </button>
          </form>
        </div>

        {/* Lista */}
        <div className="bg-white border border-orange-100 rounded-2xl p-6">
          <h2 className="text-gray-800 font-semibold mb-4">Categorias existentes</h2>
          {carregando ? (
            <p className="text-gray-500 text-sm">Carregando...</p>
          ) : categorias.length === 0 ? (
            <p className="text-gray-500 text-sm">Nenhuma categoria cadastrada.</p>
          ) : (
            <div className="space-y-2">
              {categorias.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-orange-50 transition"
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                    style={{ backgroundColor: cat.cor + '22', color: cat.cor }}
                  >
                    {cat.icone}
                  </span>
                  <span className="text-gray-800 font-medium text-sm flex-1">{cat.nome}</span>
                  <span
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: cat.cor }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

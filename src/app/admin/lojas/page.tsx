'use client'

import { useEffect, useState } from 'react'

interface Loja {
  id: string
  nome: string
  endereco: string | null
  bairro: string | null
  maps_link: string | null
  imagem_url: string | null
  cloudinary_id: string | null
  ordem: number
  ativo: boolean
}

function LojaCard({ loja, onChange, onDelete }: { loja: Loja; onChange: () => void; onDelete: (id: string) => void }) {
  const [nome, setNome] = useState(loja.nome)
  const [endereco, setEndereco] = useState(loja.endereco ?? '')
  const [bairro, setBairro] = useState(loja.bairro ?? '')
  const [mapsLink, setMapsLink] = useState(loja.maps_link ?? '')
  const [imagemUrl, setImagemUrl] = useState(loja.imagem_url ?? '')
  const [cloudinaryId, setCloudinaryId] = useState(loja.cloudinary_id ?? '')
  const [uploadando, setUploadando] = useState(false)
  const [salvando, setSalvando] = useState(false)
  const [salvo, setSalvo] = useState(false)

  async function upload(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploadando(true)
    const fd = new FormData()
    fd.append('files', files[0])
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok && data.imagens?.length > 0) {
        setImagemUrl(data.imagens[0].url)
        setCloudinaryId(data.imagens[0].cloudinary_id)
      }
    } finally {
      setUploadando(false)
    }
  }

  async function salvar() {
    setSalvando(true)
    setSalvo(false)
    await fetch(`/api/lojas/${loja.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        endereco: endereco || null,
        bairro: bairro || null,
        maps_link: mapsLink || null,
        imagem_url: imagemUrl || null,
        cloudinary_id: cloudinaryId || null,
      }),
    })
    setSalvando(false)
    setSalvo(true)
    setTimeout(() => setSalvo(false), 2000)
    onChange()
  }

  return (
    <div className="bg-white border border-orange-100 rounded-2xl p-5">
      <div className="flex gap-5">
        <div className="w-40 shrink-0">
          {imagemUrl ? (
            <div className="relative">
              <img src={imagemUrl} alt={nome} className="w-40 h-40 object-cover rounded-xl border border-orange-100" />
              <button
                onClick={() => { setImagemUrl(''); setCloudinaryId('') }}
                className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs"
              >✕</button>
            </div>
          ) : (
            <div
              className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-orange-300 transition px-2"
              onClick={() => document.getElementById(`foto-${loja.id}`)?.click()}
            >
              <p className="text-2xl mb-1">📷</p>
              <p className="text-gray-500 text-xs">{uploadando ? 'Enviando...' : 'Adicionar foto'}</p>
            </div>
          )}
          <input id={`foto-${loja.id}`} type="file" accept="image/*" className="hidden" onChange={(e) => upload(e.target.files)} />
        </div>

        <div className="flex-1 space-y-2">
          <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome da unidade"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500" />
          <input value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Endereço"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500" />
          <input value={bairro} onChange={(e) => setBairro(e.target.value)} placeholder="Bairro, Cidade – UF"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500" />
          <input value={mapsLink} onChange={(e) => setMapsLink(e.target.value)} placeholder="Link do Google Maps"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500" />
          <div className="flex items-center gap-3 pt-1">
            <button onClick={salvar} disabled={salvando}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white text-sm font-semibold px-5 py-2 rounded-lg transition">
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
            {salvo && <span className="text-green-600 text-sm">Salvo!</span>}
            <button onClick={() => onDelete(loja.id)}
              className="text-sm px-4 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition ml-auto border border-red-200">
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LojasPage() {
  const [lojas, setLojas] = useState<Loja[]>([])
  const [carregando, setCarregando] = useState(true)
  const [criando, setCriando] = useState(false)
  const [novoNome, setNovoNome] = useState('')

  async function carregar() {
    const res = await fetch('/api/lojas')
    const data = await res.json()
    setLojas(Array.isArray(data) ? data : [])
    setCarregando(false)
  }

  useEffect(() => {
    let active = true
    fetch('/api/lojas')
      .then((r) => r.json())
      .then((data) => { if (active) { setLojas(Array.isArray(data) ? data : []); setCarregando(false) } })
      .catch(() => { if (active) setCarregando(false) })
    return () => { active = false }
  }, [])

  async function criar() {
    if (!novoNome.trim()) return
    setCriando(true)
    await fetch('/api/lojas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: novoNome.trim(), ordem: lojas.length }),
    })
    setNovoNome('')
    setCriando(false)
    carregar()
  }

  async function deletar(id: string) {
    if (!confirm('Excluir esta unidade?')) return
    await fetch(`/api/lojas/${id}`, { method: 'DELETE' })
    carregar()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Lojas / Unidades</h1>
        <p className="text-gray-500 text-sm mt-1">Gerencie os endereços e fotos das unidades exibidas no site</p>
      </div>

      <div className="bg-white border border-orange-100 rounded-2xl p-5 mb-6">
        <h2 className="text-gray-800 font-semibold mb-3">Nova unidade</h2>
        <div className="flex items-center gap-3">
          <input value={novoNome} onChange={(e) => setNovoNome(e.target.value)} placeholder="Ex: Certo Atacado & Varejo - Nova Unidade"
            className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500" />
          <button onClick={criar} disabled={criando || !novoNome.trim()}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white text-sm font-semibold px-5 py-2 rounded-lg transition">
            {criando ? 'Criando...' : '+ Adicionar'}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">Depois de criar, preencha endereço e adicione a foto abaixo.</p>
      </div>

      {carregando ? (
        <p className="text-gray-500">Carregando...</p>
      ) : lojas.length === 0 ? (
        <div className="bg-white border border-orange-100 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">🏪</p>
          <p className="text-gray-500">Nenhuma unidade cadastrada ainda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {lojas.map((loja) => (
            <LojaCard key={loja.id} loja={loja} onChange={carregar} onDelete={deletar} />
          ))}
        </div>
      )}
    </div>
  )
}

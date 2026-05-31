'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NovoSorteioPage() {
  const router = useRouter()
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [premio, setPremio] = useState('')
  const [dataSorteio, setDataSorteio] = useState('')
  const [imagemUrl, setImagemUrl] = useState('')
  const [cloudinaryId, setCloudinaryId] = useState('')
  const [uploadando, setUploadando] = useState(false)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploadando(true)
    const formData = new FormData()
    formData.append('files', files[0])

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok && data.imagens?.length > 0) {
        setImagemUrl(data.imagens[0].url)
        setCloudinaryId(data.imagens[0].cloudinary_id)
      }
    } catch {
      setErro('Erro no upload da imagem')
    }
    setUploadando(false)
  }

  async function handleSalvar() {
    if (!titulo || !dataSorteio) {
      setErro('Preencha título e data do sorteio')
      return
    }
    setSalvando(true)
    setErro('')

    const res = await fetch('/api/sorteios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo,
        descricao,
        premio: premio || null,
        imagem_url: imagemUrl || null,
        cloudinary_id: cloudinaryId || null,
        data_sorteio: dataSorteio,
      }),
    })

    if (res.ok) {
      router.push('/admin/sorteios')
    } else {
      const data = await res.json()
      setErro(data.erro || 'Erro ao salvar')
      setSalvando(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Novo sorteio</h1>
        <p className="text-gray-500 text-sm mt-1">Configure o sorteio para o site</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-orange-100 rounded-2xl p-6 space-y-4">
          <h2 className="text-gray-800 font-semibold">Informações do sorteio</h2>

          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Título</label>
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Sorteio de Natal" className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Descrição</label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição do sorteio e regras..." rows={3}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition resize-none" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Prêmio</label>
            <input type="text" value={premio} onChange={(e) => setPremio(e.target.value)}
              placeholder="Ex: TV 50 polegadas, Cesta básica, etc."
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Data do sorteio</label>
            <input type="date" value={dataSorteio} onChange={(e) => setDataSorteio(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" />
          </div>
        </div>

        <div className="bg-white border border-orange-100 rounded-2xl p-6 space-y-4">
          <h2 className="text-gray-800 font-semibold">Imagem do sorteio (opcional)</h2>
          {imagemUrl ? (
            <div className="relative">
              <img src={imagemUrl} alt="Preview" className="w-full h-40 object-cover rounded-xl border border-orange-100" />
              <button onClick={() => { setImagemUrl(''); setCloudinaryId('') }}
                className="absolute top-2 right-2 bg-red-600 text-white w-7 h-7 rounded-full text-sm flex items-center justify-center shadow">
                ✕
              </button>
            </div>
          ) : (
            <label className="block border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-orange-300 transition">
              <span className="text-gray-400 text-sm">
                {uploadando ? 'Enviando...' : 'Clique para enviar imagem'}
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e.target.files)} />
            </label>
          )}
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm">
            {erro}
          </div>
        )}

        <div className="flex gap-4">
          <button onClick={handleSalvar} disabled={salvando}
            className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold rounded-xl py-3.5 transition shadow-md">
            {salvando ? 'Salvando...' : 'Criar sorteio'}
          </button>
          <button onClick={() => router.push('/admin/sorteios')}
            className="px-6 bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium rounded-xl py-3.5 transition">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

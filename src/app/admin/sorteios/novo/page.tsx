'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NovoSorteioPage() {
  const router = useRouter()
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [linkCriterio, setLinkCriterio] = useState('')
  const [descricaoLink, setDescricaoLink] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
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
    if (!titulo || !dataInicio || !dataFim) {
      setErro('Preencha título e datas')
      return
    }
    setSalvando(true)
    setErro('')

    const res = await fetch('/api/sorteios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo, descricao, imagem_url: imagemUrl || null, cloudinary_id: cloudinaryId || null,
        link_criterio: linkCriterio || null, descricao_link: descricaoLink || null,
        data_inicio: dataInicio, data_fim: dataFim,
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
              placeholder="Descrição do prêmio e regras..." rows={3}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Data de início</label>
              <input type="datetime-local" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Data de fim</label>
              <input type="datetime-local" value={dataFim} onChange={(e) => setDataFim(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-orange-100 rounded-2xl p-6 space-y-4">
          <h2 className="text-gray-800 font-semibold">Critério (opcional)</h2>
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Link do critério</label>
            <input type="url" value={linkCriterio} onChange={(e) => setLinkCriterio(e.target.value)}
              placeholder="https://instagram.com/certoatacado" className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Descrição do critério</label>
            <input type="text" value={descricaoLink} onChange={(e) => setDescricaoLink(e.target.value)}
              placeholder="Siga nosso Instagram para participar" className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" />
          </div>
        </div>

        <div className="bg-white border border-orange-100 rounded-2xl p-6 space-y-4">
          <h2 className="text-gray-800 font-semibold">Imagem do prêmio</h2>
          {imagemUrl ? (
            <div className="relative">
              <img src={imagemUrl} alt="" className="w-full max-w-xs rounded-xl border border-orange-100" />
              <button onClick={() => { setImagemUrl(''); setCloudinaryId('') }}
                className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs">✕</button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-orange-300 transition"
              onClick={() => document.getElementById('sorteio-img')?.click()}>
              <p className="text-3xl mb-2">🖼️</p>
              <p className="text-gray-600 text-sm">{uploadando ? 'Enviando...' : 'Clique para selecionar a imagem do prêmio'}</p>
              <input id="sorteio-img" type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e.target.files)} />
            </div>
          )}
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{erro}</div>
        )}

        <div className="flex gap-4">
          <button onClick={() => router.push('/admin/sorteios')}
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition text-sm font-medium">
            Cancelar
          </button>
          <button onClick={handleSalvar} disabled={salvando}
            className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold rounded-xl py-3 text-sm transition shadow-md">
            {salvando ? 'Salvando...' : 'Criar sorteio'}
          </button>
        </div>
      </div>
    </div>
  )
}

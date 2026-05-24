'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface Categoria {
  id: string
  nome: string
  icone: string
  cor: string
}

interface ImagemPreview {
  file: File
  preview: string
  url?: string
  cloudinary_id?: string
  uploading: boolean
  erro?: string
}

export default function NovoEncartePage() {
  const router = useRouter()
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [imagens, setImagens] = useState<ImagemPreview[]>([])
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [arrastando, setArrastando] = useState(false)

  useEffect(() => {
    fetch('/api/categorias-encartes')
      .then((r) => r.json())
      .then(setCategorias)
  }, [])

  async function uploadImagem(img: ImagemPreview, index: number) {
    const formData = new FormData()
    formData.append('files', img.file)

    setImagens((prev) =>
      prev.map((item, i) => (i === index ? { ...item, uploading: true } : item))
    )

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) throw new Error(data.erro)

      const uploaded = data.imagens[0]
      setImagens((prev) =>
        prev.map((item, i) =>
          i === index
            ? { ...item, uploading: false, url: uploaded.url, cloudinary_id: uploaded.cloudinary_id }
            : item
        )
      )
    } catch {
      setImagens((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, uploading: false, erro: 'Erro no upload' } : item
        )
      )
    }
  }

  function adicionarArquivos(files: FileList | null) {
    if (!files) return
    const novas: ImagemPreview[] = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      uploading: false,
    }))
    setImagens((prev) => {
      const atualizadas = [...prev, ...novas]
      novas.forEach((img, i) => uploadImagem(img, prev.length + i))
      return atualizadas
    })
  }

  function removerImagem(index: number) {
    setImagens((prev) => prev.filter((_, i) => i !== index))
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setArrastando(false)
    adicionarArquivos(e.dataTransfer.files)
  }, [])

  async function handleSalvar() {
    if (!titulo || !dataInicio || !dataFim) {
      setErro('Preencha título, data de início e data de fim')
      return
    }
    if (imagens.some((img) => img.uploading)) {
      setErro('Aguarde o upload de todas as imagens terminar')
      return
    }
    if (imagens.some((img) => img.erro)) {
      setErro('Corrija os erros de upload antes de salvar')
      return
    }

    setSalvando(true)
    setErro('')

    const imagensFinais = imagens
      .filter((img) => img.url)
      .map((img) => ({ url: img.url!, cloudinary_id: img.cloudinary_id! }))

    const res = await fetch('/api/encartes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo,
        descricao,
        categoria_id: categoriaId || null,
        data_inicio: dataInicio,
        data_fim: dataFim,
        imagens: imagensFinais,
      }),
    })

    if (res.ok) {
      router.push('/admin/encartes')
    } else {
      const data = await res.json()
      setErro(data.erro || 'Erro ao salvar')
      setSalvando(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Novo encarte</h1>
        <p className="text-gray-400 text-sm mt-1">Preencha os dados e faça upload das imagens</p>
      </div>

      <div className="space-y-6">

        {/* Título */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-semibold">Informações</h2>

          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Promoção da Semana - 23/05"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Descrição (opcional)</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição curta do encarte..."
              rows={2}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Categoria</label>
            <select
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
            >
              <option value="">Sem categoria</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icone} {cat.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Data de início</label>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Data de fim</label>
              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Upload de imagens */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Imagens do encarte</h2>

          {/* Área de drop */}
          <div
            onDragOver={(e) => { e.preventDefault(); setArrastando(true) }}
            onDragLeave={() => setArrastando(false)}
            onDrop={onDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer ${
              arrastando ? 'border-orange-500 bg-orange-950/20' : 'border-gray-700 hover:border-gray-500'
            }`}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <p className="text-4xl mb-2">🖼️</p>
            <p className="text-gray-300 text-sm font-medium">
              Arraste as imagens aqui ou clique para selecionar
            </p>
            <p className="text-gray-500 text-xs mt-1">PNG, JPG, WEBP — sem limite de quantidade</p>
            <input
              id="file-input"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => adicionarArquivos(e.target.files)}
            />
          </div>

          {/* Preview das imagens */}
          {imagens.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
              {imagens.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.preview}
                    alt=""
                    className={`w-full aspect-square object-cover rounded-xl border ${
                      img.erro ? 'border-orange-500' : 'border-gray-700'
                    }`}
                  />

                  {/* Overlay de carregando */}
                  {img.uploading && (
                    <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                    </div>
                  )}

                  {/* Overlay de erro */}
                  {img.erro && (
                    <div className="absolute inset-0 bg-orange-950/80 rounded-xl flex items-center justify-center">
                      <p className="text-orange-400 text-xs text-center px-2">Erro no upload</p>
                    </div>
                  )}

                  {/* Sucesso */}
                  {img.url && !img.uploading && (
                    <div className="absolute top-1.5 left-1.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}

                  {/* Botão remover */}
                  <button
                    onClick={() => removerImagem(index)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-orange-600 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                  >
                    ✕
                  </button>

                  {/* Número da ordem */}
                  <div className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Erro e botão salvar */}
        {erro && (
          <div className="bg-orange-950 border border-orange-800 text-orange-400 text-sm rounded-xl px-4 py-3">
            ⚠️ {erro}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 text-sm transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSalvar}
            disabled={salvando}
            className="flex-1 bg-orange-600 hover:bg-orange-500 disabled:bg-orange-900 text-white font-semibold rounded-xl py-3 text-sm transition"
          >
            {salvando ? 'Salvando...' : 'Salvar encarte'}
          </button>
        </div>
      </div>
    </div>
  )
}
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

  const uploadImagem = useCallback(async (img: ImagemPreview, index: number) => {
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
  }, [])

  const adicionarArquivos = useCallback((files: FileList | null) => {
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
  }, [uploadImagem])

  function removerImagem(index: number) {
    setImagens((prev) => prev.filter((_, i) => i !== index))
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setArrastando(false)
    adicionarArquivos(e.dataTransfer.files)
  }, [adicionarArquivos])

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
        <h1 className="text-2xl font-bold text-gray-800">Novo encarte</h1>
        <p className="text-gray-500 text-sm mt-1">Preencha os dados e faça upload das imagens</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-orange-100 rounded-2xl p-6 space-y-4">
          <h2 className="text-gray-800 font-semibold">Informações</h2>

          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Promoção da Semana - 23/05"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Descrição (opcional)</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição curta do encarte..."
              rows={2}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Categoria</label>
            <select
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
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
              <label className="block text-sm text-gray-600 mb-1.5">Data de início</label>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Data de fim</label>
              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
            </div>
          </div>
        </div>

        {/* Upload de imagens */}
        <div className="bg-white border border-orange-100 rounded-2xl p-6">
          <h2 className="text-gray-800 font-semibold mb-4">Imagens do encarte</h2>

          <div
            onDragOver={(e) => { e.preventDefault(); setArrastando(true) }}
            onDragLeave={() => setArrastando(false)}
            onDrop={onDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer ${
              arrastando ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-300'
            }`}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <p className="text-4xl mb-2">🖼️</p>
            <p className="text-gray-600 text-sm font-medium">
              Arraste as imagens aqui ou clique para selecionar
            </p>
            <p className="text-gray-400 text-xs mt-1">PNG, JPG, WEBP — sem limite de quantidade</p>
            <input
              id="file-input"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => adicionarArquivos(e.target.files)}
            />
          </div>

          {imagens.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
              {imagens.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.preview}
                    alt=""
                    className={`w-full aspect-square object-cover rounded-xl border ${
                      img.erro ? 'border-red-400' : 'border-orange-100'
                    }`}
                  />

                  {img.uploading && (
                    <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                    </div>
                  )}

                  {img.erro && (
                    <div className="absolute inset-0 bg-red-100/80 rounded-xl flex items-center justify-center">
                      <p className="text-red-600 text-xs text-center px-2">Erro no upload</p>
                    </div>
                  )}

                  {img.url && !img.uploading && (
                    <div className="absolute top-1.5 left-1.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}

                  <button
                    onClick={() => removerImagem(index)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Erro e botão */}
        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
            {erro}
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => router.push('/admin/encartes')}
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleSalvar}
            disabled={salvando}
            className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold rounded-xl py-3 text-sm transition shadow-md"
          >
            {salvando ? 'Salvando...' : 'Salvar encarte'}
          </button>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Categoria {
  id: string
  nome: string
  icone: string
}

export default function NovoProdutoPage() {
  const router = useRouter()
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [precoVarejo, setPrecoVarejo] = useState('')
  const [precoAtacado, setPrecoAtacado] = useState('')
  const [quantidadeAtacado, setQuantidadeAtacado] = useState('')
  const [unidade, setUnidade] = useState('un')
  const [categoriaId, setCategoriaId] = useState('')
  const [destaque, setDestaque] = useState(false)
  const [imagemUrl, setImagemUrl] = useState('')
  const [cloudinaryId, setCloudinaryId] = useState('')
  const [uploadando, setUploadando] = useState(false)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    fetch('/api/categorias-produtos')
      .then((r) => r.json())
      .then(setCategorias)
  }, [])

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
      setErro('Erro no upload')
    }
    setUploadando(false)
  }

  async function handleSalvar() {
    if (!nome || !precoVarejo) {
      setErro('Preencha nome e preço de varejo')
      return
    }
    setSalvando(true)
    setErro('')

    const res = await fetch('/api/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome, descricao, preco_varejo: parseFloat(precoVarejo),
        preco_atacado: precoAtacado ? parseFloat(precoAtacado) : null,
        quantidade_atacado: quantidadeAtacado ? parseInt(quantidadeAtacado, 10) : 1,
        unidade, categoria_id: categoriaId || null, destaque,
        imagem_url: imagemUrl || null, cloudinary_id: cloudinaryId || null,
      }),
    })

    if (res.ok) {
      router.push('/admin/produtos')
    } else {
      const data = await res.json()
      setErro(data.erro || 'Erro ao salvar')
      setSalvando(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Novo produto</h1>
        <p className="text-gray-500 text-sm mt-1">Cadastre um produto para o catálogo</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-orange-100 rounded-2xl p-6 space-y-4">
          <h2 className="text-gray-800 font-semibold">Informações</h2>

          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Nome</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Arroz Tio João 5kg" className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Descrição (opcional)</label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)}
              rows={2} className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition resize-none" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Preço varejo (R$)</label>
              <input type="number" step="0.01" value={precoVarejo} onChange={(e) => setPrecoVarejo(e.target.value)}
                placeholder="0.00" className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Preço atacado (R$)</label>
              <input type="number" step="0.01" value={precoAtacado} onChange={(e) => setPrecoAtacado(e.target.value)}
                placeholder="0.00" className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Unidade</label>
              <select value={unidade} onChange={(e) => setUnidade(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition">
                <option value="un">Unidade</option>
                <option value="kg">Kg</option>
                <option value="cx">Caixa</option>
                <option value="fd">Fardo</option>
                <option value="pct">Pacote</option>
                <option value="lt">Litro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1.5">A partir de quantas unidades sai o preço de atacado?</label>
            <input type="number" min="1" step="1" value={quantidadeAtacado} onChange={(e) => setQuantidadeAtacado(e.target.value)}
              placeholder="Ex: 6 (deixe 1 ou vazio se não tiver mínimo)"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition" />
            <p className="text-xs text-gray-400 mt-1">O cliente verá &quot;Acima de X unidades&quot; quando o valor for maior que 1.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Categoria</label>
              <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition">
                <option value="">Sem categoria</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.icone} {cat.nome}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={destaque} onChange={(e) => setDestaque(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                <span className="text-sm text-gray-600">Produto em destaque</span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white border border-orange-100 rounded-2xl p-6">
          <h2 className="text-gray-800 font-semibold mb-4">Imagem do produto</h2>
          {imagemUrl ? (
            <div className="relative inline-block">
              <img src={imagemUrl} alt="" className="w-48 h-48 object-cover rounded-xl border border-orange-100" />
              <button onClick={() => { setImagemUrl(''); setCloudinaryId('') }}
                className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs">✕</button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-orange-300 transition"
              onClick={() => document.getElementById('produto-img')?.click()}>
              <p className="text-3xl mb-2">📦</p>
              <p className="text-gray-600 text-sm">{uploadando ? 'Enviando...' : 'Clique para selecionar a imagem'}</p>
              <input id="produto-img" type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e.target.files)} />
            </div>
          )}
        </div>

        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{erro}</div>
        )}

        <div className="flex gap-4">
          <button onClick={() => router.push('/admin/produtos')}
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition text-sm font-medium">
            Cancelar
          </button>
          <button onClick={handleSalvar} disabled={salvando}
            className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold rounded-xl py-3 text-sm transition shadow-md">
            {salvando ? 'Salvando...' : 'Criar produto'}
          </button>
        </div>
      </div>
    </div>
  )
}

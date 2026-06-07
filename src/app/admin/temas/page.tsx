'use client'

import { useEffect, useState } from 'react'

interface Tema {
  id: string
  nome: string
  cor_primaria: string
  cor_secundaria: string
  cor_fundo: string
  cor_texto: string
  imagem_fundo: string | null
  mascote_url?: string | null
  verificados_url?: string | null
  ativo: boolean
}

const TEMAS_PRONTOS = [
  { nome: 'Padrão Certo', cor_primaria: '#EB6E10', cor_secundaria: '#F97316', cor_fundo: '#FFFFFF', cor_texto: '#1F2937' },
  { nome: 'Black Friday', cor_primaria: '#FBBF24', cor_secundaria: '#F59E0B', cor_fundo: '#111827', cor_texto: '#FFFFFF' },
  { nome: 'Copa do Mundo', cor_primaria: '#009C3B', cor_secundaria: '#FFDF00', cor_fundo: '#003F2D', cor_texto: '#FFFFFF' },
  { nome: 'Natal', cor_primaria: '#DC2626', cor_secundaria: '#16A34A', cor_fundo: '#FEF2F2', cor_texto: '#1F2937' },
  { nome: 'Páscoa', cor_primaria: '#A855F7', cor_secundaria: '#F472B6', cor_fundo: '#FAF5FF', cor_texto: '#1F2937' },
  { nome: 'Dia das Mães', cor_primaria: '#EC4899', cor_secundaria: '#F43F5E', cor_fundo: '#FDF2F8', cor_texto: '#1F2937' },
  { nome: 'Festa Junina', cor_primaria: '#F59E0B', cor_secundaria: '#EF4444', cor_fundo: '#FFFBEB', cor_texto: '#1F2937' },
]

function withBgRemoval(url: string | null | undefined): string | undefined {
  if (!url) return undefined
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', '/upload/e_background_removal/q_auto,f_auto/')
  }
  return url
}

export default function TemasPage() {
  const [temas, setTemas] = useState<Tema[]>([])
  const [carregando, setCarregando] = useState(true)
  const [nome, setNome] = useState('')
  const [corPrimaria, setCorPrimaria] = useState('#EB6E10')
  const [corSecundaria, setCorSecundaria] = useState('#EA580C')
  const [corFundo, setCorFundo] = useState('#FFFFFF')
  const [corTexto, setCorTexto] = useState('#1F2937')
  const [salvando, setSalvando] = useState(false)
  const [imagemMascote, setImagemMascote] = useState<string | null>(null)
  const [imagemVerificados, setImagemVerificados] = useState<string | null>(null)
  const [uploadando, setUploadando] = useState(false)

  async function carregar() {
    const res = await fetch('/api/temas')
    const data = await res.json()
    setTemas(Array.isArray(data) ? data : [])
    setCarregando(false)
  }

  useEffect(() => {
    let active = true
    fetch('/api/temas')
      .then((r) => r.json())
      .then((data) => { if (active) { setTemas(Array.isArray(data) ? data : []); setCarregando(false) } })
    return () => { active = false }
  }, [])

  async function handleUploadImagem(files: FileList | null, tipo: 'mascote' | 'verificados') {
    if (!files || files.length === 0) return
    setUploadando(true)
    const formData = new FormData()
    formData.append('files', files[0])

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok && data.imagens?.length > 0) {
        if (tipo === 'mascote') {
          setImagemMascote(data.imagens[0].url)
        } else {
          setImagemVerificados(data.imagens[0].url)
        }
      }
    } catch {
      alert('Erro no upload')
    }
    setUploadando(false)
  }

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

  async function criarTemaPronto(tema: typeof TEMAS_PRONTOS[0]) {
    setSalvando(true)
    await fetch('/api/temas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: tema.nome,
        cor_primaria: tema.cor_primaria,
        cor_secundaria: tema.cor_secundaria,
        cor_fundo: tema.cor_fundo,
        cor_texto: tema.cor_texto,
      }),
    })
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

  async function excluirTema(id: string, nome: string) {
    if (!confirm(`Excluir o tema "${nome}"? Esta ação não pode ser desfeita.`)) return
    const res = await fetch(`/api/temas?id=${id}`, { method: 'DELETE' })
    const data = await res.json()
    if (!res.ok) {
      alert(data.erro || 'Erro ao excluir tema.')
      return
    }
    carregar()
  }

  async function atualizarImagens() {
    if (!imagemMascote && !imagemVerificados) return
    const temaAtivo = temas.find((t) => t.ativo)
    if (!temaAtivo) {
      alert('Ative um tema primeiro para aplicar as imagens a ele.')
      return
    }
    setSalvando(true)
    const body: Record<string, string> = { id: temaAtivo.id }
    if (imagemMascote) body.mascote_url = imagemMascote
    if (imagemVerificados) body.verificados_url = imagemVerificados
    await fetch('/api/temas', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    setSalvando(false)
    setImagemMascote(null)
    setImagemVerificados(null)
    carregar()
    alert(`Imagens aplicadas ao tema "${temaAtivo.nome}"! Recarregue o site para ver.`)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Temas & Cores</h1>
        <p className="text-gray-500 text-sm mt-1">Personalize a aparência do site público</p>
      </div>

      <div className="space-y-6">
        {/* Pre-made themes */}
        <div className="bg-white border border-orange-100 rounded-2xl p-6">
          <h2 className="text-gray-800 font-semibold mb-4">Temas prontos</h2>
          <p className="text-gray-500 text-xs mb-4">Clique para adicionar um tema pré-configurado</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {TEMAS_PRONTOS.map((tema) => (
              <button
                key={tema.nome}
                onClick={() => criarTemaPronto(tema)}
                disabled={salvando}
                className="p-3 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition text-left"
              >
                <div className="flex gap-1 mb-2">
                  <span className="w-5 h-5 rounded-full border" style={{ backgroundColor: tema.cor_primaria }} />
                  <span className="w-5 h-5 rounded-full border" style={{ backgroundColor: tema.cor_secundaria }} />
                  <span className="w-5 h-5 rounded-full border" style={{ backgroundColor: tema.cor_fundo }} />
                </div>
                <p className="text-xs font-medium text-gray-700">{tema.nome}</p>
                <div className="mt-1 rounded-lg p-1.5" style={{ backgroundColor: tema.cor_fundo }}>
                  <p className="text-[10px] font-bold" style={{ color: tema.cor_primaria }}>Certo</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Custom theme creator */}
          <div className="bg-white border border-orange-100 rounded-2xl p-6">
            <h2 className="text-gray-800 font-semibold mb-4">Tema personalizado</h2>
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

          {/* Existing themes */}
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
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-2">
                        <span className="w-6 h-6 rounded-full border" style={{ backgroundColor: tema.cor_primaria }} title="Primária" />
                        <span className="w-6 h-6 rounded-full border" style={{ backgroundColor: tema.cor_secundaria }} title="Secundária" />
                        <span className="w-6 h-6 rounded-full border" style={{ backgroundColor: tema.cor_fundo }} title="Fundo" />
                        <span className="w-6 h-6 rounded-full border" style={{ backgroundColor: tema.cor_texto }} title="Texto" />
                      </div>
                      {!tema.ativo && (
                        <button
                          onClick={() => excluirTema(tema.id, tema.nome)}
                          className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-lg transition"
                          title="Excluir tema"
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Image upload for mascote and verificados */}
        <div className="bg-white border border-orange-100 rounded-2xl p-6">
          <h2 className="text-gray-800 font-semibold mb-2">Imagens do tema (hero / verificados)</h2>
          <p className="text-gray-500 text-xs mb-4">
            As imagens são salvas no tema <strong>ativo</strong>{temas.find((t) => t.ativo) ? ` ("${temas.find((t) => t.ativo)!.nome}")` : ''}. Os personagens da mascote do hero ficam flutuando automaticamente, e mudam junto quando você troca de tema.
          </p>
          {(() => {
            const ativo = temas.find((t) => t.ativo)
            if (!ativo || (!ativo.mascote_url && !ativo.verificados_url)) return null
            return (
              <div className="flex gap-4 mb-4">
                {ativo.mascote_url && (
                  <div className="text-center">
                    <p className="text-[11px] text-gray-400 mb-1">Mascote atual</p>
                    <img src={withBgRemoval(ativo.mascote_url)} alt="" className="w-20 h-20 object-contain rounded-lg border bg-gray-50" />
                  </div>
                )}
                {ativo.verificados_url && (
                  <div className="text-center">
                    <p className="text-[11px] text-gray-400 mb-1">Verificados atual</p>
                    <img src={ativo.verificados_url} alt="" className="h-20 object-contain rounded-lg border bg-gray-50" />
                  </div>
                )}
              </div>
            )
          })()}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Mascote do Hero (bonecos)</label>
              {imagemMascote ? (
                <div className="relative">
                  <img src={withBgRemoval(imagemMascote) || ""} alt="Nova mascote" className="w-full h-40 object-contain rounded-xl border bg-gray-50" />
                  <button onClick={() => setImagemMascote(null)}
                    className="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">
                    ✕
                  </button>
                </div>
              ) : (
                <label className="block border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-orange-300 transition">
                  <span className="text-gray-400 text-sm">{uploadando ? 'Enviando...' : 'Clique para enviar nova mascote'}</span>
                  <input type="file" accept="image/*" className="hidden"
                    onChange={(e) => handleUploadImagem(e.target.files, 'mascote')} />
                </label>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Banner Verificados</label>
              {imagemVerificados ? (
                <div className="relative">
                  <img src={imagemVerificados} alt="Novo verificados" className="w-full h-40 object-contain rounded-xl border bg-gray-50" />
                  <button onClick={() => setImagemVerificados(null)}
                    className="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">
                    ✕
                  </button>
                </div>
              ) : (
                <label className="block border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-orange-300 transition">
                  <span className="text-gray-400 text-sm">{uploadando ? 'Enviando...' : 'Clique para enviar novo banner'}</span>
                  <input type="file" accept="image/*" className="hidden"
                    onChange={(e) => handleUploadImagem(e.target.files, 'verificados')} />
                </label>
              )}
            </div>
          </div>
          {(imagemMascote || imagemVerificados) && (
            <button
              onClick={atualizarImagens}
              disabled={salvando}
              className="mt-4 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold rounded-xl px-6 py-3 text-sm transition shadow-md"
            >
              {salvando ? 'Salvando...' : 'Aplicar imagens'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'

interface Sorteio {
  id: string
  titulo: string
  descricao: string
  imagem_url: string | null
  link_criterio: string | null
  descricao_link: string | null
  data_fim: string
}

export default function SorteiosSection() {
  const [sorteios, setSorteios] = useState<Sorteio[]>([])
  const [participando, setParticipando] = useState<string | null>(null)
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    fetch('/api/site')
      .then((r) => r.json())
      .then((data) => setSorteios(data.sorteios ?? []))
  }, [])

  async function handleParticipar(sorteioId: string) {
    if (!nome || !telefone) {
      setMensagem('Preencha nome e telefone')
      return
    }
    setEnviando(true)
    setMensagem('')

    const res = await fetch(`/api/sorteios/${sorteioId}/participar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, telefone }),
    })

    const data = await res.json()
    if (res.ok) {
      setMensagem('Inscrição realizada com sucesso! Boa sorte!')
      setNome('')
      setTelefone('')
    } else {
      setMensagem(data.erro || 'Erro ao participar')
    }
    setEnviando(false)
  }

  if (sorteios.length === 0) return null

  return (
    <section id="sorteios" className="py-16 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Sorteios
          </h2>
          <p className="text-gray-500 mt-2">Participe e concorra a prêmios incríveis!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {sorteios.map((sorteio) => (
            <div
              key={sorteio.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-orange-100"
            >
              {sorteio.imagem_url && (
                <img
                  src={sorteio.imagem_url}
                  alt={sorteio.titulo}
                  className="w-full h-56 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-gray-800 font-bold text-xl mb-2">{sorteio.titulo}</h3>
                {sorteio.descricao && (
                  <p className="text-gray-500 text-sm mb-3">{sorteio.descricao}</p>
                )}
                <p className="text-orange-600 text-xs font-medium mb-4">
                  Participe até {new Date(sorteio.data_fim).toLocaleDateString('pt-BR')}
                </p>

                {sorteio.link_criterio && (
                  <a
                    href={sorteio.link_criterio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center text-sm font-semibold px-4 py-3 rounded-xl mb-4 hover:opacity-90 transition"
                  >
                    {sorteio.descricao_link || 'Cumprir critério para participar'}
                  </a>
                )}

                {participando === sorteio.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Seu nome completo"
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                    />
                    <input
                      type="tel"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      placeholder="(00) 00000-0000"
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                    />
                    {mensagem && (
                      <p className={`text-sm ${mensagem.includes('sucesso') ? 'text-green-600' : 'text-red-500'}`}>
                        {mensagem}
                      </p>
                    )}
                    <button
                      onClick={() => handleParticipar(sorteio.id)}
                      disabled={enviando}
                      className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold rounded-xl py-3 text-sm transition shadow-md"
                    >
                      {enviando ? 'Enviando...' : 'Confirmar participação'}
                    </button>
                    <button
                      onClick={() => { setParticipando(null); setMensagem('') }}
                      className="w-full text-gray-500 text-sm hover:text-gray-700 transition"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setParticipando(sorteio.id); setMensagem('') }}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl py-3 text-base transition shadow-md"
                  >
                    Quero participar!
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

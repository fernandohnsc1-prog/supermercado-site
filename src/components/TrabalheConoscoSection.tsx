'use client'

import { useState } from 'react'

export default function TrabalheConoscoSection() {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cargo, setCargo] = useState('')
  const [enviado, setEnviado] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const texto = encodeURIComponent(
      `Olá! Gostaria de trabalhar no Certo Atacado.\n\nNome: ${nome}\nTelefone: ${telefone}\nCargo desejado: ${cargo}`
    )
    window.open(`https://wa.me/5500000000000?text=${texto}`, '_blank')
    setEnviado(true)
    setNome('')
    setTelefone('')
    setCargo('')
  }

  return (
    <section id="trabalhe-conosco" className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Trabalhe Conosco
          </h2>
          <p className="text-gray-500 mt-2">Faça parte da família Certo Atacado!</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <p className="text-gray-600 text-sm mb-6">
            Estamos sempre em busca de pessoas comprometidas e apaixonadas pelo que fazem.
            Preencha o formulário abaixo e entraremos em contato!
          </p>

          {enviado && (
            <p className="text-green-600 text-sm mb-4 bg-green-50 p-3 rounded-xl">
              Redirecionando para WhatsApp...
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Nome completo</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome completo"
                required
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Telefone</label>
              <input
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(00) 00000-0000"
                required
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Cargo desejado</label>
              <select
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              >
                <option value="">Selecione...</option>
                <option value="Operador de Caixa">Operador de Caixa</option>
                <option value="Repositor">Repositor</option>
                <option value="Açougueiro">Açougueiro</option>
                <option value="Padeiro">Padeiro</option>
                <option value="Auxiliar de Limpeza">Auxiliar de Limpeza</option>
                <option value="Fiscal de Loja">Fiscal de Loja</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl py-3 text-sm transition shadow-md"
            >
              Enviar candidatura via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

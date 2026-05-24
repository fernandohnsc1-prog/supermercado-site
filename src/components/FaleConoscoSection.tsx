'use client'

import { useState } from 'react'

export default function FaleConoscoSection() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagemTexto, setMensagemTexto] = useState('')
  const [enviado, setEnviado] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const texto = encodeURIComponent(
      `Olá! Meu nome é ${nome}.\nE-mail: ${email}\n\n${mensagemTexto}`
    )
    window.open(`https://wa.me/5551911198639?text=${texto}`, '_blank')
    setEnviado(true)
    setNome('')
    setEmail('')
    setMensagemTexto('')
  }

  return (
    <section id="fale-conosco" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Fale Conosco
          </h2>
          <p className="text-gray-500 mt-2">Estamos sempre prontos para atender você</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-6">Informações de contato</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold">Endereço</p>
                  <p className="text-orange-100 text-sm">Taquara, RS</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-semibold">Fale Conosco</p>
                  <p className="text-orange-100 text-sm">(51) 9119-8639</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="font-semibold">Televendas</p>
                  <p className="text-orange-100 text-sm">(51) 9707-8458</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⏰</span>
                <div>
                  <p className="font-semibold">Horário</p>
                  <p className="text-orange-100 text-sm">Seg a Dom: 8h às 20h</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="font-semibold">E-mail</p>
                  <p className="text-orange-100 text-sm">contato@certoatacado.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Envie sua mensagem</h3>
            {enviado && (
              <p className="text-green-600 text-sm mb-4 bg-green-50 p-3 rounded-xl">
                Redirecionando para WhatsApp...
              </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                required
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail"
                required
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
              <textarea
                value={mensagemTexto}
                onChange={(e) => setMensagemTexto(e.target.value)}
                placeholder="Sua mensagem..."
                rows={4}
                required
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition resize-none"
              />
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl py-3 text-sm transition shadow-md"
              >
                Enviar via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

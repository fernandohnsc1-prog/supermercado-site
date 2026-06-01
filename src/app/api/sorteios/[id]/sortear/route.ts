import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const { data: participantes, error: errPart } = await supabaseAdmin
    .from('sorteio_participantes')
    .select('*')
    .eq('sorteio_id', id)

  if (errPart) return NextResponse.json({ erro: errPart.message }, { status: 500 })
  if (!participantes || participantes.length === 0) {
    return NextResponse.json({ erro: 'Nenhum participante inscrito' }, { status: 400 })
  }

  const indice = Math.floor(Math.random() * participantes.length)
  const ganhador = participantes[indice]

  const { error: errUpdate } = await supabaseAdmin
    .from('sorteios')
    .update({
      ativo: false,
      sorteado: true,
      ganhador_nome: ganhador.nome,
      ganhador_telefone: ganhador.telefone,
      data_realizado: new Date().toISOString(),
    })
    .eq('id', id)

  if (errUpdate) return NextResponse.json({ erro: errUpdate.message }, { status: 500 })

  const telefone = ganhador.telefone.replace(/\D/g, '')
  const whatsappLink = `https://wa.me/55${telefone}`

  return NextResponse.json({
    sucesso: true,
    ganhador: {
      id: ganhador.id,
      nome: ganhador.nome,
      whatsapp_link: whatsappLink,
    },
  })
}

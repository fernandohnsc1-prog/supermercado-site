import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { nome, telefone } = await request.json()

  if (!nome || !telefone) {
    return NextResponse.json({ erro: 'Nome e telefone são obrigatórios' }, { status: 400 })
  }

  const { data: sorteio } = await supabaseAdmin
    .from('sorteios')
    .select('ativo, data_fim, sorteado')
    .eq('id', id)
    .single()

  if (!sorteio || !sorteio.ativo || sorteio.sorteado) {
    return NextResponse.json({ erro: 'Sorteio não disponível' }, { status: 400 })
  }

  if (new Date(sorteio.data_fim) < new Date()) {
    return NextResponse.json({ erro: 'Sorteio encerrado' }, { status: 400 })
  }

  const telefoneLimpo = telefone.replace(/\D/g, '')

  const { error } = await supabaseAdmin
    .from('sorteio_participantes')
    .insert({ sorteio_id: id, nome, telefone: telefoneLimpo })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ erro: 'Este telefone já está participando deste sorteio' }, { status: 409 })
    }
    return NextResponse.json({ erro: error.message }, { status: 500 })
  }

  return NextResponse.json({ sucesso: true })
}

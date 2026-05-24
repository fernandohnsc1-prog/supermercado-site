import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const { data: sorteio, error } = await supabaseAdmin
    .from('sorteios')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 })

  const { data: participantes } = await supabaseAdmin
    .from('sorteio_participantes')
    .select('*')
    .eq('sorteio_id', id)
    .order('created_at', { ascending: false })

  return NextResponse.json({ ...sorteio, participantes: participantes ?? [] })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()

  const { data, error } = await supabaseAdmin
    .from('sorteios')
    .update(body)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 })
  return NextResponse.json({ sucesso: true, data })
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const { error } = await supabaseAdmin
    .from('sorteios')
    .delete()
    .eq('id', id)

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 })
  return NextResponse.json({ sucesso: true })
}

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('temas')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { nome, cor_primaria, cor_secundaria, cor_fundo, cor_texto, ativo } = body

  if (ativo) {
    await supabaseAdmin.from('temas').update({ ativo: false }).eq('ativo', true)
  }

  const { data, error } = await supabaseAdmin
    .from('temas')
    .insert({ nome, cor_primaria, cor_secundaria, cor_fundo, cor_texto, ativo: ativo ?? false })
    .select()
    .single()

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 })
  return NextResponse.json({ sucesso: true, data })
}

export async function PATCH(request: NextRequest) {
  const body = await request.json()
  const { id, ...campos } = body

  if (campos.ativo) {
    await supabaseAdmin.from('temas').update({ ativo: false }).eq('ativo', true)
  }

  const { data, error } = await supabaseAdmin
    .from('temas')
    .update(campos)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 })
  return NextResponse.json({ sucesso: true, data })
}

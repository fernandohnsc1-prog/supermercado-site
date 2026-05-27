import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('televendas')
    .select('*')
    .eq('ativo', true)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { nome, whatsapp, ativo } = body

  const { data, error } = await supabaseAdmin
    .from('televendas')
    .insert({ nome, whatsapp, ativo: ativo ?? true })
    .select()
    .single()

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 })
  return NextResponse.json({ sucesso: true, data })
}

export async function PATCH(request: NextRequest) {
  const body = await request.json()
  const { id, ...campos } = body

  const { data, error } = supabaseAdmin
    .from('televendas')
    .update(campos)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 })
  return NextResponse.json({ sucesso: true, data })
}
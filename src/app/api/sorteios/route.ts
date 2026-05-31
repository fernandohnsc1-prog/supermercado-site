import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('sorteios')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { titulo, descricao, imagem_url, cloudinary_id, premio, data_sorteio } = body

  const { data, error } = await supabaseAdmin
    .from('sorteios')
    .insert({ titulo, descricao, imagem_url, cloudinary_id, premio, data_sorteio, ativo: true })
    .select()
    .single()

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 })
  return NextResponse.json({ sucesso: true, data })
}

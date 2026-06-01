import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('lojas')
    .select('*')
    .order('ordem', { ascending: true })

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { nome, endereco, bairro, maps_link, imagem_url, cloudinary_id, ordem } = body

  const { data, error } = await supabaseAdmin
    .from('lojas')
    .insert({
      nome,
      endereco: endereco ?? null,
      bairro: bairro ?? null,
      maps_link: maps_link ?? null,
      imagem_url: imagem_url ?? null,
      cloudinary_id: cloudinary_id ?? null,
      ordem: ordem ?? 0,
      ativo: true,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 })
  return NextResponse.json({ sucesso: true, data })
}

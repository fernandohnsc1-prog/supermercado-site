import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// Listar todos os encartes
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('encartes')
    .select(`
      *,
      categoria:categorias_encartes(id, nome, icone, cor),
      imagens:encarte_imagens(id, imagem_url, cloudinary_id, ordem)
    `)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// Criar novo encarte
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { titulo, descricao, categoria_id, televendas_id, data_inicio, data_fim, imagens } = body

    const { data: encarte, error } = await supabaseAdmin
      .from('encartes')
      .insert({ 
        titulo, 
        descricao, 
        categoria_id, 
        televendas_id: televendas_id || null,
        data_inicio, 
        data_fim, 
        ativo: true, 
        ordem: 0 
      })
      .select()
      .single()

    if (error) return NextResponse.json({ erro: error.message }, { status: 500 })

    if (imagens && imagens.length > 0) {
      const imagensParaInserir = imagens.map((img: { url: string; cloudinary_id: string }, index: number) => ({
        encarte_id: encarte.id,
        imagem_url: img.url,
        cloudinary_id: img.cloudinary_id,
        ordem: index,
      }))

      await supabaseAdmin.from('encarte_imagens').insert(imagensParaInserir)
    }

    return NextResponse.json({ sucesso: true, encarte })
  } catch {
    return NextResponse.json({ erro: 'Erro interno' }, { status: 500 })
  }
}
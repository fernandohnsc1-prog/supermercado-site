import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import cloudinary from '@/lib/cloudinary'

// Ativar / desativar / editar
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json()

  const { data, error } = await supabaseAdmin
    .from('encartes')
    .update(body)
    .eq('id', params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 })
  return NextResponse.json({ sucesso: true, data })
}

// Deletar encarte e imagens do Cloudinary
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  // Busca as imagens para deletar do Cloudinary
  const { data: imagens } = await supabaseAdmin
    .from('encarte_imagens')
    .select('cloudinary_id')
    .eq('encarte_id', params.id)

  // Deleta do Cloudinary
  if (imagens && imagens.length > 0) {
    await Promise.all(
      imagens.map((img) => cloudinary.uploader.destroy(img.cloudinary_id))
    )
  }

  // Deleta do banco (ON DELETE CASCADE apaga as imagens automaticamente)
  const { error } = await supabaseAdmin
    .from('encartes')
    .delete()
    .eq('id', params.id)

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 })
  return NextResponse.json({ sucesso: true })
}
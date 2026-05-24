import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()

  const { data, error } = await supabaseAdmin
    .from('produtos')
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
    .from('produtos')
    .delete()
    .eq('id', id)

  if (error) return NextResponse.json({ erro: error.message }, { status: 500 })
  return NextResponse.json({ sucesso: true })
}

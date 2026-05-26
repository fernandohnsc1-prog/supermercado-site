import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import cloudinary from '@/lib/cloudinary'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const contentType = request.headers.get('content-type') || ''

  let nome = ''
  let telefone = ''
  let comprovanteUrl: string | null = null
  let comprovanteCloudinaryId: string | null = null

  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData()
    nome = formData.get('nome') as string || ''
    telefone = formData.get('telefone') as string || ''
    const foto = formData.get('comprovante') as File | null

    if (foto && foto.size > 0) {
      try {
        const bytes = await foto.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = `data:${foto.type};base64,${buffer.toString('base64')}`
        const result = await cloudinary.uploader.upload(base64, {
          folder: 'certo-atacado/comprovantes',
          resource_type: 'image',
        })
        comprovanteUrl = result.secure_url
        comprovanteCloudinaryId = result.public_id
      } catch {
        return NextResponse.json({ erro: 'Erro ao enviar comprovante' }, { status: 500 })
      }
    }
  } else {
    const body = await request.json()
    nome = body.nome || ''
    telefone = body.telefone || ''
  }

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

  const insertData: Record<string, unknown> = {
    sorteio_id: id,
    nome,
    telefone: telefoneLimpo,
  }

  if (comprovanteUrl) {
    insertData.comprovante_url = comprovanteUrl
    insertData.comprovante_cloudinary_id = comprovanteCloudinaryId
  }

  const { error } = await supabaseAdmin
    .from('sorteio_participantes')
    .insert(insertData)

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ erro: 'Este telefone já está participando deste sorteio' }, { status: 409 })
    }
    return NextResponse.json({ erro: error.message }, { status: 500 })
  }

  return NextResponse.json({ sucesso: true })
}

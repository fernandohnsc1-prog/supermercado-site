import { NextRequest, NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ erro: 'Nenhum arquivo enviado' }, { status: 400 })
    }

    const uploads = await Promise.all(
      files.map(async (file, index) => {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

        const result = await cloudinary.uploader.upload(base64, {
          folder: 'certo-atacado',
          resource_type: 'image',
        })

        return {
          url: result.secure_url,
          cloudinary_id: result.public_id,
          ordem: index,
        }
      })
    )

    return NextResponse.json({ sucesso: true, imagens: uploads })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ erro: 'Erro no upload' }, { status: 500 })
  }
}

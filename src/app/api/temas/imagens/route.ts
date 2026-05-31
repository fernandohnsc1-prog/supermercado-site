import { NextRequest, NextResponse } from 'next/server'
import { writeFile, copyFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { mascote_url, verificados_url } = body

  const publicDir = join(process.cwd(), 'public')

  try {
    if (mascote_url) {
      const res = await fetch(mascote_url)
      const buffer = Buffer.from(await res.arrayBuffer())
      const backupPath = join(publicDir, 'mascote-certo-backup.png')
      const mainPath = join(publicDir, 'mascote-certo.png')
      try { await copyFile(mainPath, backupPath) } catch {}
      await writeFile(mainPath, buffer)
    }

    if (verificados_url) {
      const res = await fetch(verificados_url)
      const buffer = Buffer.from(await res.arrayBuffer())
      const backupPath = join(publicDir, 'verificados-backup.png')
      const mainPath = join(publicDir, 'verificados.png')
      try { await copyFile(mainPath, backupPath) } catch {}
      await writeFile(mainPath, buffer)
    }

    return NextResponse.json({ sucesso: true })
  } catch {
    return NextResponse.json({ erro: 'Erro ao salvar imagens' }, { status: 500 })
  }
}

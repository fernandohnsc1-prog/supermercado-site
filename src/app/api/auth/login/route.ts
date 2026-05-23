import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { compararSenha, gerarToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, senha } = await request.json()

    if (!email || !senha) {
      return NextResponse.json(
        { erro: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    const { data: admin, error } = await supabaseAdmin
      .from('admins')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .single()

    if (error || !admin) {
      return NextResponse.json(
        { erro: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }

    const senhaValida = await compararSenha(senha, admin.password_hash)

    if (!senhaValida) {
      return NextResponse.json(
        { erro: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }

    const token = gerarToken({
      id: admin.id,
      email: admin.email,
      nome: admin.nome,
    })

    const response = NextResponse.json({
      sucesso: true,
      admin: { id: admin.id, email: admin.email, nome: admin.nome },
    })

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8,
      path: '/',
    })

    return response
  } catch {
    return NextResponse.json({ erro: 'Erro interno' }, { status: 500 })
  }
}
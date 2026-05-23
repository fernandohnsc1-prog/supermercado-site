import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET!

export interface AdminPayload {
  id: string
  email: string
  nome: string
}

// Gerar token JWT
export function gerarToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' })
}

// Verificar token JWT
export function verificarToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload
  } catch {
    return null
  }
}

// Hash de senha
export async function hashSenha(senha: string): Promise<string> {
  return bcrypt.hash(senha, 12)
}

// Comparar senha com hash
export async function compararSenha(senha: string, hash: string): Promise<boolean> {
  return bcrypt.compare(senha, hash)
}
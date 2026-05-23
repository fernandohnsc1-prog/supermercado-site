import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import ws from 'ws'

const SUPABASE_URL = 'https://rjlxkjwbidmtjfoxcpcj.supabase.co'
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqbHhrandiaWRtdGpmb3hjcGNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTU1MDYwNywiZXhwIjoyMDk1MTI2NjA3fQ.3a47a6_S_WY2zgLUUNqRpN0UmMTetxsInr6tdiOMTh8'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  realtime: {
    transport: ws as unknown as typeof WebSocket,
  },
})

async function criarAdmin() {
  const email = 'admin@certoatacado.com.br'
  const senha = 'admin123!'
  const nome = 'Administrador'
const hash = await bcrypt.hash(senha, 12)

  const { data, error } = await supabase
    .from('admins')
    .insert({ email, password_hash: hash, nome })
    .select()
    .single()

  if (error) {
    console.error('❌ Erro:', error.message)
  } else {
    console.log('✅ Admin criado com sucesso!', data)
  }
}

criarAdmin()
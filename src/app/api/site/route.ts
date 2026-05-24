import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const now = new Date().toISOString()

  const [encartesRes, sorteiosRes, produtosRes, temaRes, categoriasRes] = await Promise.all([
    supabaseAdmin
      .from('encartes')
      .select(`*, categoria:categorias_encartes(id, nome, icone, cor), imagens:encarte_imagens(id, imagem_url, ordem)`)
      .eq('ativo', true)
      .gte('data_fim', now.split('T')[0])
      .order('ordem'),
    supabaseAdmin
      .from('sorteios')
      .select('*')
      .eq('ativo', true)
      .eq('sorteado', false)
      .gte('data_fim', now)
      .order('created_at', { ascending: false }),
    supabaseAdmin
      .from('produtos')
      .select(`*, categoria:categorias_produtos(id, nome, icone)`)
      .eq('ativo', true)
      .eq('destaque', true)
      .order('ordem'),
    supabaseAdmin
      .from('temas')
      .select('*')
      .eq('ativo', true)
      .single(),
    supabaseAdmin
      .from('categorias_encartes')
      .select('*')
      .eq('ativo', true)
      .order('ordem'),
  ])

  return NextResponse.json({
    encartes: encartesRes.data ?? [],
    sorteios: sorteiosRes.data ?? [],
    produtos: produtosRes.data ?? [],
    tema: temaRes.data ?? null,
    categorias: categoriasRes.data ?? [],
  })
}

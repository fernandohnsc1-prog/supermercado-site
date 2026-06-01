/**
 * Formata uma data vinda do banco (string "YYYY-MM-DD" ou ISO completa
 * "YYYY-MM-DDTHH:mm:ss") para o padrão brasileiro DD/MM/AAAA, sem sofrer
 * com fuso horário nem gerar "Invalid Date".
 */
export function formatDataBR(valor?: string | null): string {
  if (!valor) return ''
  const datePart = valor.slice(0, 10)
  const partes = datePart.split('-')
  if (partes.length !== 3) return ''
  const [ano, mes, dia] = partes
  if (!ano || !mes || !dia) return ''
  return `${dia}/${mes}/${ano}`
}

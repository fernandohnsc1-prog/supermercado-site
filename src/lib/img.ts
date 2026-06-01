/**
 * Aplica remoção de fundo (Cloudinary AI) a uma imagem hospedada no Cloudinary.
 * Usado nas imagens de tema (mascote do hero / verificados) para que apenas os
 * personagens fiquem flutuando, sem a cor de fundo da foto enviada.
 *
 * Para URLs que não são do Cloudinary (ex.: assets locais já transparentes),
 * a URL é retornada sem alterações.
 */
export function comFundoRemovido(url?: string | null): string {
  if (!url) return ''
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url
  if (url.includes('e_background_removal')) return url
  return url.replace('/upload/', '/upload/e_background_removal,f_png/')
}

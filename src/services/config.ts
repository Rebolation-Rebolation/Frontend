/**
 * Configuração da API
 * As variáveis de ambiente devem começar com VITE_ para serem expostas pelo Vite
 */
export const API_CONFIG = {
  // Em desenvolvimento, usa o proxy do Vite (/api)
  // Em produção, usa a URL completa da API ou variável de ambiente
  baseURL: import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? '/api' : 'http://10.223.10.132:3000'),
} as const


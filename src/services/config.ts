/**
 * Configuração da API
 * As variáveis de ambiente devem começar com VITE_ para serem expostas pelo Vite
 */
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
} as const


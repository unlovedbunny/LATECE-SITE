// server/api/news/index.get.ts
import { newsService } from '~/server/services/newsServices' // Ajuste o caminho conforme sua estrutura
import type { NewsFilters } from '~/types/news'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // Tratamento dos parâmetros
  const page = parseInt(query.page as string || '1', 10)
  const limit = parseInt(query.limit as string || '6', 10) // Seu front usa 6 itens por página

  const filters: NewsFilters = {
    search: query.search as string,
    // category removido: não faz parte de NewsFilters
    featured: query.featured === 'true' ? true : undefined,
    status: 'published' // Garante retorno só de notícias publicadas
  }

  // Chama o service que você já criou
  const result = await newsService.findMany(filters, { page, limit })

  return result
})
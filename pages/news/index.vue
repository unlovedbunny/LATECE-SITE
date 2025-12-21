<template lang="pug">
.news-page-container
  // Hero Header
  header.page-header
    .hero-background
    .container
      .hero-content
        h1.page-title Notícias e Eventos
        p.page-subtitle Acompanhe as últimas novidades, pesquisas e acontecimentos do LATECE

  // Filters Section
  section.filters-section
    .container.filters-wrapper
      .search-input-wrapper
        svg.search-icon(width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24")
          path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z")
        input.search-input(
          v-model="searchQuery"
          type="text"
          placeholder="Pesquisar por título ou conteúdo..."
        )
      .category-select-wrapper
        select.category-select(v-model="selectedCategory")
          option(value="") Todas as Categorias
          option(value="Evento") 📅 Evento
          option(value="Notícia") 📰 Notícia
          option(value="Aviso") ⚠️ Aviso
          option(value="Workshop") 🎓 Workshop
          option(value="Palestra") 🎤 Palestra
          option(value="Pesquisa") 🔬 Pesquisa

  // Main Content
  main.main-content
    .container
      // Loading State
      .loading-state(v-if="isLoading")
        .loading-spinner
        p Carregando notícias...

      // News Grid
      .news-grid(v-else-if="filteredNews.length > 0")
        article.news-card(
          v-for="(news, index) in paginatedNews"
          :key="news.id"
          :style="{ animationDelay: `${index * 0.1}s` }"
        )
          .card-image-wrapper
            img.card-image(
              v-if="news.imageUrl"
              :src="news.imageUrl"
              :alt="news.title"
            )
            .image-placeholder(v-else)
              svg(width="60" height="60" fill="none" stroke="currentColor" viewBox="0 0 24 24")
                path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z")
            .card-overlay
          .card-content
            .card-meta
              span.card-category(:class="`category-${getCategorySlug(news.category)}`") {{ news.category }}
              span.card-date
                svg(width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24")
                  path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z")
                | {{ formatDate(news.createdAt) }}
            h3.card-title {{ news.title }}
            p.card-excerpt {{ news.excerpt }}
            .card-footer
              button.read-more-button(@click="viewNewsDetail(news)")
                | Leia Mais
                svg(width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24")
                  path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3")

      // Empty State
      .empty-state(v-else)
        .empty-icon 🔍
        h2.empty-title Nenhuma notícia encontrada
        p.empty-subtitle Tente ajustar os termos da sua busca ou limpar os filtros
        button.clear-filters-button(@click="clearFilters") Limpar Filtros

      // Pagination
      nav.pagination-nav(v-if="totalPages > 1 && !isLoading")
        button.pagination-button(
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
        )
          svg(width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24")
            path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7")
        button.pagination-button(
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="{ active: page === currentPage }"
        ) {{ page }}
        button.pagination-button(
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
        )
          svg(width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24")
            path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7")

  // News Detail Modal
  .news-modal(v-if="selectedNews" @click.self="closeModal")
    .modal-content
      .modal-header
        .modal-meta
          span.modal-category(:class="`category-${getCategorySlug(selectedNews.category)}`") {{ selectedNews.category }}
          span.modal-date {{ formatDate(selectedNews.createdAt) }}
        button.close-button(@click="closeModal")
          svg(width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24")
            path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12")
      .modal-body
        .modal-image(v-if="selectedNews.imageUrl")
          img(:src="selectedNews.imageUrl" :alt="selectedNews.title")
        h2.modal-title {{ selectedNews.title }}
        .modal-text(v-html="selectedNews.content")
</template>

<script setup lang="ts">
// Meta tags
useHead({
  title: 'Notícias - Laboratório de Tecnologia Assistiva',
  meta: [
    { name: 'description', content: 'Fique por dentro das últimas notícias e eventos do Laboratório de Tecnologia Assistiva da UFRN' }
  ]
})

// Dados fictícios de notícias
const newsData = [
  {
    id: 1,
    title: "LATECE apresenta projeto inovador de prótese impressa em 3D",
    excerpt: "Pesquisadores desenvolvem prótese de mão funcional com custo reduzido utilizando tecnologia de impressão 3D e materiais sustentáveis.",
    content: "<p>O Laboratório de Tecnologia Assistiva da UFRN apresentou um projeto revolucionário de prótese de mão impressa em 3D que promete democratizar o acesso a dispositivos protéticos no Brasil.</p><p>A nova prótese, desenvolvida ao longo de 18 meses por uma equipe multidisciplinar, utiliza materiais biodegradáveis e custa cerca de 90% menos que as próteses convencionais disponíveis no mercado.</p><p>Além do baixo custo, o projeto se destaca pela personalização: cada prótese é modelada digitalmente para se adaptar perfeitamente à anatomia do usuário, proporcionando maior conforto e funcionalidade.</p><p>'Este é apenas o começo. Nossa meta é tornar essa tecnologia acessível para todo o Nordeste nos próximos dois anos', afirma a coordenadora do projeto, Dra. Ana Carolina Silva.</p>",
    category: "Pesquisa",
    createdAt: "2024-12-15",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
  },
  {
    id: 2,
    title: "Workshop sobre Comunicação Aumentativa acontece em janeiro",
    excerpt: "Inscrições abertas para workshop gratuito sobre sistemas de CAA destinado a profissionais da saúde e educação.",
    content: "<p>O LATECE promoverá em janeiro de 2025 um workshop intensivo sobre Comunicação Aumentativa e Alternativa (CAA), destinado a profissionais das áreas de saúde, educação e tecnologia.</p><p>O evento será realizado nos dias 20 e 21 de janeiro, das 8h às 17h, nas instalações do laboratório. As inscrições são gratuitas mas limitadas a 50 participantes.</p><p>Durante o workshop, os participantes terão contato com as principais tecnologias de CAA disponíveis, aprenderão sobre metodologias de implementação e participarão de atividades práticas com usuários reais desses sistemas.</p><p><strong>Programação:</strong></p><ul><li>Introdução aos sistemas de CAA</li><li>Avaliação e seleção de usuários</li><li>Personalização de vocabulário</li><li>Estratégias de implementação</li><li>Estudos de caso práticos</li></ul><p>Para se inscrever, envie email para eventos@latece.ufrn.br até o dia 10 de janeiro.</p>",
    category: "Workshop",
    createdAt: "2024-12-18",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    title: "Laboratório receberá visita de pesquisadores internacionais",
    excerpt: "Delegação da Universidade de Toronto visitará LATECE para conhecer projetos e estabelecer parceria de pesquisa.",
    content: "<p>O LATECE receberá no dia 8 de janeiro uma delegação de pesquisadores da Universidade de Toronto, Canadá, especialistas em tecnologia assistiva e reabilitação.</p><p>A visita faz parte de uma iniciativa de cooperação internacional que visa estabelecer parcerias para desenvolvimento conjunto de projetos, intercâmbio de estudantes e compartilhamento de recursos.</p><p>Durante a visita, os pesquisadores canadenses conhecerão as instalações do laboratório, participarão de apresentações sobre os principais projetos em andamento e discutirão oportunidades de colaboração.</p><p>Esta é a primeira de uma série de visitas internacionais programadas para 2025, que incluem também instituições da Alemanha, Japão e Estados Unidos.</p>",
    category: "Evento",
    createdAt: "2024-12-20",
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop"
  },
  {
    id: 4,
    title: "Novo software de leitura de tela em português é lançado",
    excerpt: "LATECE desenvolve leitor de tela open-source otimizado para o português brasileiro com recursos avançados de navegação.",
    content: "<p>Após três anos de desenvolvimento, o LATECE lança oficialmente o LêBem, um software leitor de tela gratuito e open-source otimizado especialmente para o português brasileiro.</p><p>O LêBem se diferencia dos leitores existentes por sua capacidade superior de interpretação de contexto em português, reconhecimento de expressões idiomáticas e suporte nativo para conteúdos web desenvolvidos no Brasil.</p><p><strong>Principais recursos:</strong></p><ul><li>Síntese de voz em português brasileiro natural</li><li>Navegação inteligente por elementos semânticos</li><li>Suporte a PDFs acessíveis</li><li>OCR integrado para imagens com texto</li><li>Compatibilidade com leitores braille</li><li>Consumo reduzido de recursos do sistema</li></ul><p>O software está disponível gratuitamente para download no site do laboratório e pode ser instalado em computadores com Windows 10 ou superior.</p><p>Uma versão para Linux será lançada no primeiro trimestre de 2025.</p>",
    category: "Notícia",
    createdAt: "2024-12-10",
    imageUrl: "https://images.unsplash.com/photo-1517430816045-df4b7de01c9d?w=800&h=600&fit=crop"
  },
  {
    id: 5,
    title: "Palestra sobre Design Inclusivo com especialista da Microsoft",
    excerpt: "Designer sênior da Microsoft apresentará cases de sucesso em acessibilidade digital e princípios de design universal.",
    content: "<p>O LATECE tem o prazer de anunciar uma palestra especial com Ricardo Almeida, Senior Designer da Microsoft e especialista em design inclusivo, que acontecerá no dia 15 de janeiro de 2025.</p><p>Com mais de 15 anos de experiência desenvolvendo produtos acessíveis para milhões de usuários, Ricardo compartilhará cases de sucesso da Microsoft e demonstrará como princípios de design universal melhoram a experiência de todos os usuários, não apenas daqueles com deficiência.</p><p><strong>Temas abordados:</strong></p><ul><li>Princípios fundamentais de design inclusivo</li><li>Como a acessibilidade impacta os negócios</li><li>Ferramentas e metodologias práticas</li><li>Cases da Microsoft: Xbox Adaptive Controller</li><li>O futuro da acessibilidade em IA</li></ul><p>O evento é gratuito e aberto ao público, mas as vagas são limitadas. A palestra será transmitida ao vivo pelo canal do YouTube do laboratório.</p><p><strong>Data:</strong> 15 de janeiro de 2025<br><strong>Horário:</strong> 14h às 17h<br><strong>Local:</strong> Auditório Central da UFRN</p>",
    category: "Palestra",
    createdAt: "2024-12-19",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop"
  },
  {
    id: 6,
    title: "IMPORTANTE: Laboratório em recesso durante as festas",
    excerpt: "LATECE funcionará em horário reduzido de 23 de dezembro a 3 de janeiro. Atendimento emergencial disponível.",
    content: "<p><strong>Atenção comunidade acadêmica e usuários:</strong></p><p>O Laboratório de Tecnologia Assistiva estará em recesso de fim de ano entre os dias 23 de dezembro de 2024 e 3 de janeiro de 2025.</p><p>Durante este período, o laboratório funcionará em horário reduzido:</p><ul><li><strong>23 a 31 de dezembro:</strong> 8h às 12h (apenas serviços essenciais)</li><li><strong>1º de janeiro:</strong> Fechado</li><li><strong>2 e 3 de janeiro:</strong> 8h às 12h (apenas serviços essenciais)</li></ul><p><strong>Retorno normal:</strong> 6 de janeiro de 2025</p><p>Para situações emergenciais, entre em contato pelo email emergencia@latece.ufrn.br ou telefone (84) 99999-9999 (plantão).</p><p>Desejamos a todos ótimas festas e um feliz ano novo!</p>",
    category: "Aviso",
    createdAt: "2024-12-21",
    imageUrl: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800&h=600&fit=crop"
  },
  {
    id: 7,
    title: "Estudante do LATECE vence prêmio nacional de inovação",
    excerpt: "Beatriz Oliveira é premiada por desenvolvimento de app de navegação indoor para deficientes visuais.",
    content: "<p>A estudante de doutorado Beatriz Oliveira, do LATECE, conquistou o primeiro lugar no Prêmio Nacional de Inovação em Tecnologia Assistiva 2024 com seu projeto de aplicativo de navegação indoor para pessoas com deficiência visual.</p><p>O aplicativo, chamado NaviIndoor, utiliza beacons Bluetooth e inteligência artificial para guiar usuários dentro de edifícios complexos como shoppings, hospitais e universidades.</p><p>'É uma honra receber este reconhecimento. O NaviIndoor nasceu da necessidade real de usuários do laboratório e foi desenvolvido em parceria com a comunidade de pessoas cegas', comenta Beatriz.</p><p>O prêmio inclui R$ 50.000 para desenvolvimento do projeto e uma bolsa de intercâmbio de 6 meses no MIT (Massachusetts Institute of Technology).</p><p>O aplicativo entrará em fase de testes beta em março de 2025 e estará disponível gratuitamente nas lojas de aplicativos.</p>",
    category: "Notícia",
    createdAt: "2024-12-05",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
  },
  {
    id: 8,
    title: "Curso de Libras para iniciantes começa em fevereiro",
    excerpt: "Inscrições abertas para curso básico de Língua Brasileira de Sinais voltado para comunidade universitária.",
    content: "<p>O LATECE, em parceria com o Departamento de Letras da UFRN, oferecerá um curso básico de Libras (Língua Brasileira de Sinais) para a comunidade universitária.</p><p>O curso terá duração de 3 meses, com aulas duas vezes por semana, e é voltado para pessoas sem conhecimento prévio da língua. Ao final, os participantes receberão certificado de 60 horas.</p><p><strong>Informações:</strong></p><ul><li><strong>Início:</strong> 5 de fevereiro de 2025</li><li><strong>Duração:</strong> 3 meses (60 horas)</li><li><strong>Horário:</strong> Terças e quintas, 18h às 20h</li><li><strong>Vagas:</strong> 30 (prioridade para estudantes e servidores da UFRN)</li><li><strong>Investimento:</strong> Gratuito</li></ul><p>As aulas serão ministradas por instrutores surdos certificados, proporcionando uma imersão autêntica na cultura surda.</p><p>Inscrições até 25 de janeiro pelo email cursos@latece.ufrn.br</p>",
    category: "Workshop",
    createdAt: "2024-12-12",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop"
  },
  {
    id: 9,
    title: "Parceria com empresas resultará em 10 novas bolsas de pesquisa",
    excerpt: "Acordos firmados com empresas de tecnologia garantem financiamento para projetos de mestrado e doutorado.",
    content: "<p>O LATECE assinou acordos de cooperação técnico-científica com três grandes empresas de tecnologia que resultarão na criação de 10 novas bolsas de pesquisa para estudantes de mestrado e doutorado.</p><p>As empresas parceiras - TechAccessible, InclusiveTech e AssistBrasil - investirão conjuntamente R$ 2 milhões ao longo dos próximos três anos para financiar pesquisas em áreas estratégicas de tecnologia assistiva.</p><p><strong>Áreas prioritárias:</strong></p><ul><li>Inteligência artificial aplicada à acessibilidade</li><li>Realidade virtual e aumentada para reabilitação</li><li>Internet das Coisas para ambientes assistivos</li><li>Dispositivos vestíveis para monitoramento de saúde</li></ul><p>Os estudantes selecionados trabalharão em projetos conjuntos entre o laboratório e as empresas, com possibilidade de estágio e futura contratação.</p><p>Edital com critérios de seleção será publicado em janeiro de 2025.</p>",
    category: "Notícia",
    createdAt: "2024-12-08",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
  }
]

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref('')
const currentPage = ref(1)
const itemsPerPage = 6
const isLoading = ref(false)
const selectedNews = ref<any>(null)

// Computed properties
const filteredNews = computed(() => {
  let filtered = [...newsData]
  
  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(news =>
      news.title.toLowerCase().includes(query) ||
      news.excerpt.toLowerCase().includes(query) ||
      news.content.toLowerCase().includes(query)
    )
  }
  
  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(news => news.category === selectedCategory.value)
  }
  
  return filtered
})

const totalPages = computed(() => 
  Math.ceil(filteredNews.value.length / itemsPerPage)
)

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredNews.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  if (totalPages.value <= 1) return []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getCategorySlug = (category: string) => {
  return category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  currentPage.value = 1
}

const viewNewsDetail = (news: any) => {
  selectedNews.value = news
}

const closeModal = () => {
  selectedNews.value = null
}

// Watch for filter changes
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
})
</script>

<style scoped lang="scss">
// Variables
$primary-blue: #1D8A9F;
$light-blue: #64B8D1;
$primary-gradient: linear-gradient(135deg, $primary-blue 0%, $light-blue 100%);
$text-dark: #111827;
$text-light: #6b7280;
$bg-light: #f9fafb;
$border-color: #e5e7eb;

// Container
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

// Hero Header
.page-header {
  position: relative;
  background: $primary-gradient;
  padding: 4rem 1rem;
  text-align: center;
  color: white;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"><path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgba(255,255,255,0.1)"/></svg>') no-repeat bottom;
  background-size: cover;
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  animation: fadeInDown 0.8s ease-out;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.page-subtitle {
  font-size: 1.125rem;
  opacity: 0.95;
  max-width: 600px;
  margin: 0 auto;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

// Filters Section
.filters-section {
  background: white;
  padding: 1.5rem 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 10;
}

.filters-wrapper {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;

  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
}

.search-input-wrapper {
  flex: 1;
  min-width: 250px;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.search-input,
.category-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid $border-color;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: $primary-blue;
    box-shadow: 0 0 0 3px rgba(29, 138, 159, 0.1);
  }
}

.search-input {
  padding-left: 2.75rem;
}

.category-select-wrapper {
  min-width: 220px;
}

.category-select {
  cursor: pointer;
  background: white;
}

// Main Content
.main-content {
  padding: 3rem 0;
  background: $bg-light;
}

// News Grid
.news-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

// News Card
.news-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.07);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease-out both;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px rgba(0,0,0,0.15);

    .card-overlay {
      opacity: 1;
    }

    .card-image {
      transform: scale(1.1);
    }
  }
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 60%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.3);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.card-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  .card-category {
    padding: 0.25rem 0.75rem;
    border-radius: 99px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;

    &.category-pesquisa { background: #e0f2f1; color: #00796b; }
    &.category-evento { background: #e3f2fd; color: #1976d2; }
    &.category-noticia { background: #f3e5f5; color: #7b1fa2; }
    &.category-aviso { background: #fff3e0; color: #e65100; }
    &.category-workshop { background: #f1f8e9; color: #33691e; }
    &.category-palestra { background: #ede7f6; color: #512da8; }
  }

  .card-date {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.85rem;
    color: $text-light;
  }
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: $text-dark;
  line-height: 1.4;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-excerpt {
  color: $text-light;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  margin-top: auto;
  border-top: 1px solid $border-color;
  padding-top: 1.25rem;
}

.read-more-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  color: $primary-blue;
  font-weight: 600;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: $light-blue;
    gap: 0.75rem;
  }
}

// Paginação
.pagination-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 4rem;
}

.pagination-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid $border-color;
  background: white;
  color: $text-dark;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: $primary-blue;
    color: $primary-blue;
    background: rgba(29, 138, 159, 0.05);
  }

  &.active {
    background: $primary-blue;
    color: white;
    border-color: $primary-blue;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

// Modal de Detalhes
.news-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  border-radius: 24px;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);

  &::-webkit-scrollbar { width: 8px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
}

.modal-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid $border-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: white;
  z-index: 2;

  .modal-meta {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
}

.close-button {
  background: #f1f5f9;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: $text-light;
  transition: all 0.2s;

  &:hover {
    background: #e2e8f0;
    color: $text-dark;
    transform: rotate(90deg);
  }
}

.modal-body {
  padding: 2rem;

  .modal-image {
    width: 100%;
    height: 400px;
    margin-bottom: 2rem;
    border-radius: 16px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .modal-title {
    font-size: 2.25rem;
    font-weight: 800;
    color: $text-dark;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }

  .modal-text {
    color: $text-dark;
    font-size: 1.125rem;
    line-height: 1.8;

    :deep(p) { margin-bottom: 1.25rem; }
    :deep(strong) { font-weight: 700; color: $primary-blue; }
    :deep(ul) { 
      margin-bottom: 1.5rem; 
      padding-left: 1.5rem;
      li { margin-bottom: 0.5rem; }
    }
  }
}

// Estados Vazios e Loading
.empty-state {
  text-align: center;
  padding: 5rem 0;

  .empty-icon { font-size: 4rem; margin-bottom: 1.5rem; }
  .empty-title { font-size: 1.5rem; color: $text-dark; margin-bottom: 0.5rem; }
  .empty-subtitle { color: $text-light; margin-bottom: 2rem; }
}

.clear-filters-button {
  background: $primary-blue;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover { opacity: 0.9; }
}

.loading-state {
  text-align: center;
  padding: 5rem 0;

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(29, 138, 159, 0.1);
    border-left-color: $primary-blue;
    border-radius: 50%;
    margin: 0 auto 1.5rem;
    animation: spin 1s linear infinite;
  }
}

// Animations
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>

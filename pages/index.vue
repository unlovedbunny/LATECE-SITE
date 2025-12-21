<template>
  <div class="home-page">
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">{{ $t('home.title') }}</h1>
        <p class="hero-subtitle">{{ $t('home.subtitle') }}</p>
        <p class="hero-description">{{ $t('home.description') }}</p>
        <div class="hero-actions">
          <NuxtLink class="btn btn-secondary btn-lg" to="/about">{{ $t('home.learnMore') }}</NuxtLink>
          <NuxtLink class="btn btn-outline btn-lg" to="/equipment">{{ $t('home.equipment') }}</NuxtLink>
        </div>
      </div>
    </section>

    <section class="mission">
      <div class="container">
        <div class="mission-content">
          <h2 class="section-title">{{ $t('home.mission') }}</h2>
          <p class="mission-text">{{ $t('home.missionText') }}</p>
        </div>
      </div>
    </section>

    <section class="featured-news">
      <div class="container">
        <div class="news-header">
          <h2 class="section-title">{{ $t('home.latestNews') }}</h2>
          <NuxtLink class="btn btn-primary" to="/news">{{ $t('home.viewAll') }}</NuxtLink>
        </div>
        <div class="news-grid">
          <div class="news-card" v-for="newsItem in featuredNews" :key="newsItem.id">
            <div class="news-image" v-if="newsItem.imageUrl" :style="{ backgroundImage: `url(${newsItem.imageUrl})` }"></div>
            <div class="news-content">
              <div class="news-meta">
                <span>{{ formatDate(newsItem.createdAt) }}</span>
                <span v-if="newsItem.authorId">•</span>
                <span v-if="newsItem.authorId">{{ $t('news.byAuthor', { authorId: newsItem.authorId }) }}</span>
              </div>
              <h3 class="news-title">{{ newsItem.title }}</h3>
              <p class="news-excerpt">{{ newsItem.excerpt }}</p>
              <NuxtLink class="btn btn-outline btn-sm" :to="`/news/${newsItem.id}`">{{ $t('news.readMore') }}</NuxtLink>
            </div>
          </div>
        </div>
        <div class="loading-container" v-if="isLoading">
          <div class="loading-spinner"></div>
          <p>{{ $t('common.loading', 'Carregando...') }}</p>
        </div>
      </div>
    </section>

    <section class="quick-access">
      <div class="container">
        <h2 class="section-title">Acesso Rápido</h2>
        <div class="quick-access-grid">
          <!-- Seus cards de acesso rápido aqui -->
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useNewsStore } from '@/stores/news'
import { computed, onMounted } from 'vue'

useHead({
  title: 'Portal LATECE - Laboratório de Tecnologia Assistiva',
  meta: [
    { name: 'description', content: 'Portal do Laboratório de Tecnologia Assistiva da UFRN' }
  ]
})

// Stores
const newsStore = useNewsStore()

// Computed properties que buscam os dados da store
const featuredNews = computed(() => newsStore.featuredNews)
const isLoading = computed(() => newsStore.isLoading)

// Busca as notícias em destaque quando o componente é montado
onMounted(() => {
  newsStore.fetchFeaturedNews()
})

// Função para formatar datas
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
  
<style scoped lang="scss">
// Layout base
.hero {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  overflow: hidden;
  
  // Imagem de fundo do laboratório
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('../assets/imagem.png') center/cover no-repeat;
    z-index: 1;
  }
  
  // Overlay com gradiente
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(37, 99, 235, 0.92) 0%,
      rgba(59, 130, 246, 0.88) 20%,
      rgba(14, 165, 233, 0.85) 80%
    );
    z-index: 2;
  }
  
  .container {
    position: relative;
    z-index: 3;
  }
  
  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    color: white;
    animation: fadeInUp 0.8s ease-out;
  }
  
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 0.5rem 1.25rem;
    border-radius: 50px;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    
    &::before {
      content: '⚡';
      font-size: 1rem;
    }
  }
  
  .hero-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 900;
    color: white;
    margin-bottom: 1.5rem;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    line-height: 1.2;
    letter-spacing: -0.02em;
  }
  
  .hero-subtitle {
    font-size: clamp(1.125rem, 2vw, 1.5rem);
    margin-bottom: 1rem;
    font-weight: 600;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  
  .hero-description {
    font-size: clamp(1rem, 1.5vw, 1.125rem);
    margin-bottom: 2.5rem;
    line-height: 1.7;
    opacity: 0.95;
    max-width: 650px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .hero-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    
    @media (min-width: 640px) {
      flex-direction: row;
    }
    
    .btn {
      min-width: 200px;
      padding: 1rem 2rem;
      font-weight: 600;
      font-size: 1.0625rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
      }
    }
    
    .btn-secondary {
      background: white;
      color: $primary-blue;
      
      &:hover {
        background: rgba(255, 255, 255, 0.95);
      }
    }
    
    .btn-outline {
      background: transparent;
      border: 2px solid white;
      color: white;
      
      &:hover {
        background: rgba(255, 255, 255, 0.15);
      }
    }
  }
  
  // Decorative elements
  .hero-decoration {
    position: absolute;
    z-index: 2;
    opacity: 0.1;
    
    &.circle-1 {
      width: 400px;
      height: 400px;
      border: 2px solid white;
      border-radius: 50%;
      top: -200px;
      right: -100px;
    }
    
    &.circle-2 {
      width: 300px;
      height: 300px;
      border: 2px solid white;
      border-radius: 50%;
      bottom: -150px;
      left: -50px;
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
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
        <div class="news-grid" v-if="featuredNews.length > 0">
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
        <div class="loading-container" v-else-if="featuredNews.length === 0">
          <p>{{ $t('news.emptyHome', 'Nenhuma notícia disponível no momento.') }}</p>
        </div>
      </div>
    </section>

    <section class="quick-access">
      <div class="container">
        <h2 class="section-title">Acesso Rápido</h2>
        <div class="quick-access-grid">
          <NuxtLink class="quick-card" to="/about">
            <div class="quick-icon">ℹ️</div>
            <h3 class="quick-title">Sobre o LATECE</h3>
            <p class="quick-text">Conheça a missão, visão e objetivos do laboratório.</p>
          </NuxtLink>

          <NuxtLink class="quick-card" to="/equipment">
            <div class="quick-icon">🛠️</div>
            <h3 class="quick-title">Equipamentos</h3>
            <p class="quick-text">Explore o acervo de tecnologias assistivas disponíveis.</p>
          </NuxtLink>

          <NuxtLink class="quick-card" to="/publications">
            <div class="quick-icon">📚</div>
            <h3 class="quick-title">Publicações</h3>
            <p class="quick-text">Acesse artigos, teses e demais produções científicas.</p>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useNewsStore } from '@/stores/news'
import { computed, onMounted } from 'vue'

useHead({
  title: 'LATECE',
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
  
```vue
<style scoped lang="scss">
$primary-blue: #005a9c;
$nav-bg: #1565c0;
$nav-active-border: #64b5f6;
$primary-gradient: linear-gradient(135deg, #005a9c 0%, #4d9de0 100%);
$transition-fast: all 0.2s ease-in-out;
$transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* =================================
   GLOBAL CONTAINER
   ================================= */

.container {
  width: min(100% - 2rem, 1400px);
  margin-inline: auto;
}

/* =================================
   TOP BAR
   ================================= */

.top-bar {
  background: linear-gradient(135deg, #487fff 0%, #003791 100%);
  color: white;
  padding: 0.35rem 0;
  font-size: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    display: none;
  }
}

.top-bar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: clamp(1rem, 2vw, 2rem);
  flex-wrap: wrap;
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: clamp(0.8rem, 1.5vw, 1.5rem);
  flex-wrap: wrap;
}

.contact-info {
  display: flex;
  align-items: center;
  gap: clamp(0.7rem, 1vw, 1rem);
  flex-wrap: wrap;
}

/* Email e telefone */

.info-link {
  display: flex;
  align-items: center;
  gap: 0.45rem;

  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-weight: 500;

  transition: $transition-fast;

  &:hover {
    color: white;
  }

  .icon {
    font-size: 0.95rem;
    flex-shrink: 0;
  }
}

/* Instagram e YouTube */

.social-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;

  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;

  transition: all 0.25s ease;

  &:hover {
    color: white;
    transform: translateY(-1px);
  }
}

.social-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
}

.social-text {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1;
}

.divider {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);

  @media (max-width: 900px) {
    display: none;
  }
}

.user-links {
  display: flex;
  align-items: center;
  gap: 1.03rem;
  flex-wrap: wrap;
}

.user-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.85);
  transition: $transition-fast;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-weight: 500;
  white-space: nowrap;

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
}

/* =================================
   MAIN HEADER (logo row + nav row)
   ================================= */

.header-wrapper {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.main-header {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  transition: $transition-smooth;
  display: flex;
  flex-direction: column;

  &.scrolled {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);

    .logo-icon img {
      height: 58px;
    }
  }
}

/* Logo row */

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: clamp(6px, 1vw, 10px) 0;
  gap: clamp(1rem, 2vw, 2rem);
  min-width: 0;
}

/* =================================
   LOGO
   ================================= */

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;

  width: 100%;
  min-width: 0;

  transition: $transition-smooth;
  text-decoration: none;
  text-align: center;

  &:hover {
    opacity: 0.95;
  }

  .logo-icon img {
    height: 88px;
    width: auto;
    transition: $transition-smooth;

    @media (max-width: 768px) {
      height: 58px;
    }
  }

  .logo-text {
    display: block;
    width: 100%;

    .logo-subtitle {
      font-size: 1.1rem;
      color: #1e3a8a;
      font-weight: 800;
      max-width: min(100%, 500px);
      line-height: 1.5rem;
      letter-spacing: 0.042rem;

      text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);

      margin-inline: auto;

      @media (max-width: 768px) {
        font-size: 0.98rem;
        max-width: 90%;
      }
    }
  }
}

/* =================================
   NAV BAR ROW (abaixo da logo)
   ================================= */

.desktop-nav {
  background: $nav-bg;
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: clamp(0.2rem, 0.6vw, 0.5rem);

    padding-inline: clamp(1rem, 2vw, 2rem);
  }

  .nav-link {
    color: rgba(255, 255, 255, 0.82);
    text-decoration: none;

    padding:
      clamp(8px, 1vw, 14px)
      clamp(12px, 1.5vw, 22px);

    font-size: clamp(0.82rem, 0.95vw, 1rem);

    display: block;

    letter-spacing: 0.1em;
    border-bottom: 4px solid transparent;
    transition: $transition-fast;
    white-space: nowrap;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.08);
      border-bottom-color: rgba(255, 255, 255, 0.4);
    }

    &.router-link-active,
    &.router-link-exact-active {
      color: #fff;
      border-bottom-color: $nav-active-border;
      background: rgba(255, 255, 255, 0.1);
    }
  }
}

/* =================================
   USER SECTION (desktop)
   ================================= */

.user-section {
  display: none;
  flex-shrink: 0;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}

.user-menu-container {
  position: relative;
}

.user-menu-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  padding: 0.5rem 1rem;

  border-radius: 12px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid #e2e8f0;

  cursor: pointer;
  transition: $transition-smooth;

  &:hover {
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }

  .user-avatar {
    width: 38px;
    height: 38px;

    background: $primary-gradient;
    border-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
    flex-shrink: 0;

    span {
      color: white;
      font-size: 0.9375rem;
      font-weight: 700;
    }
  }

  .user-info {
    text-align: left;
    min-width: 0;

    .user-name {
      font-size: 0.9375rem;
      font-weight: 600;
      color: #0f172a;
      line-height: 1.3;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-role {
      font-size: 0.75rem;
      color: #64748b;
      font-weight: 500;
    }
  }

  .dropdown-arrow {
    font-size: 0.625rem;
    color: #94a3b8;
    transition: transform 0.3s ease;

    &.open {
      transform: rotate(180deg);
    }
  }
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 0.75rem);

  width: min(280px, calc(100vw - 2rem));

  background: white;
  border-radius: 16px;

  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);

  border: 1px solid #e2e8f0;
  overflow: hidden;

  .dropdown-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    padding: 1.25rem;

    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);

    .dropdown-user-avatar {
      width: 48px;
      height: 48px;

      background: $primary-gradient;
      border-radius: 12px;

      display: flex;
      align-items: center;
      justify-content: center;

      flex-shrink: 0;

      span {
        color: white;
        font-size: 1.125rem;
        font-weight: 700;
      }
    }

    .dropdown-user-info {
      flex: 1;
      min-width: 0;

      .dropdown-user-name {
        font-size: 0.9375rem;
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 2px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .dropdown-user-email {
        font-size: 0.8125rem;
        color: #64748b;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .dropdown-divider {
    height: 1px;
    background: #e2e8f0;
  }

  .dropdown-content {
    padding: 0.5rem;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    width: 100%;
    text-align: left;

    padding: 0.875rem 1rem;

    font-size: 0.9375rem;
    font-weight: 500;

    color: #475569;

    background: none;
    border: none;

    border-radius: 10px;

    cursor: pointer;
    transition: $transition-fast;

    .item-icon {
      font-size: 1.125rem;
      flex-shrink: 0;
    }

    &:hover {
      background: rgba(37, 99, 235, 0.05);
      color: $primary-blue;
    }

    &.logout {
      color: #dc2626;

      &:hover {
        background: rgba(220, 38, 38, 0.05);
      }
    }
  }
}

/* =================================
   MOBILE MENU BUTTON
   ================================= */

.mobile-menu-button {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  background: none;
  border: none;

  border-radius: 12px;

  cursor: pointer;
  transition: $transition-smooth;

  flex-shrink: 0;

  @media (min-width: 1024px) {
    display: none;
  }

  &:hover {
    background: rgba(37, 99, 235, 0.05);
  }

  &.active {
    .line:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }

    .line:nth-child(2) {
      opacity: 0;
      transform: translateX(-10px);
    }

    .line:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 24px;

    .line {
      width: 100%;
      height: 3px;
      background: $primary-blue;
      border-radius: 2px;
      transition: $transition-smooth;
    }
  }
}

/* =================================
   MOBILE MENU
   ================================= */

.mobile-menu {
  background: white;
  border-top: 1px solid #e2e8f0;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  max-height: calc(100vh - 70px);
  overflow-y: auto;

  @media (min-width: 1024px) {
    display: none;
  }

  .container {
    padding-block: 1.5rem;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .mobile-nav-link {
    display: flex;
    align-items: center;
    gap: 1rem;

    width: 100%;
    text-align: left;

    padding: 1rem 1.25rem;

    color: #475569;
    font-weight: 600;

    background: none;
    border: none;

    border-radius: 12px;

    transition: $transition-fast;
    font-size: 1rem;

    .nav-icon {
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    &:hover {
      color: $primary-blue;
      background: rgba(37, 99, 235, 0.05);
      transform: translateX(4px);
    }

    &.router-link-active {
      color: $primary-blue;
      background: rgba(37, 99, 235, 0.08);
      font-weight: 700;
    }
  }

  .mobile-nav-divider {
    height: 1px;
    background: #e2e8f0;
    margin: 0.75rem 0;
  }
}

/* =================================
   TRANSITIONS
   ================================= */

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* =================================
   SCROLLBAR
   ================================= */

.mobile-menu::-webkit-scrollbar {
  width: 8px;
}

.mobile-menu::-webkit-scrollbar-track {
  background: #f8fafc;
}

.mobile-menu::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;

  &:hover {
    background: #94a3b8;
  }
}
</style>
```

---

```vue
<style scoped lang="scss">
/* =================================
   GLOBAL CONTAINER
   ================================= */

.container {
  width: min(100% - 2rem, 1100px);
  margin-inline: auto;
}

/* =================================
   HERO
   ================================= */

.hero {
  position: relative;
  min-height: min(100svh, 700px);

  display: flex;
  align-items: center;
  justify-content: center;

  padding-block: clamp(4rem, 8vw, 8rem);
  padding-inline: 1rem;

  overflow: hidden;
  text-align: center;

  &::before {
    content: '';

    position: absolute;
    inset: 0;

    background: url('../assets/images/backgrounds/imagem.png') center/cover no-repeat;

    z-index: 1;
  }

  &::after {
    content: '';

    position: absolute;
    inset: 0;

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

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
  }

  .hero-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 900;

    color: white;

    margin-bottom: 1.5rem;

    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

    line-height: 1.2;
    letter-spacing: -0.02em;

    max-width: 14ch;
  }

  .hero-subtitle {
    font-size: clamp(1.125rem, 2vw, 1.5rem);

    margin-bottom: 1rem;

    font-weight: 600;

    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

    max-width: 50ch;
  }

  .hero-description {
    font-size: clamp(1rem, 1.5vw, 1.125rem);

    margin-bottom: 2.5rem;

    line-height: 1.7;

    opacity: 0.95;

    max-width: min(100%, 650px);

    margin-inline: auto;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    justify-content: center;
    align-items: center;

    width: 100%;

    .btn {
      min-width: 200px;

      padding: 1rem 2rem;

      font-weight: 600;
      font-size: 1.0625rem;

      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

      transition:
        transform 0.25s ease,
        box-shadow 0.25s ease;

      &:hover {
        transform: translateY(-2px);

        box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
      }

      @media (max-width: 540px) {
        width: 100%;
        min-width: unset;
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

  .hero-decoration {
    position: absolute;
    z-index: 2;
    opacity: 0.1;

    &.circle-1 {
      width: clamp(220px, 30vw, 400px);
      aspect-ratio: 1;

      border: 2px solid white;
      border-radius: 50%;

      top: -200px;
      right: -100px;
    }

    &.circle-2 {
      width: clamp(180px, 24vw, 300px);
      aspect-ratio: 1;

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

/* =================================
   MISSION
   ================================= */

.mission {
  background: #f9fafb;
  padding-block: clamp(3rem, 6vw, 5rem);

  .mission-content {
    background: white;

    border-radius: 1.5rem;

    padding:
      clamp(2rem, 4vw, 3.5rem)
      clamp(1.5rem, 4vw, 3rem);

    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.1);

    border: 1px solid rgba(148, 163, 184, 0.3);
  }

  .section-title {
    font-size: clamp(1.8rem, 3vw, 2.05rem);

    font-weight: 800;

    color: #0f172a;

    margin-bottom: 1rem;
  }

  .mission-text {
    font-size: clamp(1rem, 1.5vw, 1.255rem);

    color: #4b5563;

    line-height: 1.8;
  }
}

/* =================================
   FEATURED NEWS
   ================================= */

.featured-news {
  background: #f9fafb;

  padding:
    clamp(3rem, 6vw, 4rem)
    0;

  .news-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 1rem;
    flex-wrap: wrap;

    margin-bottom: 2rem;
  }

  .section-title {
    font-size: clamp(1.6rem, 3vw, 1.8rem);

    font-weight: 800;
    color: #0f172a;
  }

  .news-grid {
    display: grid;

    grid-template-columns: repeat(
      auto-fit,
      minmax(min(100%, 320px), 1fr)
    );

    gap: clamp(1rem, 2vw, 1.5rem);
  }

  .news-card {
    background: white;

    border-radius: 1.25rem;

    overflow: hidden;

    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.1);

    border: 1px solid rgba(148, 163, 184, 0.3);

    display: flex;
    flex-direction: column;

    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease,
      border-color 0.25s ease;

    min-width: 0;

    &:hover {
      transform: translateY(-6px);

      box-shadow: 0 18px 40px rgba(15, 23, 42, 0.2);

      border-color: rgba(37, 99, 235, 0.35);
    }
  }

  .news-image {
    height: 180px;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .news-content {
    padding: 1.5rem 1.5rem 1.25rem;

    display: flex;
    flex-direction: column;

    gap: 0.75rem;

    height: 100%;
  }

  .news-meta {
    display: flex;
    flex-wrap: wrap;

    gap: 0.35rem;

    font-size: 0.85rem;

    color: #64748b;
  }

  .news-title {
    font-size: 1.1rem;

    font-weight: 700;

    color: #111827;

    line-height: 1.4;

    overflow-wrap: break-word;
  }

  .news-excerpt {
    font-size: 1rem;

    color: #475569;

    line-height: 1.6;

    display: -webkit-box;

    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    overflow: hidden;
  }

  .btn.btn-sm {
    margin-top: auto;

    padding: 0.55rem 0.9rem;

    font-size: 0.85rem;

    align-self: flex-start;
  }

  .loading-container {
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    padding: 2rem 0;

    color: #4b5563;

    gap: 0.75rem;
  }

  .loading-spinner {
    width: 32px;
    height: 32px;

    border-radius: 999px;

    border: 3px solid rgba(37, 99, 235, 0.3);
    border-top-color: #2563eb;

    animation: spin 1s linear infinite;
  }
}

/* =================================
   QUICK ACCESS
   ================================= */

.quick-access {
  padding:
    clamp(3rem, 6vw, 4rem)
    0;

  background: #1565c0;

  color: rgba(255, 255, 255, 0.82);

  .section-title {
    font-size: clamp(1.6rem, 3vw, 1.75rem);

    font-weight: 800;

    margin-bottom: 2rem;

    color: white;

    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  }

  .quick-access-grid {
    display: grid;

    grid-template-columns: repeat(
      auto-fit,
      minmax(min(100%, 260px), 1fr)
    );

    gap: clamp(1rem, 2vw, 1.25rem);
  }

  .quick-card {
    display: flex;
    flex-direction: column;

    gap: 0.75rem;

    padding: 1.7rem 1.5rem;

    border-radius: 1.2rem;

    background: rgba(255, 255, 255, 0.1);

    backdrop-filter: blur(20px);

    border: 1px solid rgba(255, 255, 255, 0.15);

    color: white;

    text-decoration: none;

    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease,
      background 0.25s ease,
      border-color 0.25s ease;

    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);

    min-width: 0;

    &:hover {
      transform: translateY(-4px);

      box-shadow: 0 16px 30px rgba(15, 23, 42, 0.7);

      border-color: rgba(59, 130, 246, 0.8);

      background: radial-gradient(
        circle at top left,
        rgba(59, 130, 246, 0.4),
        rgba(15, 23, 42, 0.95)
      );
    }
  }

  .quick-icon {
    font-size: 1.6rem;
    margin-bottom: 0.25rem;
  }

  .quick-title {
    color: rgba(255, 255, 255, 0.96);

    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.22);

    font-size: 1.1rem;
    font-weight: 700;
  }

  .quick-text {
    font-size: 0.95rem;

    color: rgba(255, 255, 255, 0.82);

    line-height: 1.6;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <div class="header-wrapper">
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="container top-bar-content">
        <div class="contact-info">
          <!-- Email -->
          <a href="mailto:latece@ufrn.br" class="info-link">
            <span class="icon">📧</span>
            <span>latece@ufrn.br</span>
          </a>

          <!-- Telefone -->
          <a href="tel:+558432150000" class="info-link">
            <span class="icon">📞</span>
            <span>(84) 3215-0000</span>
          </a>
          <!-- Instagram -->
          <a
            href="https://www.instagram.com/latece_ufrn/"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            aria-label="Instagram do LATECE"
          >
            <img
              src="@/assets/instagram_icon.png"
              alt="Instagram"
              class="social-icon"
            />

            <span class="social-text">latece_ufrn</span>
          </a>

          <!-- YouTube -->
          <a
            href="https://www.youtube.com/channel/UCie5HHDcac4k2-7DaKWEuTQ"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            aria-label="YouTube do LATECE"
          >
            <img
              src="@/assets/youtube_icon.png"
              alt="YouTube"
              class="social-icon"
            />

            <span class="social-text">LATECE CE</span>
          </a>
        </div>

        <div class="top-bar-right">
          <div class="divider"></div>
          <div class="user-links">
            <template v-if="authStore.isAuthenticated">
              <NuxtLink to="/admin" class="user-link">
                <span class="icon"></span>
                <span>Administração</span>
              </NuxtLink>
            </template>
            <template v-else>
              <NuxtLink to="/login" class="user-link">
                <span class="icon"></span>
                <span>Login</span>
              </NuxtLink>
            </template>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Header: Logo Row -->
    <header class="main-header" :class="{ scrolled: isScrolled }">
      <div class="container">
        <div class="header-content">
          <!-- Logo -->
          <NuxtLink class="logo" to="/">
            <div class="logo-icon">
              <img src="../assets/logo.png" alt="logo latece" />
            </div>
            <div class="logo-text">
              <div class="logo-subtitle">
                Laboratório de Tecnologia Assistiva do Centro de Educação
              </div>
            </div>
          </NuxtLink>

          <!-- User Section (Desktop) -->
          <div class="user-section">
            <template v-if="authStore.isAuthenticated">
              <div class="user-menu-container">
                <button
                  class="user-menu-button"
                  @click="showUserMenu = !showUserMenu"
                  :aria-expanded="showUserMenu"
                  aria-haspopup="true"
                >
                  <div class="user-avatar">
                    <span>{{ authStore.userInitials }}</span>
                  </div>
                  <div class="user-info">
                    <div class="user-name">{{ authStore.user?.fullName }}</div>
                    <div class="user-role">Administrador</div>
                  </div>
                  <span class="dropdown-arrow" :class="{ open: showUserMenu }"
                    >▼</span
                  >
                </button>

                <Transition name="dropdown">
                  <div
                    class="dropdown-menu"
                    v-show="showUserMenu"
                    @click.away="showUserMenu = false"
                  >
                    <div class="dropdown-header">
                      <div class="dropdown-user-avatar">
                        <span>{{ authStore.userInitials }}</span>
                      </div>
                      <div class="dropdown-user-info">
                        <div class="dropdown-user-name">
                          {{ authStore.user?.fullName }}
                        </div>
                        <div class="dropdown-user-email">
                          {{ authStore.user?.email }}
                        </div>
                      </div>
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-content">
                      <NuxtLink class="dropdown-item" to="/admin">
                        <span class="item-icon">⚙️</span>
                        <span>{{ $t("nav.admin") }}</span>
                      </NuxtLink>
                      <NuxtLink class="dropdown-item" to="/profile">
                        <span class="item-icon">👤</span>
                        <span>Meu Perfil</span>
                      </NuxtLink>
                      <button
                        class="dropdown-item logout"
                        @click="handleLogout"
                      >
                        <span class="item-icon">🚪</span>
                        <span>{{ $t("nav.logout") }}</span>
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>
            </template>
          </div>

          <!-- Mobile Menu Button -->
          <button
            class="mobile-menu-button"
            @click="showMobileMenu = !showMobileMenu"
            :class="{ active: showMobileMenu }"
            :aria-expanded="showMobileMenu"
            aria-label="Menu"
          >
            <span class="hamburger">
              <span class="line"></span>
              <span class="line"></span>
              <span class="line"></span>
            </span>
          </button>
        </div>
      </div>

      <!-- Nav Bar Row (below logo) -->
      <nav class="desktop-nav" aria-label="Navegação principal">
        <div class="container nav-inner">
          <NuxtLink class="nav-link" to="/">{{ $t("nav.home") }}</NuxtLink>
          <NuxtLink class="nav-link" to="/about">{{
            $t("nav.about")
          }}</NuxtLink>
          <NuxtLink class="nav-link" to="/team">{{ $t("nav.team") }}</NuxtLink>
          <NuxtLink class="nav-link" to="/equipment">{{
            $t("nav.equipment")
          }}</NuxtLink>
          <NuxtLink class="nav-link" to="/publications">{{
            $t("nav.publications")
          }}</NuxtLink>
          <NuxtLink class="nav-link" to="/news">{{ $t("nav.news") }}</NuxtLink>
        </div>
      </nav>
    </header>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <div class="mobile-menu" v-show="showMobileMenu">
        <div class="container">
          <nav class="mobile-nav">
            <NuxtLink
              class="mobile-nav-link"
              to="/"
              @click="showMobileMenu = false"
            >
              <span class="nav-icon">🏠</span>
              <span>{{ $t("nav.home") }}</span>
            </NuxtLink>
            <NuxtLink
              class="mobile-nav-link"
              to="/about"
              @click="showMobileMenu = false"
            >
              <span class="nav-icon">ℹ️</span>
              <span>{{ $t("nav.about") }}</span>
            </NuxtLink>
            <NuxtLink
              class="mobile-nav-link"
              to="/team"
              @click="showMobileMenu = false"
            >
              <span class="nav-icon">👥</span>
              <span>{{ $t("nav.team") }}</span>
            </NuxtLink>
            <NuxtLink
              class="mobile-nav-link"
              to="/equipment"
              @click="showMobileMenu = false"
            >
              <span class="nav-icon">🔧</span>
              <span>{{ $t("nav.equipment") }}</span>
            </NuxtLink>
            <NuxtLink
              class="mobile-nav-link"
              to="/publications"
              @click="showMobileMenu = false"
            >
              <span class="nav-icon">📚</span>
              <span>{{ $t("nav.publications") }}</span>
            </NuxtLink>
            <NuxtLink
              class="mobile-nav-link"
              to="/news"
              @click="showMobileMenu = false"
            >
              <span class="nav-icon">📰</span>
              <span>{{ $t("nav.news") }}</span>
            </NuxtLink>

            <div class="mobile-nav-divider"></div>

            <template v-if="authStore.isAuthenticated">
              <NuxtLink
                class="mobile-nav-link"
                to="/admin"
                @click="showMobileMenu = false"
              >
                <span class="nav-icon">⚙️</span>
                <span>{{ $t("nav.admin") }}</span>
              </NuxtLink>
              <button class="mobile-nav-link" @click="handleLogout">
                <span class="nav-icon">🚪</span>
                <span>{{ $t("nav.logout") }}</span>
              </button>
            </template>
            <template v-else>
              <NuxtLink
                class="mobile-nav-link"
                to="/login"
                @click="showMobileMenu = false"
              >
                <span class="nav-icon">🔐</span>
                <span>{{ $t("nav.login") }}</span>
              </NuxtLink>
            </template>
          </nav>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const showUserMenu = ref(false);
const showMobileMenu = ref(false);
const isScrolled = ref(false);

const handleLogout = async () => {
  await authStore.logout();
  showUserMenu.value = false;
  showMobileMenu.value = false;
};

watch(
  () => useRoute().path,
  () => {
    showMobileMenu.value = false;
  },
);

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 10;
  };
  window.addEventListener("scroll", handleScroll);
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
});
</script>

<style scoped lang="scss">
$primary-blue: #005a9c;
$nav-bg: #1565c0;
$nav-active-border: #64b5f6;
$primary-gradient: linear-gradient(135deg, #005a9c 0%, #4d9de0 100%);
$transition-fast: all 0.2s ease-in-out;
$transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* =================================
   TOP BAR
   ================================= */
.top-bar {
  background: linear-gradient(135deg, #487fff 0%, #003791 100%);
  color: white;
  padding: 0.625rem 0;
  font-size: 0.8125rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    display: none;
  }
}

.top-bar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 9.5rem;
}

.contact-info {
  display: flex;
  align-items: center;
  gap: 1.1rem;
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
}

.social-text {
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1;
}

.divider {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
}

.user-links {
  display: flex;
  align-items: center;
  gap: 1rem;
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
  padding: 14px 0;
  gap: 2rem;
}

/* =================================
   LOGO
   ================================= */
.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  width: 100%;

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
      height: 72px;
    }
  }

  .logo-text {
    display: block;

    .logo-subtitle {
      font-size: 1.1rem;
      color: #1e3a8a;
      font-weight: 800;
      max-width: 760px;
      line-height: 2.5;
      letter-spacing: 0.02em;

      text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);

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
    gap: 0;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .nav-link {
    color: rgba(255, 255, 255, 0.82);
    text-decoration: none;
    font-size: 1.08rem;
    font-weight: 600;
    padding: 18px 28px;
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

    span {
      color: white;
      font-size: 0.9375rem;
      font-weight: 700;
    }
  }

  .user-info {
    text-align: left;

    .user-name {
      font-size: 0.9375rem;
      font-weight: 600;
      color: #0f172a;
      line-height: 1.3;
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
  width: 280px;
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
    padding: 1.5rem;
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

<template lang="pug">
  footer.site-footer
    .container
      .footer-grid
        //- Logo and description
        .footer-section
          .footer-logos
            img(src="/images/logo01.png" alt="Logo LATECE" height="40" style="object-fit: contain;")
            img(src="/images/logo-ufrn.png" alt="Logo UFRN" height="70" style="object-fit: contain;")
          p.description Laboratório de Tecnologia Assistiva do Centro de Educação
          p.tagline Promovendo inclusão e acessibilidade através da tecnologia

        //- Quick Links
        .footer-section
          h3.footer-title Links Rápidos
          ul.footer-list
            li: NuxtLink.footer-link(to="/about") {{ $t('nav.about') }}
            li: NuxtLink.footer-link(to="/team") {{ $t('nav.team') }}
            li: NuxtLink.footer-link(to="/equipment") {{ $t('nav.equipment') }}
            li: NuxtLink.footer-link(to="/publications") {{ $t('nav.publications') }}
            li: NuxtLink.footer-link(to="/news") {{ $t('nav.news') }}

        //- Resources
        .footer-section
          h3.footer-title Recursos
          ul.footer-list
            li: a.footer-link(href="#", target="_blank", rel="noopener") Documentação
            li: a.footer-link(href="#", target="_blank", rel="noopener") Tutoriais
            li: a.footer-link(href="#", target="_blank", rel="noopener") API
            li: a.footer-link(href="#", target="_blank", rel="noopener") Suporte

        //- Contact
        .footer-section
          h3.footer-title Contato
          .contact-info
            .contact-item
              span UFRN - Campus Central
            .contact-item
              span (84) 3215-0000
            .contact-item
              span latece@ufrn.edu.br
            .contact-item.social-icons-item
              a.instagram-link(
                href="https://www.instagram.com/latece_ufrn/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram do LATECE"
              )
                svg(width="22" height="22" fill="currentColor" viewBox="0 0 24 24")
                  path(d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z")
              a.youtube-link(
                href="https://www.youtube.com/channel/UCie5HHDcac4k2-7DaKWEuTQ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube do LATECE"
              )
                svg(width="22" height="22" fill="currentColor" viewBox="0 0 24 24")
                  path(d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z")

      //- Bottom bar
      .footer-bottom
        p.copyright © {{ new Date().getFullYear() }} LATECE - UFRN. Todos os direitos reservados.
        nav.footer-bottom-links
          a.footer-link(href="#", target="_blank", rel="noopener") Política de Privacidade
          a.footer-link(href="#", target="_blank", rel="noopener") Termos de Uso
          a.footer-link(href="#", target="_blank", rel="noopener") Acessibilidade
</template>

<style scoped lang="scss">
//================================
// Variables
//================================
$primary-blue: #005A9C;
$light-blue: #4D9DE0;
$white: #ffffff;
$gray-200: #e5e7eb; // For primary text on dark background
$gray-300: #d1d5db; // For secondary text on dark background
$gray-600: #4b5563; // For the border on dark background
$radius-lg: 0.5rem;

//================================
// Main Footer Layout
//================================
.site-footer {
  background-color: $primary-blue;
  color: $white;
  padding: 3rem 0;
}

.container {
  width: 100%;
  max-width: 1280px; // Standard container max-width
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-logos {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.footer-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
}

// Responsive grid layout
@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

//================================
// Footer Sections
//================================
.footer-section {
  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .logo-icon {
    width: 2.5rem;
    height: 2.5rem;
    background-color: $white;
    border-radius: $radius-lg;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      color: $primary-blue;
      font-weight: 700;
      font-size: 1.125rem;
    }
  }

  .logo-text {
    font-size: 1.25rem;
    font-weight: 700;
  }

  .description {
    color: $gray-200;
    margin-bottom: 1rem;
  }

  .tagline {
    font-size: 0.875rem;
    color: $gray-300;
  }
}

//================================
// Titles, Lists, and Links
//================================
.footer-title {
  font-size: 1.125rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px;
    height: 2px;
    background-color: $light-blue;
    border-radius: 1px;
  }
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: $gray-300;
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: $white;
    text-decoration: underline;
  }
}

//================================
// Contact Section
//================================
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: $gray-200;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.contact-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  margin-top: 2px; // Fine-tune vertical alignment
}

//================================
// Footer Bottom Bar
//================================
.footer-bottom {
  border-top: 1px solid $gray-600;
  margin-top: 2rem;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.copyright {
  font-size: 0.875rem;
  color: $gray-300;
  text-align: center;
}

.footer-bottom-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap; // Allows links to wrap on small screens
  justify-content: center;

  .footer-link {
    font-size: 0.875rem;
  }
}

.social-icons-item {
  justify-content: flex-start;
  margin-left: -2px;
}

.youtube-link {
  color: $gray-200;
  transition: color 0.2s ease-in-out, transform 0.2s;
  display: inline-flex;

  &:hover {
    color: $white;
    transform: scale(1.15);
  }
}

.instagram-link {
  color: $gray-200;
  transition: color 0.2s ease-in-out, transform 0.2s;
  display: inline-flex;

  &:hover {
    color: $white;
    transform: scale(1.15);
  }
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    gap: 0;
  }
  .copyright {
    text-align: left; 
  }
}
</style>
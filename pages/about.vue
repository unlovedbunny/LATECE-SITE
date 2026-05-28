<template lang="pug">
.about-page
  // Hero Section
  section.hero
    .container.hero__container
      h1.hero-title {{ $t('about.title') }}
      p.hero-subtitle {{ $t('about.subtitle') }}

  // Quem Somos Section
  section.about-intro
    .container
      .about-intro__grid

        // Texto lateral esquerda
        .about-intro__content
          h2.about-intro__title Quem Somos

          .about-intro__text
            p
              | O Laboratório de Tecnologia Assistiva do Centro de Educação (LATECE), vinculado ao Laboratório Interdisciplinar de Formação de Educadores (LIFE) da Universidade Federal do Rio Grande do Norte, é um espaço de ensino, pesquisa e extensão dedicado à Tecnologia Assistiva.

            p
              | A Tecnologia Assistiva compreende recursos, estratégias, serviços e práticas voltados à promoção da acessibilidade, autonomia e participação de pessoas com deficiência e com necessidades educacionais específicas (BRASIL, 2015). O laboratório atua em diferentes áreas da Tecnologia Assistiva, como Comunicação Alternativa, acessibilidade ao computador, adequação postural, mobilidade, acessibilidade sensorial e produção de materiais pedagógicos acessíveis.

            p
              | Fundado em 2017, o LATECE desenvolve pesquisas, ações formativas e projetos voltados à acessibilidade e à inclusão. O laboratório mantém parcerias com escolas, serviços especializados, setores da universidade e instituições de ensino superior, como a Universidade do Estado do Rio Grande do Norte (UERN), a Universidade do Estado do Rio de Janeiro (UERJ) e a Universidade Federal Rural do Rio de Janeiro (UFRRJ). Parte das ações e recursos do laboratório é viabilizada por meio de editais de pesquisa e inovação financiados pelo Conselho Nacional de Desenvolvimento Científico e Tecnológico (CNPq) e pela Financiadora de Estudos e Projetos (FINEP).

        // Lateral direita
        .about-intro__side
          .about-image-wrapper
            img.about-image(
              src="@/assets/images/illustrations/testinho.png"
              alt="Equipe do LATECE"
            )

          NuxtLink.team-button(to="/team")
            span.team-button__icon →
            span Nossa Equipe

  // Mission and Vision Section
  section.mission-vision
    .container
      .mission-vision__content
        .mission-vision__grid
          .mission-card.card
            .icon
            h2.card-title {{ $t('about.mission') }}
            p.card-text {{ $t('about.missionText') }}

          .vision-card.card
            .icon.icon--vision
            h2.card-title {{ $t('about.vision') }}
            p.card-text {{ $t('about.visionText') }}

  // Objectives Section
  section.objectives
    .container
      .objectives__content
        h2.section-title {{ $t('about.objectives') }}

        .objectives__grid
          .objective-item.card
            .objective-icon.objective-icon--teaching
            h3.objective-title {{ $t('about.teaching') }}
            p.objective-text {{ $t('about.teachingText') }}

          .objective-item.card
            .objective-icon.objective-icon--training
            h3.objective-title {{ $t('about.training') }}
            p.objective-text {{ $t('about.trainingText') }}

          .objective-item.card
            .objective-icon.objective-icon--assistive
            h3.objective-title {{ $t('about.assistive') }}
            p.objective-text {{ $t('about.assistiveText') }}

          .objective-item.card
            .objective-icon.objective-icon--materials
            h3.objective-title {{ $t('about.materials') }}
            p.objective-text {{ $t('about.materialsText') }}

          .objective-item.card
            .objective-icon.objective-icon--communication
            h3.objective-title {{ $t('about.communication') }}
            p.objective-text {{ $t('about.communicationText') }}

          .objective-item.card
            .objective-icon.objective-icon--partnerships
            h3.objective-title {{ $t('about.partnerships') }}
            p.objective-text {{ $t('about.partnershipsText') }}

  // Justification Section
  section.justification
    .container
      .justification__content
        h2.section-title {{ $t('about.justification') }}

        .justification-prose
          p {{ $t('about.justificationText1') }}
          p {{ $t('about.justificationText2') }}
          p {{ $t('about.justificationText3') }}

          .highlight-box
            p.highlight-box__title {{ $t('about.highlight') }}
            p {{ $t('about.highlightText') }}

  // CTA Section
  section.cta
    .container.cta__container
      h2.cta-title {{ $t('about.cta') }}
      p.cta-text {{ $t('about.ctaText') }}

      .cta-actions
        NuxtLink.btn.btn-secondary.btn-lg(to="/team")
          | {{ $t('about.meetTeam') }}

        NuxtLink.btn.btn-outline.btn-lg(to="/equipment")
          | {{ $t('about.exploreEquipment') }}
</template>

<script setup lang="ts">
// Meta tags
useHead({
  title: "Sobre o LATECE - Laboratório de Tecnologia Assistiva",
  meta: [
    {
      name: "description",
      content:
        "Conheça o Laboratório de Tecnologia Assistiva da UFRN, sua missão, visão e objetivos",
    },
  ],
});
</script>

<style scoped lang="scss">

@use "@/assets/scss/variables" as *;

$transition-normal: all 0.3s ease-in-out;

//=================================================================
// Base Container
//=================================================================
.container {
  width: min(94%, 1400px);
  margin-inline: auto;
}

//=================================================================
// Section Base
//=================================================================
section {
  padding-block: clamp(3rem, 6vw, 5rem);
}

.section-title {
  position: relative;
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  font-weight: 700;
  color: $primary-blue;
  margin-bottom: 3rem;
  text-align: center;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: $primary-gradient;
    border-radius: 2px;
  }
}

//=================================================================
// Card Base
//=================================================================
.card {
  padding: clamp(1.5rem, 3vw, 2rem);
  transition: $transition-normal;

  &:hover {
    transform: translateY(-4px);
  }
}

//=================================================================
// Hero Section
//=================================================================
.hero {
  padding-block: clamp(2.2rem, 4vw, 3rem);
  background: $primary-gradient;
  color: $white;

  &__container {
    text-align: center;
  }

  .hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    color: white;
    margin-bottom: 1.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .hero-subtitle {
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    margin-bottom: 2.5rem;
  }
}

//=================================================================
// Quem Somos Section
//=================================================================
.about-intro {
  background: white;

  &__grid {
    display: grid;
    grid-template-columns: minmax(0, 1.5fr) minmax(280px, 420px);

    gap: clamp(2rem, 5vw, 5rem);

    align-items: start;

    @media (max-width: 980px) {
      grid-template-columns: 1fr;
    }
  }

  &__title {
    font-size: clamp(2rem, 3vw, 2.6rem);
    font-weight: 800;
    color: $primary-blue;
    margin-bottom: 2rem;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    p {
      font-size: clamp(1rem, 1.3vw, 1.12rem);
      line-height: 1.9;
      color: #475569;
      text-align: justify;
    }
  }

  &__side {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 1.5rem;
  }
}

.about-image-wrapper {
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;

  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.15);
}

.about-image {
  width: 100%;
  height: auto;
  display: block;
}

.team-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;

  width: 100%;
  max-width: 230px;

  padding: 1rem 1.4rem;

  border-radius: 0.8rem;

  background: linear-gradient(
    135deg,
    #0f76bc 0%,
    #1693de 100%
  );

  color: white;
  text-decoration: none;

  font-size: 1rem;
  font-weight: 700;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;

  box-shadow: 0 10px 25px rgba(15, 118, 188, 0.25);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 35px rgba(15, 118, 188, 0.35);
  }

  &__icon {
    width: 28px;
    height: 28px;

    border-radius: 999px;

    background: rgba(255,255,255,0.18);

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1rem;
    font-weight: 800;

    transition: transform 0.25s ease;
  }

  &:hover &__icon {
    transform: translateX(4px);
  }
}

//=================================================================
// Mission & Vision Section
//=================================================================
.mission-vision {
  background-color: $white;

  &__content {
    max-width: 72rem;
    margin-inline: auto;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: clamp(1.5rem, 3vw, 3rem);
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: $primary-blue;
    margin-bottom: 1rem;
  }

  .card-text {
    color: #0f172a;
    line-height: 1.8;
  }

  .icon {
    width: 4rem;
    height: 4rem;
    background-color: $primary-blue;
    border-radius: 9999px;
    margin-bottom: 1.5rem;

    &--vision {
      background-color: $light-blue;
    }
  }
}

//=================================================================
// Objectives Section
//=================================================================
.objectives {

  &__content {
    max-width: 1200px;
    margin-inline: auto;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }

  .objective-item {
    padding: 1.5rem;
  }

  .objective-icon {
    width: 3rem;
    height: 3rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;

    &--teaching {
      background-color: $olive-green;
    }

    &--training {
      background-color: $mustard;
    }

    &--assistive {
      background-color: $terracotta;
    }

    &--materials {
      background-color: $dark-aqua;
    }

    &--communication {
      background-color: #7e57c2;
    }

    &--partnerships {
      background-color: #ef6c00;
    }
  }

  .objective-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: $primary-blue;
    margin-bottom: 0.75rem;
  }

  .objective-text {
    color: #0f172a;
    line-height: 1.7;
  }
}

//=================================================================
// Justification Section
//=================================================================
.justification {
  background-color: $white;

  &__content {
    max-width: 1000px;
    margin-inline: auto;
  }

  &-prose {
    p {
      font-size: 1.05rem;
      line-height: 1.9;
      margin-bottom: 1.5rem;

      &:last-of-type {
        margin-bottom: 2rem;
      }
    }
  }

  .highlight-box {
    background: rgba($light-blue, 0.1);
    border-left: 4px solid $primary-blue;

    padding: 1.5rem;

    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;

    &__title {
      font-size: 1.125rem;
      font-weight: 700;
      color: $primary-blue !important;
      margin-bottom: 0.5rem;
    }
  }
}

//=================================================================
// CTA Section
//=================================================================
.cta {
  background: $secondary-gradient;
  color: $white;

  &__container {
    text-align: center;
  }

  .cta-title {
    font-size: clamp(1.8rem, 3vw, 2.3rem);
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .cta-text {
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    margin-bottom: 2rem;
  }

  .cta-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
}

//=================================================================
// Buttons
//=================================================================
.btn {
  display: inline-block;

  padding: 0.9rem 1.7rem;

  border-radius: 0.75rem;

  font-weight: 600;
  text-decoration: none;

  transition: $transition-normal;

  cursor: pointer;
  border: 2px solid transparent;

  &.btn-lg {
    padding: 1rem 2rem;
    font-size: 1.05rem;
  }

  &.btn-secondary {
    background-color: $white;
    color: $primary-blue;

    &:hover {
      background-color: rgba($white, 0.92);
      transform: translateY(-2px);
    }
  }

  &.btn-outline {
    background-color: transparent;
    border-color: $white;
    color: $white;

    &:hover {
      background-color: $white;
      color: $primary-blue;
      transform: translateY(-2px);
    }
  }
}
</style>
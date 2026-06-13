<template lang="pug">
.equipment-page
  // Hero Section
  section.hero
    .container.hero__container
      .hero-content
        h1.hero-title Equipamentos de Tecnologia Assistiva
        p.hero-subtitle Explore nossos recursos e tecnologias para acessibilidade

  // Filter and Search Section
  section.filters
    .container
      .filter-wrapper
        // Search
        .search-box
          svg.search-icon(width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24")
            path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z")
          input.search-input(
            v-model="searchQuery"
            placeholder="Buscar equipamento..."
          )

        // Category Filter
        select.filter-select(v-model="selectedCategory")
          option(value="") Todas as Categorias
          option(
            v-for="category in categories"
            :key="category.value"
            :value="category.value"
          ) {{ category.label }}

  // Equipment Grid Section
  section.equipment-grid
    .container
      // Empty state
      .empty-state(v-if="filteredEquipment.length === 0")
        .empty-icon 🔍
        h3.empty-title Nenhum equipamento encontrado
        p.empty-subtitle Tente ajustar os filtros de busca

      // Equipment Grid
      .grid-container(v-else)
        .equipment-card(
          v-for="equipment in filteredEquipment"
          :key="equipment.id"
          @click="viewEquipmentDetails(equipment)"
        )
          .equipment-image
            img(
              :src="getImageUrl(equipment.imageUrl)"
              :alt="equipment.name"
              loading="lazy"
            )
          .equipment-content
            h3.equipment-name {{ equipment.name }}
            .equipment-category {{ getCategoryLabel(equipment.category) }}

  // Equipment Details Modal
  .modal(v-if="selectedEquipment" @click.self="closeEquipmentDetails")
    .modal-content
      .modal-header
        h3.modal-title {{ selectedEquipment.name }}
        button.close-button(@click="closeEquipmentDetails") ✕

      .modal-body
        .modal-image
          img(:src="getImageUrl(selectedEquipment.imageUrl)" :alt="selectedEquipment.name")

        .equipment-info
          .info-item
            .info-label 🏷️ Categoria
            .info-value {{ getCategoryLabel(selectedEquipment.category) }}

          .info-item(v-if="selectedEquipment.description")
            .info-label 📝 Descrição
            .info-value {{ selectedEquipment.description }}
</template>

<script setup lang="ts">
// Meta tags
useHead({
  title: 'Equipamentos - Laboratório de Tecnologia Assistiva',
  meta: [
    { name: 'description', content: 'Explore os equipamentos e recursos de Tecnologia Assistiva disponíveis no LATECE' }
  ]
})

// Tipagem do equipamento
interface EquipmentItem {
  id: number
  name: string
  category: string
  imageUrl: string
  description?: string
}

// Categorias disponíveis (baseadas na organização de pastas)
const categories = [
  { value: 'CAA', label: 'Comunicação Aumentativa e Alternativa' },
  { value: 'VidaDiaria', label: 'Auxílio para Vida Diária e Prática' },
  { value: 'AcessibilidadeComputador', label: 'Acessibilidade no Computador' },
  { value: 'BaixaVisao', label: 'Baixa Visão e Tradução Sensorial' },
  { value: 'LivrosJogos', label: 'Livros e Jogos Adaptados' },
]

// Dados estáticos dos equipamentos
// Para adicionar um novo equipamento, basta adicionar um novo objeto ao array abaixo.
// O caminho da imagem é relativo a /assets/images/equipments/
const equipmentData: EquipmentItem[] = [
  
  // Comunicação Aumentativa e Alternativa (CAA)
  {
    id: 1,
    name: 'Prancha de Comunicação (modelo 1)',
    category: 'CAA',
    imageUrl: 'comunicacao/PRANCHA-DE-CAA.jpeg',
    description: 'Prancha com pictogramas para apoio à comunicação alternativa.',
  },
    {
    id: 2,
    name: 'Prancha de Comunicação (modelo 2)',
    category: 'CAA',
    imageUrl: 'comunicacao/PRANCHA-DE-CAA-2.jpeg',
    description: 'Prancha com pictogramas para apoio à comunicação alternativa.',
  },
    {
    id: 3,
    name: 'Prancha de Comunicação (modelo 3)',
    category: 'CAA',
    imageUrl: 'comunicacao/PRANCHA-DE-CAA-3.jpeg',
    description: 'Prancha com pictogramas para apoio à comunicação alternativa.',
  },
  {
    id: 4,
    name: 'Conversia',
    category: 'CAA',
    imageUrl: 'comunicacao/CONVERSIA.jpeg',
    description: 'Dispositivo digital interativo utilizado para apoiar a comunicação por meio de símbolos e interfaces acessíveis.',
  },
  {
    id: 5,
    name: 'Expressia',
    category: 'CAA',
    imageUrl: 'comunicacao/EXPRESSIA.jpeg',
    description: 'Software de comunicação que utiliza pictogramas para auxiliar na expressão de ideias, emoções e necessidades.',
  },
  {
    id: 6,
    name: 'Flip Book de Comunicação',
    category: 'CAA',
    imageUrl: 'comunicacao/FLIP-BOOK.jpeg',
    description: 'Caderno com imagens organizadas que permite a comunicação por meio da seleção visual de símbolos.',
  },
  {
    id: 7,
    name: 'Vocalizador',
    category: 'CAA',
    imageUrl: 'comunicacao/VOCALIZADOR.jpeg',
    description: 'Dispositivo eletrônico que reproduz mensagens gravadas ao pressionar botões, facilitando a comunicação de pessoas com dificuldades na fala.',
  },
  
  
  // Auxílio para Vida Diária e Prática
  
  {
    id: 8,
    name: 'ACIONADORES',
    category: 'VidaDiaria',
    imageUrl: 'vida/ACIONADORES.jpeg',
    description: 'Dispositivo adaptado que permite ao usuário ativar comandos por meio de toques simples, pressão ou outros movimentos, facilitando o acesso a computadores e equipamentos eletrônicos.',
  },
  {
    id: 9,
    name: 'COLIBRI',
    category: 'VidaDiaria',
    imageUrl: 'vida/COLIBRI.jpeg',
    description: 'Dispositivo de acesso alternativo que possibilita a interação com o computador, indicado para pessoas com mobilidade reduzida nos membros.',
  },
  {
    id: 10,
    name: 'ENGROSSADOR DE LÁPIS',
    category: 'VidaDiaria',
    imageUrl: 'vida/ENGROSSADOR-DE-LÁPIS.jpeg',
    description: 'Acessório que aumenta a espessura do lápis ou caneta, proporcionando melhor encaixe na mão e facilitando a escrita para pessoas com dificuldades motoras.',
  },  
  {
    id: 11,
    name: 'Plano Inclinado para Escrita',
    category: 'VidaDiaria',
    imageUrl: 'vida/PLANO-INCLINADO.jpeg',
    description: 'Dispositivo que permite a escrita em posição inclinada, facilitando o acesso para pessoas com dificuldades motoras.',
  },
  
  // Baixa Visão e Tradução Sensorial
  {
    id: 12,
    name: 'Lupa Eletrônica',
    category: 'BaixaVisao',
    imageUrl: 'baixa-visao/LUPA.jpeg',
    description: 'Lupa eletrônica com ampliação digital para apoio a pessoas com baixa visão.',
  },
  {
    id: 13,
    name: 'Lupa Eletrônica',
    category: 'BaixaVisao',
    imageUrl: 'baixa-visao/LUPA-2.jpeg',
    description: 'Lupa de leitura para apoio a pessoas com baixa visão.',
  },
  
  // Livros e Jogos Adaptados
  {
    id: 14,
    name: 'Livro em Braille',
    category: 'LivrosJogos',
    imageUrl: 'livros-jogos/LIVRO-EM-BRAILLE.jpeg',
    description: 'Livro adaptado em escrita Braille.',
  },
  {
    id: 15,
    name: 'Livro em Braille',
    category: 'LivrosJogos',
    imageUrl: 'livros-jogos/LIVRO-EM-BRAILLE-2.jpeg',
    description: 'Livro adaptado em escrita Braille.',
  },
  {
    id: 16,
    name: 'Jogo Adaptado em Braille',
    category: 'LivrosJogos',
    imageUrl: 'livros-jogos/jogo-adaptado-braille.jpeg',
    description: 'Jogo educativo adaptado com peças em Braille.',
  },
  {
    id: 17,
    name: 'Livro Adaptado em CAA',
    category: 'LivrosJogos',
    imageUrl: 'livros-jogos/LIVRO-ADAPTADO-EM-CAA.jpeg',
    description: 'Livro adaptado em comunicação aumentativa e alternativa.',
  },
  {
    id: 18,
    name: 'Livro Adaptado em CAA',
    category: 'LivrosJogos',
    imageUrl: 'livros-jogos/LIVRO-COM-CAA.jpeg',
    description: 'Livro adaptado em comunicação aumentativa e alternativa.',
  },
  {
    id: 19,
    name: 'Jogo de Cartas em Braille',
    category: 'LivrosJogos',
    imageUrl: 'livros-jogos/JOGO-DE-CARTAS-EM-BRAILLE.jpeg',
    description: 'Jogo educativo adaptado com peças em Braille.', 
  },
  // Acessibilidade no Computador
  {
    id: 20,
    name: 'Teclado Adaptado',
    category: 'AcessibilidadeComputador',
    imageUrl: 'acessibilidade-computador/TECLADO++++.jpeg',
    description: 'Teclado adaptado com teclas ampliadas, coloridas e de fácil visualização, que facilita a digitação e a identificação das teclas por pessoas com dificuldades motoras ou cognitivas.',
  },
{
  id: 21,
  name: 'Intellikeys',
  category: 'AcessibilidadeComputador',
  imageUrl: 'acessibilidade-computador/INTELLIKEYS.jpeg',
  description: 'Teclado programável com sobreposições personalizáveis que permite adaptar funções e comandos conforme as necessidades do usuário.',
},
{
  id: 22,
  name: 'Mouse Adaptado',
  category: 'AcessibilidadeComputador',
  imageUrl: 'acessibilidade-computador/MOUSE-ADAPTADO.jpeg',
  description: 'Dispositivo apontador adaptado para facilitar o uso por pessoas com limitações motoras, podendo possuir botões ampliados e formato ergonômico.',
},
{
  id: 23,
  name: 'Teclado Tátil',
  category: 'AcessibilidadeComputador',
  imageUrl: 'acessibilidade-computador/TECLADO-TATIL.jpeg',
  description: 'Teclado com marcações em relevo ou texturas diferenciadas, auxiliando pessoas com deficiência visual na identificação das teclas.',
},
{
  id: 24,
  name: 'TICs',
  category: 'AcessibilidadeComputador',
  imageUrl: 'acessibilidade-computador/TICS.jpeg',
  description: 'Conjunto de tecnologias da informação e comunicação que promovem acessibilidade digital, ampliando a autonomia de pessoas com deficiência no uso do computador.',
},
]

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedEquipment = ref<EquipmentItem | null>(null)

//caminho da imagem dentro de /assets/images/equipments/
const getImageUrl = (path: string) => {
  return `/LATECE-SITE/images/equipments/${path}`
}

// Retorna o nome da categoria
const getCategoryLabel = (categoryValue: string) => {
  const found = categories.find(category => category.value === categoryValue)
  return found ? found.label : categoryValue
}

// Lista filtrada de equipamentos (busca + categoria)
const filteredEquipment = computed(() => {
  let list = equipmentData

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    list = list.filter(item =>
      item.name.toLowerCase().includes(query) ||
      (item.description?.toLowerCase().includes(query) ?? false)
    )
  }

  if (selectedCategory.value) {
    list = list.filter(item => item.category === selectedCategory.value)
  }

  return list
})

const viewEquipmentDetails = (equipment: EquipmentItem) => {
  selectedEquipment.value = equipment
}

const closeEquipmentDetails = () => {
  selectedEquipment.value = null
}
</script>

<style scoped lang="scss">
// Reset e Container
.equipment-page {
  background: #f9fafb;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

// Hero Section
.hero {
  @include hero-background;
  padding: 5rem 1rem;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.3;
  }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: fadeInDown 0.8s ease-out;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.95;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

// Filters Section
.filters {
  background: white;
  padding: 2rem 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 10;
}

.filter-wrapper {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.search-box {
  flex: 1;
  min-width: 250px;
  max-width: 400px;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: $primary-color;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
  }
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: $primary-color;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
  }
}

// Equipment Grid
.equipment-grid {
  padding: 4rem 1rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

.equipment-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeIn 0.5s ease-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px rgba(46, 16, 101, 0.15);

    .equipment-image img {
      transform: scale(1.1);
    }
  }
}

.equipment-image {
  position: relative;
  aspect-ratio: 1 / 1;
  background: linear-gradient(135deg, #461491 0%, #7C3AED 100%);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }
}

.equipment-content {
  padding: 1.25rem;
  text-align: center;
}

.equipment-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: $primary-color;
  margin-bottom: 0.5rem;
}

.equipment-category {
  display: inline-block;
  background: rgba(124, 58, 237, 0.1);
  color: #461491;
  padding: 0.3rem 0.9rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

// Empty State
.empty-state {
  text-align: center;
  padding: 4rem 1rem;
}

.empty-icon {
  font-size: 5rem;
  color: #d1d5db;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.empty-subtitle {
  color: #6b7280;
}

// Modal
.modal {
  position: fixed;
  inset: 0;
  background: rgba(46, 16, 101, 0.6);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: fadeIn 0.3s;
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s;
}

.modal-header {
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
}

.modal-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: $primary-color;
}

.close-button {
  background: #f3f4f6;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  font-size: 1.5rem;

  &:hover {
    background: #e5e7eb;
    transform: rotate(90deg);
  }
}

.modal-body {
  padding: 2rem;
}

.modal-image {
  margin-bottom: 2rem;
  border-radius: 12px;
  overflow: hidden;
  height: 300px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.equipment-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-item {
  animation: fadeIn 0.5s ease-out;
}

.info-label {
  font-size: 1.1rem;
  font-weight: 700;
  color: $primary-color;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-value {
  color: #374151;
  line-height: 1.7;
}

// Animations
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
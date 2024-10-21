<script setup lang="ts">
import { tempoDesdeCriacao } from '@/utils/PastTime';
import { fetchAndProcessWords } from '@/utils/ExploreArray';
import { onMounted, ref } from 'vue';

interface ProcessedItem {
  title: string;
  content: string;
  created_at: string;
}

const items = ref<ProcessedItem[]>([]);
onMounted(async () => {

  items.value = await fetchAndProcessWords();
});
</script>

<template>
  <div class="pt-4 pl-6">
    <div class="pb-4">
      <h2 aria-label="Trending topics" >O que está acontecendo?</h2>
    </div>
    <div class="d-flex flex-column mb-4 home-whats-card" v-for="(item, index) in items.slice(0, 4)" :key="index">
      <p>{{ item.title }} - {{ tempoDesdeCriacao(item.created_at) }}</p>
      <RouterLink :to="`/search?keyword=${item.title}`" aria-label="View more about {{ item.title }}">
        <h3>{{ item.content }}</h3>
      </RouterLink>
    </div>
    <div>
      <RouterLink to="/explore" aria-label="View all trending topics">Mostrar mais</RouterLink>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.home-whats-card>a {
  text-decoration: none;
  color: #289ef0;
}

.home-whats-card>div {
  margin-bottom: 1.2rem;
}

.home-whats-card>div>h2 {
  font-size: 1rem;
  font-weight: 600;
}

.home-whats-card>div>h3 {
  font-size: 1rem;
  font-weight: 600;
}

.home-whats-card>div>span {
  font-size: 1rem;
}
</style>

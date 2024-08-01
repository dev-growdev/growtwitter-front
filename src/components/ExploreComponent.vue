
<script setup lang="ts">
    import { tempoDesdeCriacao } from '@/utils/PastTime';
    import { items } from '@/utils/ExploreArray';
</script>

<template>
      <div class="home-whats">
        <div class="home-whats-card">
          <div>
            <h2>O que está acontecendo?</h2>
          </div>
          <div v-for="(item, index )  in items.slice(0, 4)" :key="index">
            <p class="explore-title">{{ item.title }} - {{ tempoDesdeCriacao(item.created_at) }}</p>
            <h2>{{ item.content }}</h2>
          </div>
          <RouterLink to="/explore">Mostrar mais</RouterLink>
        </div>
      </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.home-whats {
  display: flex;
  min-width: 25%;
  height: 100dvh;
  justify-content: center;
  position: sticky;
  top: 0;
}

.home-whats-card {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 3% 5%;
  gap: 6%;
  width: 90%;
  margin-top: 10%;
  height: fit-content;
  border-radius: 3%;
  background-color: #e9e9e9;
}

.home-whats-card > a {
  text-decoration: none;
  color: #289ef0;
}

.home-whats-card > div {
  width: 100%;
  height: 100%;
  margin-bottom: 1.2rem;
}

.home-whats-card > div > h2 {
  font-size: 1rem;
  font-weight: 600;
}

.home-whats-card > div > h3 {
  font-size: 1rem;
  font-weight: 600;
}

.home-whats-card > div > span {
  font-size: 1rem;
}
</style>



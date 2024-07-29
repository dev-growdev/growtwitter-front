<script setup lang="ts">
import SideBar from '@/components/SideBar.vue';
import ListCard from '@/components/ListCard.vue';
import { getUser, showPosts } from '@/services/api';
import type { TweetType } from '@/types/TweetType';
import { onMounted, ref } from 'vue';
import type { UserType } from '@/types';
import { tempoDesdeCriacao } from '@/utils/PastTime';
import SpinnerComponent from '@/components/SpinnerComponent.vue';

const loadingVisible = ref<boolean>(false);
const tweets = ref<TweetType[]>([]);
const item = ref<UserType[]>([]);
const endpoint = '/posts';

async function fetchTweets() {
  loadingVisible.value = true;

  const response = await showPosts(endpoint);

  loadingVisible.value = false;

  tweets.value = response.data.data;
}

async function handleGetUser() {
  const response = await getUser();
  item.value = response.data.data;
}

onMounted(() => {
  Promise.all([handleGetUser(), fetchTweets()]);
});
const items = [
  {
    title: 'Esportes',
    content: 'Assunto sobre esportes',
    created_at: '2024-07-22 20:07:21'
  },
  {
    title: 'Assunto do Momento',
    content: 'Assunto do Momento em Brasil',
    created_at: '2024-07-21 18:07:21'
  },
  {
    title: 'Música',
    content: 'Assunto sobre Música',
    created_at: '2024-07-20 17:07:21'
  },
  {
    title: 'Cinema',
    content: 'Assunto sobre Filmes e Cinema',
    created_at: '2024-07-19 16:07:21'
  }
];
</script>
<template>
  <div>
    <div class="home-container">
      <div class="home-nav">
        <SideBar :item="item" />
      </div>
      <div class="home-content">
        <span class="home-content-title">
          <span> Página Inicial </span>
        </span>

        <div class="spinner-div d-flex justify-center mt-5">
          <SpinnerComponent v-if="loadingVisible" color="blue" />
        </div>
        <ListCard :tweets="tweets" />
      </div>
      <div class="home-whats">
        <div class="home-whats-card">
          <div>
            <h2>O que está acontecendo?</h2>
          </div>
          <div v-for="(item, index) in items" :key="index">
            <p>{{ item.title }} - {{ tempoDesdeCriacao(item.created_at) }}</p>
            <h2>{{ item.content }}</h2>
          </div>

          <RouterLink to="/explore">Mostrar mais</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.spinner-div{
  position: absolute;
  left: 46%;
  top: 50%
}

.home-container {
  display: flex;

  width: 100%;
  height: 100%;
  background: #ffffff;
}

.home-nav {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 20%;
  height: 100vh;
  background: #ffffff;
  position: sticky;
  top: 0;
  color: white;
}

.home-nav-component {
  width: 90%;
  height: 100%;
  padding: 1em 0 0 1em;
  background-color: black;
}

.home-content {
  width: 55%;
  height: 100%;
  border-right: 2px solid #e9e9e9;
  border-left: 2px solid #e9e9e9;
}

.home-content-title {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;
  height: 4rem;
  border-bottom: 2px solid #e9e9e9;
  font-weight: 600;
  font-size: 1.3rem;
  font-style: normal;
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

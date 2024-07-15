<script setup lang="ts">
import ListCard from '@/components/ListCard.vue';
import { showPosts } from '@/services/api';
import type { TweetType } from '@/types/TweetType';
import { ref } from 'vue';

const tweets = ref<TweetType[]>([]);
const endpoint = '/posts';

async function fetchTweets() {
  const response = await showPosts(endpoint);
  tweets.value = response.data.data;
}

fetchTweets();

// const tweets: TweetType[] = [
//   {
//     id: '1',
//     content: 'TWEET TESTE 1',
//     user_id: 1
//   },
//   {
//     id: '2',
//     content: 'TWEET TESTE 2',
//     user_id: 1
//   },
//   {
//     id: '3',
//     content: 'TWEET TESTE 3',
//     user_id: 1
//   },
//   {
//     id: '4',
//     content: 'TWEET TESTE 4',
//     user_id: 1
//   },
//   {
//     id: '5',
//     content: 'TWEET TESTE 5',
//     user_id: 1
//   },
//   {
//     id: '6',
//     content: 'TWEET TESTE 6',
//     user_id: 1
//   },
//   {
//     id: '7',
//     content: 'TWEET TESTE 7',
//     user_id: 1
//   }
// ];
</script>
<template>
  <div>
    <div class="home-container">
      <div class="home-nav">
        <div class="home-nav-component">Aqui vai os components nav</div>
      </div>
      <div class="home-content">
        <span class="home-content-title">
          <span> Página Inicial </span>
        </span>

        <ListCard :tweets="tweets" />
      </div>
      <div class="home-whats">
        <div class="home-whats-card">
          <div>
            <h2>O que está acontecendo?</h2>
          </div>
          <div>
            <span>Esportes - Há 45 min</span>
            <h3>Assunto sobre esportes</h3>
          </div>

          <div>
            <span>Assunto do Momento em Brasil</span>
            <h3>Assunto do Momento</h3>
          </div>

          <div>
            <span>Música - Assunto do Momento</span>
            <h3>Assunto sobre Música</h3>
          </div>

          <div>
            <span>Cinema - Assunto do Momento</span>
            <h3>Assunto sobre Filmes e Cinema</h3>
          </div>

          <a href="">Mostrar mais</a>
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
  padding: 2%;
  width: 100%;
  height: 5rem;
  border-bottom: 2px solid #e9e9e9;

  font-weight: 600;
  font-size: 2rem;
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
  padding: 5%;
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
  height: 90px;
}

.home-whats-card > div > h2 {
  font-size: 1.8rem;
  font-weight: 600;
}

.home-whats-card > div > h3 {
  font-size: 1.3rem;
  font-weight: 600;
}

.home-whats-card > div > span {
  font-size: 1rem;
}
</style>

<script setup lang="ts">
import SideBar from '@/components/SideBar.vue';
import ListCard from '@/components/ListCard.vue';
import { showPosts } from '@/services/api';
import type { TweetType } from '@/types/TweetType';
import { ref } from 'vue';
import LoadingDefault from '@/components/LoadingDefault.vue';
import default_avatar from '@/assets/default-avatar.png';
import type { UserType } from '@/types';
import { tempoDesdeCriacao } from '@/utils/PastTime';

const loadingVisible = ref<boolean>(false);

const user = {
  name: 'Spike',
  hashName: '@Spiegel_Spike',
  urlImg:
    'https://pyxis.nymag.com/v1/imgs/d8e/265/8647a0155d65e195130745751c6682e17d-cowboy-bebop-.rsquare.w330.jpg'
};
interface ProfileProps {
  test: UserType;
}

defineProps<ProfileProps>();

const tweets = ref<TweetType[]>([]);
const endpoint = '/postsbyuserauth';

async function fetchTweets() {
  loadingVisible.value = true;

  const response = await showPosts(endpoint);

  loadingVisible.value = false;
  tweets.value = response.data.data;
}

fetchTweets();

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
  <LoadingDefault v-if="loadingVisible" />
  <div>
    <div class="home-container">
      <div class="home-nav">
        <SideBar :item="user" />
      </div>
      <div class="home-content">
        <span class="home-content-title">
            <div class="profile-top">
              <img class="arrow-profile" src="../assets/icone_seta.svg" alt="">
              <div class="profile-header">
                <span class="title"> Perfil de @user </span>
                <p class="tweet-count">x tweets</p>
                <img class="profile-pic" src="https://pyxis.nymag.com/v1/imgs/d8e/265/8647a0155d65e195130745751c6682e17d-cowboy-bebop-.rsquare.w330.jpg" alt="">
              <!-- <img class="profile-pic" :src="test.avatar_url ?? default_avatar" alt=""> -->
              <div class="name-username">
                <h3>Nome Sobrenome</h3>
                <h6>@username</h6>
              </div>
            </div>
          </div>
          <button class="edit-btn">Editar</button>
        </span>

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

.edit-btn {
align-self:first baseline;
margin-bottom: 1rem;
margin-left: 1rem;
background-color: #289ef0;
border: #289ef0 1px solid;
color: #ffffff;
height: 1.3rem;
width: 3.5rem;
border-radius: 0.5rem;
}

.edit-btn:hover{
  color: #289ef0;
  background-color: #ffffff;
  border: 1px solid #289ef0;
}

.name-username{
  margin-top: 0.6rem;
  margin-bottom: 0.5rem;
}

h3 {
  font-size: 1rem;
}
h6 {
  font-size: 0.8rem
}

.profile-top {
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;

}

.profile-pic {
  width: 7rem;
  height: 7rem;
  border: 4px solid #e9e9e9;
  border-radius: 50%;
  margin-top: 1rem;
}

.profile-pic:hover {
  border: 4px solid #289ef0;
}

.profile-header {
  display: flex;
  flex-direction: column;
}

.title{
  font-size: 1.1rem;
}

.tweet-count {
  font-size: 0.8rem;
  color: rgb(110, 110, 110);
}

.arrow-profile {
  margin: 1rem;
  height: 0.7rem;
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
  height: 16rem;
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

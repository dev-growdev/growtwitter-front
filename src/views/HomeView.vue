<script setup lang="ts">
import SideBar from '@/components/SideBar.vue';
import ListCard from '@/components/ListCard.vue';
import { getUser, showPosts } from '@/services/api';
import type { TweetType } from '@/types/TweetType';
import { onMounted, ref, computed, onUnmounted } from 'vue';
import type { UserType } from '@/types';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import ExploreComponent from '@/components/ExploreComponent.vue';

const loadingVisible = ref<boolean>(false);
const tweets = ref<TweetType[]>([]);
const item = ref<UserType[]>([]);
const endpoint = '/posts';

const listenEmit = () => {
  fetchTweets();
}

async function fetchTweets() {
  loadingVisible.value = true;
  const response = await showPosts(endpoint);
  loadingVisible.value = false;
  tweets.value = response.data.data;
}

async function handleGetUser() {
  const userData = localStorage.getItem('userData');
  if (!userData) {
    const response = await getUser();
    item.value = response.data.data;
    localStorage.setItem('userData', JSON.stringify(item.value));
    return;
  }
  item.value = JSON.parse(userData);
}

onMounted(() => {
  handleGetUser();
  fetchTweets();
});

const windowWidth = ref(window.innerWidth);
const isMobileView = computed(() => windowWidth.value < 600);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div>
    <div class="home-container">
      <div class="home-nav">
        <SideBar :item="item" @call-emit="listenEmit" />
      </div>

      <!-- Aplica a classe 'full-width' ao home-content se for visualização móvel -->
      <div class="home-content" :class="{ 'full-width': isMobileView }">
        <span class="home-content-title">
          <span>Página Inicial</span>
        </span>

        <div class="spinner-div d-flex justify-center mt-5">
          <SpinnerComponent v-if="loadingVisible" color="blue" />
        </div>

        <ListCard :tweets="tweets" />
      </div>

      <!-- Esconde o ExploreComponent em telas pequenas -->
      <ExploreComponent v-if="!isMobileView" />
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.spinner-div {
  position: absolute;
  left: 46%;
  top: 50%;
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

.home-content {
  width: 55%;
  height: 100%;
  border-right: 2px solid #e9e9e9;
  border-left: 2px solid #e9e9e9;
}

.home-content.full-width {
  width: 100%;
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
</style>

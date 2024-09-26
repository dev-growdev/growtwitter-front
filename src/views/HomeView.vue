<script setup lang="ts">
import BackToTop from '@/components/BackToTop.vue';
import SideBar from '@/components/SideBar.vue';
import ListCard from '@/components/ListCard.vue';
import { getUser, showPosts } from '@/services/api';
import type { TweetType } from '@/types/TweetType';
import { onMounted, ref, computed, onUnmounted } from 'vue';
import type { UserType } from '@/types';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import ExploreComponent from '@/components/ExploreComponent.vue';
import ApplicationBar from '@/components/ApplicationBar.vue';
import { isLogged } from '@/utils/isLogged';

const hasMessage = ref<boolean>(false);
const message = ref<string>('');
const messageTimeout = ref<number>(-1);
const alertType = ref<string>('');

const listenEmit = () => {
  showMessage('Tweet publicado com sucesso!', 'success');
  fetchTweets();
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function showMessage(messageText: string, type: string) {
  hasMessage.value = true;
  message.value = messageText;
  alertType.value = type;

  if (messageTimeout.value) clearTimeout(messageTimeout.value);
  hasMessage.value = true;
  await delay(3000);
  hasMessage.value = false;
}

function clearMessage() {
  clearTimeout(messageTimeout.value);
  hasMessage.value = false;
}

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
  isLogged();
  handleGetUser();
  fetchTweets();
});

const windowWidth = ref(window.innerWidth);

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
  <v-app class="ma-0" id="app">
    <v-model class="model-alert">
      <v-alert
        v-if="hasMessage"
        closable
        class="alert fixed-alert"
        :text="message"
        :color="alertType"
        @click:close="clearMessage()"
      ></v-alert>
    </v-model>
    <v-navigation-drawer width="470" class="border-0 pa-0">
      <SideBar :item="item" @call-emit="listenEmit" 
      />
 
   
    </v-navigation-drawer>

    <ApplicationBar class="d-flex d-lg-none" />

    <SpinnerComponent v-if="loadingVisible" class="spinner-div" color="blue" />
   
    <BackToTop/>
    
    <v-main class="mx-0">
      <v-container class="mt-0 pa-0">
        <v-row class="">
          <v-col class="border px-4 px-md-0 mx-0 mx-md-4">
            <p class="text-start font-weight-bold pt-6 px-2 text-h5">Página Inicial</p>
            <ListCard :tweets="tweets" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-navigation-drawer width="455" location="right" class="border-0 pa-2">
      <ExploreComponent />

    </v-navigation-drawer>
  </v-app>
</template>

<style scoped>
.app {
  overflow-x: hidden;
}

@media (max-width: 600px) {
  .spinner-div {
    position: fixed;
    top: 40%;
  }
}

.spinner-div {
  position: absolute;
  top: 40%;
  left: 50%;
}

.alert {
  position: absolute;
  top: 20px;
  left: 30%;
  right: 30%;
  z-index: 9999;
}
</style>

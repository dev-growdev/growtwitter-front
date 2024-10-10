<script setup lang="ts">
import SideBar from '@/components/SideBar.vue';
import ListCard from '@/components/ListCard.vue';
import { getUser, getHomeData } from '@/services/api';
import type { PaginateRetweetType, PaginateTweetType, TweetType } from '@/types/TweetType';
import { onMounted, ref, onUnmounted } from 'vue';
import type { UserType } from '@/types';
import ExploreComponent from '@/components/ExploreComponent.vue';
import ApplicationBar from '@/components/ApplicationBar.vue';
import ButtonTweet from '@/components/ButtonTweet.vue';
import BackToTop from '@/components/BackToTop.vue';

const hasMessage = ref<boolean>(false);
const message = ref<string>('');
const messageTimeout = ref<number>(-1);
const alertType = ref<string>('');

const listenEmit = () => {
  console.log('entrou');
  showMessage('Tweet publicado com sucesso!', 'success');
  fetchAll();
};

const handleEmit = () => {
  console.log('entrou');
  showMessage('Tweet publicado com sucesso!', 'success');
  fetchAll();
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
  console.log(hasMessage.value);

 await delay(3000);
  hasMessage.value = false;
  console.log(hasMessage.value);
}

function clearMessage() {
  clearTimeout(messageTimeout.value);
  hasMessage.value = false;
}

const loadingVisible = ref<boolean>(false);
const tweets = ref<TweetType[]>([]);
const retweets = ref<any[]>([]);
const item = ref<UserType>();

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
const page = ref<number>(1);

async function fetchAll() {
  loadingVisible.value = true;
  const response = await getHomeData(page.value);
  tweets.value = response.data.data.posts.data;
  retweets.value = response.data.data.retweets.data;

  loadingVisible.value = false;
}

const windowWidth = ref(window.innerWidth);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted( async () => {
  window.addEventListener('resize', handleResize);
  localStorage.setItem("attemptsVerify", false.toString())
  handleGetUser();
  fetchAll();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <v-app class="ma-0" id="app">
    <div class="model-alert">
      <v-alert v-if="hasMessage" closable class="alert fixed-alert" :text="message" :color="alertType" @click:close="clearMessage()"></v-alert>
    </div>
    <div v-if="loadingVisible" class="spinner-div">
      <v-progress-circular indeterminate :size="45" :width="9" />
    </div>
    <v-navigation-drawer v-if="!$vuetify.display.mdAndDown" permanent width="455" location="left" class="border-0" touchless disable-swipe>
      <SideBar :item="item!" @call-emit="listenEmit" />
    </v-navigation-drawer>

    <ApplicationBar class="d-flex d-lg-none" />

    <BackToTop />

    <div class="d-flex d-lg-none">
      <ButtonTweet @add-tweet="handleEmit" />
    </div>

    <v-main class="mx-0">
      <v-container class="mt-0 pa-0">
        <v-row class="">
          <v-col class="border px-4 px-md-0 mx-0 mx-md-4">
            <p class="text-start font-weight-bold pt-6 px-2 text-h5">Página Inicial</p>
            <ListCard :tweets="tweets" :retweets="retweets" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-navigation-drawer v-if="!$vuetify.display.mdAndDown" permanent width="455" location="right" class="border-0" touchless disable-swipe>
      <ExploreComponent />
    </v-navigation-drawer>
  </v-app>
</template>

<style scoped>
.app {
  overflow-x: hidden;
}

.spinner-div {
  display: flex;
  background-color: #00000050;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9999;
  justify-content: center;
  align-items: center;
}

.alert {
  position: absolute;
  top: 20px;
  left: 30%;
  right: 30%;
  z-index: 9999;
}

@media (max-width: 1279px) {
  .alert {
    left: 20%;
    right: 20%;
  }
}
</style>

<script setup lang="ts">
import SideBar from '@/components/SideBar.vue';
import ListCard from '@/components/ListCard.vue';
import { getUser, getHomeData, showFollowing, getSearchData } from '@/services/api';
import type { TweetType } from '@/types/TweetType';
import { onMounted, ref, onUnmounted, watch } from 'vue';
import type { UserType } from '@/types';
import ExploreComponent from '@/components/ExploreComponent.vue';
import ApplicationBar from '@/components/ApplicationBar.vue';
import ButtonTweet from '@/components/ButtonTweet.vue';
import BackToTop from '@/components/BackToTop.vue';
import { getUserId } from '@/services/authentication';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

const hasMessage = ref<boolean>(false);
const message = ref<string>('');
const messageTimeout = ref<number>(-1);
const alertType = ref<string>('');
const dados = ref<Dados>();
const continueLoading = ref<boolean>(true);
const showDiscoverytweets = ref<boolean>(true);
const showFollowingtweets = ref<boolean>(false);
const btnEnabled = ref<boolean>(false);
const activeButton = ref<string>('discover');
const tweets = ref<TweetType[]>([]);
const retweets = ref<any[]>([]);
const item = ref<UserType>();
const page = ref<number>(0);
const pageFollowing = ref<number>(0);
const windowWidth = ref(window.innerWidth);
const followingsList = ref<number[]>([]);
const isLoading = ref<boolean>(false);
const ultimapag = ref<number>(0);
const showFollowings = ref<boolean>(false);
const isLoadingPage = ref<boolean>(false);
const keyword = ref<string>('');
const route = useRoute();
interface Dados {
  id: number;
  isTweet: boolean;
}

const listenEmit = () => {
  page.value = 0;
  tweets.value = [];
  retweets.value = [];
  load({
    done: () => { }
  });
  showMessage('Tweet publicado com sucesso!', 'success');
};

const handleEmit = () => {
  page.value = 0;
  tweets.value = [];
  retweets.value = [];
  load({
    done: () => { }
  });
  showMessage('Tweet publicado com sucesso!', 'success');
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

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

function enableDiscoveryTweets() {
  activeButton.value = 'discover';
  showDiscoverytweets.value = true;
  showFollowingtweets.value = false;
}




async function load({ done }: any) {
  btnEnabled.value = false;
  enableDiscoveryTweets();
  page.value++;
  if (continueLoading.value == true) {
    const response = await getSearchData(page.value, keyword.value);

    if (response.data.data.posts.last_page <= page.value) {
      continueLoading.value = false;
    }
    ultimapag.value = response.data.data.posts.last_page;
    tweets.value.push(...response.data.data.posts.data);
    retweets.value.push(...response.data.data.retweets.data);
  }
  btnEnabled.value = true;
  done('ok');
}


function deletarRender() {
  const identificador = dados.value?.isTweet ? tweets : retweets;

  const index = identificador.value.findIndex((item) => item.id === dados.value?.id);
  if (index !== -1) {
    identificador.value.splice(index, 1);
    identificador.value = [...identificador.value];
  }
}

function receberHome(dadosP: Dados) {
  dados.value = dadosP;
}

onMounted(async () => {
  window.addEventListener('resize', handleResize);
  localStorage.setItem('attemptsVerify', false.toString());
  keyword.value = route.query.keyword as string;
  handleGetUser();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

watch(dados, () => {
  console.log(dados);

  deletarRender();
});

watch(
  () => route.query.keyword,
  async newKeyword => {
    keyword.value = newKeyword as string;
    page.value = 0;
    tweets.value = [];
    retweets.value = [];
    continueLoading.value = true;
    load({
      done: () => { }
    });
  }
)
</script>

<template>
  <v-app class="ma-0" id="app">
    <div class="model-alert">
      <v-alert v-if="hasMessage" closable class="alert fixed-alert" :text="message" :color="alertType"
        @click:close="clearMessage()"></v-alert>
    </div>

    <v-navigation-drawer v-if="!$vuetify.display.mdAndDown" permanent width="455" location="left" class="border-0"
      touchless disable-swipe>
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
            <div class="div-page-title">
              <v-layout class="layout overflow-visible mt-15">

                <p class="font-weight-bold text-h6">Resultados para: {{ keyword }}</p>

              </v-layout>
            </div>

            <div v-if="showDiscoverytweets">
              <v-infinite-scroll class="infinite-scroll" v-if="continueLoading" color="blue" :onLoad="load"
                :scroll-target="'#scroll-container'">
                <ListCard :tweets="tweets" :retweets="retweets" followingsList="" @to-list-card="receberHome" />
              </v-infinite-scroll>
            </div>


            <div v-if="!continueLoading">
              <div v-if="showDiscoverytweets">
                <ListCard :tweets="tweets" :retweets="retweets" followingsList="" @to-list-card="receberHome" />
              </div>
              <div v-if="showFollowingtweets">
                <ListCard :tweets="tweets" :retweets="retweets" :following="true" :followingsList="followingsList"
                  @to-list-card="receberHome" />
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-navigation-drawer v-if="!$vuetify.display.mdAndDown" permanent width="455" location="right" class="border-0"
      touchless disable-swipe>
      <ExploreComponent />
    </v-navigation-drawer>
  </v-app>
</template>

<style scoped>
.app {
  overflow-x: hidden;
}

.bottom-nav {
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-btn.btn-active {
  border-bottom: 3px solid #1976d2 !important;
  background-color: white !important;
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

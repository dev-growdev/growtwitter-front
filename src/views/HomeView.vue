<script setup lang="ts">
import SideBar from '@/components/SideBar.vue';
import ListCard from '@/components/ListCard.vue';
import { getUser, getHomeData, showFollowing } from '@/services/api';
import type { TweetType } from '@/types/TweetType';
import { onMounted, ref, onUnmounted, watch } from 'vue';
import type { UserType } from '@/types';
import ExploreComponent from '@/components/ExploreComponent.vue';
import ApplicationBar from '@/components/ApplicationBar.vue';
import ButtonTweet from '@/components/ButtonTweet.vue';
import BackToTop from '@/components/BackToTop.vue';
import { getUserId } from '@/services/authentication';
import type { DadosType, DadosRtType } from '@/types/DadosType';

const tweets = ref<TweetType[]>([]); //array de tweets;
const retweets = ref<any[]>([]); //array de rt;
const hasMessage = ref<boolean>(false);
const message = ref<string>('');
const messageTimeout = ref<number>(-1);
const alertType = ref<string>('');
const dados = ref<DadosType>();
const dadosRT = ref<DadosRtType>();
const continueLoading = ref<boolean>(true);
const showDiscoverytweets = ref<boolean>(true);
const showFollowingtweets = ref<boolean>(false);
const btnEnabled = ref<boolean>(false);
const activeButton = ref<string>('discover');
const item = ref<UserType>();
const page = ref<number>(0);
const pageFollowing = ref<number>(0);
const windowWidth = ref(window.innerWidth);
const followingsList = ref<number[]>([]);
const isLoading = ref<boolean>(false);
const ultimapag = ref<number>(0);
const showFollowings = ref<boolean>(false);
const isLoadingPage = ref<boolean>(false);
const dadosBtn = ref<any>();

function receiveFromSideBar(props: any) {
  dadosBtn.value = props;
}

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

function disableDiscoveryTweets() {
  activeButton.value = 'following';
  showDiscoverytweets.value = false;
  showFollowingtweets.value = true;
}

function switchToFollowing() {
  activeButton.value = 'following';
  pageFollowing.value = 0;
  continueLoading.value = true;
  isLoading.value = true;
  btnEnabled.value = false;
  disableDiscoveryTweets();
  btnEnabled.value = true;
}

async function switchToDiscovery() {
  activeButton.value = 'discover';
  btnEnabled.value = false;
  enableDiscoveryTweets();
  btnEnabled.value = true;
}

async function load({ done }: any) {
  btnEnabled.value = false;
  enableDiscoveryTweets();
  page.value++;
  if (continueLoading.value == true) {
    const response = await getHomeData(page.value);

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

async function loadFollowing({ done }: any) {
  if (isLoadingPage.value) return;

  if (pageFollowing.value >= ultimapag.value) {
    continueLoading.value = false;
    return;
  }

  isLoadingPage.value = true;

  btnEnabled.value = false;
  disableDiscoveryTweets();

  const userId = await getUserId();

  if (!showFollowings.value) {
    const response = await showFollowing('follow/' + userId);
    for (let index = 0; index < response.data.followingsData.length; index++) {
      followingsList.value.push(response.data.followingsData[index].followingId);
    }
  }

  showFollowings.value = true;

  const response = await getHomeData(page.value + 1);
  if (response.data.data.posts.data.length === 0 || page.value >= response.data.data.posts.last_page) {
    continueLoading.value = false;
  } else {
    tweets.value.push(...response.data.data.posts.data);
    retweets.value.push(...response.data.data.retweets.data);
    page.value++;
  }

  isLoadingPage.value = false;
  btnEnabled.value = true;

  done('ok');
}

function deleteTweet() {
  const tweetOrRetweet = dados.value?.isTweet ? tweets : retweets;

  const index = tweetOrRetweet.value.findIndex((item) => item.id === dados.value?.id);
  if (index !== -1) {
    tweetOrRetweet.value.splice(index, 1);
    tweetOrRetweet.value = [...tweetOrRetweet.value];
  }
}

function addRetweet() {
  retweets.value.unshift(dadosRT.value);
}

function addTweet() {
  tweets.value.unshift(dadosBtn.value);
  showMessage('Tweet publicado com sucesso', 'success');
}

function reciveDelTweetHome(dadosP: DadosType) {
  dados.value = dadosP;
}

function reciveRtHome(dadosP: DadosRtType) {
  dadosRT.value = dadosP;
}

onMounted(async () => {
  window.addEventListener('resize', handleResize);
  localStorage.setItem('attemptsVerify', false.toString());
  handleGetUser();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

watch(dados, () => {
  deleteTweet();
});
watch(dadosRT, () => {
  addRetweet();
});
watch(dadosBtn, () => {
  addTweet();
});
</script>

<template>
  <v-app class="ma-0" id="app">
    <div class="model-alert">
      <v-alert v-if="hasMessage" closable class="alert fixed-alert" :text="message" :color="alertType" @click:close="clearMessage()" role="alert"
        aria-live="assertive"
        aria-atomic="true"
        aria-label="Alert message"></v-alert>
    </div>

    <v-navigation-drawer v-if="!$vuetify.display.mdAndDown" permanent width="455" location="left" class="border-0" touchless disable-swipe aria-label="Main Navigation Drawer">
      <SideBar :item="item!" @side-to-home="receiveFromSideBar" />
   
    </v-navigation-drawer>

    <ApplicationBar class="d-flex d-lg-none" aria-label="Application Bar for Mobile"/>

    <BackToTop aria-label="Back to Top" />

    <div class="d-flex d-lg-none">
      <ButtonTweet @to-side-bar="receiveFromSideBar" aria-label="Add Tweet"/>
    </div>

    <v-main class="mx-0">
      <v-container class="mt-0 pa-0">
        <v-row class="">
          <v-col class="border px-4 px-md-0 mx-0 mx-md-4">
            <div class="div-page-title">
              <v-layout class="layout overflow-visible mt-15">
                <v-bottom-navigation class="bottom-nav elevation-0" active>
                  <v-btn class="home-switch-btn mx-5 px-2 py-2" :class="{ 'btn-active': activeButton === 'discover' }" :disabled="!btnEnabled" @click="switchToDiscovery()" aria-label="Switch to Discover"
                    aria-pressed="false"
                    ><p class="font-weight-bold text-h6">Descobrir</p></v-btn
                  >
                  <v-btn class="home-switch-btn mx-5 px-2 py-2" :class="{ 'btn-active': activeButton === 'following' }" :disabled="!btnEnabled" @click="switchToFollowing()"  aria-label="Switch to Following"
                    aria-pressed="false"
                    ><p class="font-weight-bold text-h6">Seguindo</p></v-btn
                  >
                </v-bottom-navigation>
              </v-layout>
            </div>

            <div v-if="showDiscoverytweets" role="region">
              <v-infinite-scroll class="infinite-scroll" v-if="continueLoading" color="blue" :onLoad="load" :scroll-target="'#scroll-container'"  aria-live="polite"
              aria-busy="false"
              >
                <ListCard :tweets="tweets" :retweets="retweets" followingsList="" @to-list-card="reciveDelTweetHome" @rt-list-card="reciveRtHome" />
              </v-infinite-scroll>
            </div>

            <div v-if="showFollowingtweets">
              <v-infinite-scroll class="infinite-scroll" v-if="continueLoading" color="blue" :onLoad="loadFollowing" :scroll-target="'#scroll-container'">
                <ListCard :tweets="tweets" :retweets="retweets" :following="true" :followingsList="followingsList" @to-list-card="reciveDelTweetHome" @rt-list-card="reciveRtHome" />
              </v-infinite-scroll>
            </div>

            <div v-if="!continueLoading">
              <div v-if="showDiscoverytweets">
                <ListCard :tweets="tweets" :retweets="retweets" followingsList="" @to-list-card="reciveDelTweetHome" @rt-list-card="reciveRtHome" />
              </div>
              <div v-if="showFollowingtweets">
                <ListCard :tweets="tweets" :retweets="retweets" :following="true" :followingsList="followingsList" @to-list-card="reciveDelTweetHome" @rt-list-card="reciveRtHome" />
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-navigation-drawer v-if="!$vuetify.display.mdAndDown" permanent width="455" location="right" class="border-0" touchless disable-swipe  aria-label="Explore Navigation Drawer">
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

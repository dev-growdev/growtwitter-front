<script setup lang="ts">
// import BackToTop from '@/components/BackToTop.vue';
import SideBar from '@/components/SideBar.vue';
import ListCard from '@/components/ListCard.vue';
import { getUser, showPosts, getRetweet, getUserbyId } from '@/services/api';
import type { TweetType } from '@/types/TweetType';
import { onMounted, ref, onUnmounted } from 'vue';
import type { UserType } from '@/types';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import ExploreComponent from '@/components/ExploreComponent.vue';
import ApplicationBar from '@/components/ApplicationBar.vue';
// import { isLogged } from '@/utils/isLogged';
import ButtonTweet from '@/components/ButtonTweet.vue';
import { getUserId } from '@/services/authentication';

import BackToTop from '@/components/BackToTop.vue';
import type { RetweetType } from '@/types/RetweetType';

const hasMessage = ref<boolean>(false);
const message = ref<string>('');
const messageTimeout = ref<number>(-1);
const alertType = ref<string>('');
const showDiscoverytweets = ref<boolean>(true);
const showFollowingtweets = ref<boolean>(false);


function enableDiscoveryTweets(){
    showDiscoverytweets.value = true;
    showFollowingtweets.value = false;
    
      console.log("Discovery: " + showDiscoverytweets.value);
      console.log("Following: " + showFollowingtweets.value);
  }

function disableDiscoveryTweets(){
  showDiscoverytweets.value = false;
  showFollowingtweets.value = true;
    
    console.log("Discovery: " + showDiscoverytweets.value);
    console.log("Following: " + showFollowingtweets.value);
}


const listenEmit = () => {
  showMessage('Tweet publicado com sucesso!', 'success');
  fetchTweets();
};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
const following = ref<TweetType[]>([]);
const retweets = ref<RetweetType[]>([])
const followingRetweets = ref<RetweetType[]>([])
const item = ref<UserType[]>([]);
const endpoint = '/posts';

async function fetchTweets() {

  const response = await showPosts(endpoint);

  tweets.value = response.data.data;
}

async function fetchFollowingTweets() {

  const userId = await getUserId();
  
  const response = await showPosts('follow/' + userId);
  const followingPosts = [];
  for (let index = 0; index < response.data.followingsData.length; index++) {
   for (let i = 0; i < response.data.followingsData[index].posts.length; i++) {
    followingPosts.push(response.data.followingsData[index].posts[i]);
    }
  }

  
  following.value = followingPosts;
  
  // console.log("FOLLOWING", following.value);
  // console.log("TWEETS", tweets.value);

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

async function fetchReTweets() {

  const response = await getRetweet();
  retweets.value = response.data.data;
}

async function fetchFollowingReTweets() {

  const userId = await getUserId();
  
  const response = await showPosts('follow/' + userId);
  const followingPosts = [];
  for (let index = 0; index < response.data.followingsData.length; index++) {
    console.log(response.data.followingsData[index].following.retweets); 
    followingPosts.push(response.data.followingsData[index].following.retweets);
      //pega os retweets dos posts dos seguindo
      //tem que pegar os posts dos retweets dos seguindo

}

  followingRetweets.value = followingPosts;
  console.log(JSON.stringify(followingRetweets.value));
  

}

async function fetchAllDiscovery() {
  enableDiscoveryTweets()
  loadingVisible.value = true;
  await Promise.all([fetchTweets(), fetchReTweets()]);
  loadingVisible.value = false;
}

async function fetchAllFollowing() {
  disableDiscoveryTweets()
  loadingVisible.value = true;
  console.log("Retweets:" + JSON.stringify(retweets.value));
  retweets.value = []
  await Promise.all([fetchFollowingTweets(), fetchFollowingReTweets()]);
  loadingVisible.value = false;
}

onMounted(() => {
  handleGetUser();
  fetchAllDiscovery();
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
      <v-alert v-if="hasMessage" closable class="alert fixed-alert" :text="message" :color="alertType"
        @click:close="clearMessage()"></v-alert>
    </v-model>
    <v-navigation-drawer width="470" class="border-0 pa-0">
      <SideBar :item="item" @call-emit="listenEmit" />
    </v-navigation-drawer>

    <ApplicationBar class="d-flex d-lg-none" />

    <SpinnerComponent v-if="loadingVisible" class="spinner-div" color="blue" />

    <BackToTop />

    <div class="d-flex d-lg-none">
      <ButtonTweet />
    </div>

    <v-main class="mx-0">
      <v-container class="mt-0 pa-0">
        <v-row class="">
          <v-col class="border px-4 px-md-0 mx-0 mx-md-4">
            <div class="div-page-title d-flex justify-center">
              <v-btn class="mt-5 mx-2" @click="fetchAllDiscovery"><p class="font-weight-bold text-h6">Descobrir</p></v-btn>
              <v-btn class="mt-5 mx-2" @click="fetchAllFollowing"><p class="font-weight-bold text-h6">Seguindo</p></v-btn>
            </div>
            <div v-if="showDiscoverytweets">
              <ListCard :tweets="tweets" :retweets="retweets" />
            </div>
            <div v-if="showFollowingtweets">
              <ListCard :tweets="following" :retweets="followingRetweets" />
            </div>
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
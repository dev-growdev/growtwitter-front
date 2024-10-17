<script setup lang="ts">
import SideBar from '@/components/SideBar.vue';
import ListCard from '@/components/ListCard.vue';
import { getUser, getHomeData, getUserbyId, showPosts } from '@/services/api';
import type { TweetType } from '@/types/TweetType';
import { onMounted, ref, onUnmounted } from 'vue';
import type { UserType } from '@/types';
import ExploreComponent from '@/components/ExploreComponent.vue';
import ApplicationBar from '@/components/ApplicationBar.vue';
import ButtonTweet from '@/components/ButtonTweet.vue';
import BackToTop from '@/components/BackToTop.vue';
import { getUserId } from '@/services/authentication';

const hasMessage = ref<boolean>(false);
const message = ref<string>('');
const messageTimeout = ref<number>(-1);
const alertType = ref<string>('');

const listenEmit = () => {
  page.value = 0;
  load({
    done: () => {
      console.log("Carregamento completo");
    }
  });
  showMessage('Tweet publicado com sucesso!', 'success');
};

const handleEmit = () => {
  page.value = 0;
  console.log('entrou');
  load({
  done: () => {
    console.log("Carregamento completo");
  }
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
const page = ref<number>(0);


const windowWidth = ref(window.innerWidth);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

const continueLoading = ref<boolean>(true);

//--------------------
//--------------------
//--------------------

const showDiscoverytweets = ref<boolean>(true);
const showFollowingtweets = ref<boolean>(false);
const btnEnabled = ref<boolean>(false);
// const followingTweets = ref<TweetType[]>([]);
// const followingRetweets = ref<any[]>([]);



// async function fetchFollowingTweets() {

// const userId = await getUserId();

// const response = await showPosts('follow/' + userId);
// console.log(response);

// const followingPosts = [];

// for (let index = 0; index < response.data.followingsData.length; index++) {
//  for (let i = 0; i < response.data.followingsData[index].posts.length; i++) {
//   followingPosts.push(response.data.followingsData[index].posts[i]);
//   }
//  }

//  console.log(followingPosts);
//  followingTweets.value = followingPosts;
 

// const response1 = await showPosts('posts/');
// console.log(response.data);


// const tamanhoFollowingPosts = followingPosts.length;
// for (let i = 0; i < response1.data.data.length; i++) {
//   for (let j = 0; j < tamanhoFollowingPosts; j++) {
//   for (let k = 0; k < response1.data.data[i].retweets.length; k++) {
//     if(response1.data.data[i].retweets[k].userId == followingPosts[j].userId){ 
//       followingPosts.push(response1.data.data[i]) //post
//     }
//   }
// }
// }

// console.log(followingPosts);


// console.log("following.value");
// console.log(followingTweets.value);

// }






//----------
//   async function fetchFollowingReTweets() {

// const userId = await getUserId();

// const response = await showPosts('follow/' + userId);

// const followingPosts = [];
// for (let index = 0; index < response.data.followingsData.length; index++) {
//   for (let i = 0; i < response.data.followingsData[index].following.retweets.length; i++) {
//     followingPosts.push(response.data.followingsData[index].following.retweets[i]);
//   }
// }

// followingRetweets.value = followingPosts;
// console.log(followingRetweets);
// console.log(retweets);

// }

//--------------------


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



async function loadFollowing() {
  console.log("entrou1");
  btnEnabled.value = false;
  // await fetchFollowingReTweets();
  // await fetchFollowingTweets()
  disableDiscoveryTweets()
  btnEnabled.value = true;
}


const test = ref<number[]>([]);



  async function load({ done }:any) {
    console.log("entrou2");
  btnEnabled.value = false;
  enableDiscoveryTweets()
  page.value++;
  if(continueLoading.value == true){
  const response = await getHomeData(page.value)

  if(response.data.data.posts.last_page <= page.value){
      continueLoading.value = false
      
    }

    //////////////
    
const userId = await getUserId();

const response2 = await showPosts('follow/' + userId);

for (let index = 0; index < response2.data.followingsData.length; index++) {
    test.value.push( response2.data.followingsData[index].followingId);
  }


    
    
    
    //////////////
    tweets.value.push(...response.data.data.posts.data);
    retweets.value.push(...response.data.data.retweets.data)
  }
  btnEnabled.value = true;
    done("ok");
  }








  
//--------------------
//--------------------
//--------------------

onMounted( async () => {
  window.addEventListener('resize', handleResize);
  localStorage.setItem("attemptsVerify", false.toString())
  handleGetUser();

  // console.log(followingTweets);
  // console.log(tweets);
  
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
            <div class="div-page-title d-flex justify-center">
              <v-layout class="layout overflow-visible mt-15 pb-10">
              <v-bottom-navigation active>
              <v-btn class=" home-switch-btn mt-5 mx-2" :disabled="!btnEnabled" @click="load"><p class="font-weight-bold text-h6">Descobrir</p></v-btn>
              <v-btn class=" home-switch-btn mt-5 mx-2" :disabled="!btnEnabled" @click="loadFollowing"><p class="font-weight-bold text-h6">Seguindo</p></v-btn>
            </v-bottom-navigation>
            </v-layout>
            </div>
            
            <div v-if="showDiscoverytweets">
            <v-infinite-scroll v-if="continueLoading" color="blue" :onLoad="load" :scroll-target="'#scroll-container'">
                  <ListCard :tweets="tweets" :retweets="retweets" />
                </v-infinite-scroll>
              </div>
              
              <div v-if="showFollowingtweets">
             <v-infinite-scroll v-if="continueLoading" color="blue"> <!-- colocar load -->
                  <ListCard :tweets="tweets" :retweets="retweets" :following="true" :test="test"/>
                </v-infinite-scroll>
              </div>

            <div v-if="!continueLoading" >
              <div v-if="showDiscoverytweets">
                <ListCard :tweets="tweets" :retweets="retweets" />
              </div>
              <div v-if="showFollowingtweets">
                <ListCard :tweets="tweets" :retweets="retweets" :following="true" :test="test"/>
              </div>
            </div>


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

<script setup lang="ts">
import SideBar from '@/components/SideBar.vue';
import ListCard from '@/components/ListCard.vue';
import { getUser, showPosts } from '@/services/api';
import type { TweetType } from '@/types/TweetType';
import { onMounted, ref } from 'vue';
import type { UserType } from '@/types';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import ExploreComponent from '@/components/ExploreComponent.vue';

const listenEmit = () => {
  fetchTweets()
};

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
  handleGetUser();
  fetchTweets();
});

</script>

<template>
  <v-container class="h-screen ma-0 pa-0" fluid>
    <v-row>
      <v-col cols="3" class="d-none d-lg-flex">
        <SideBar :item="item" @call-emit="listenEmit" />
      </v-col>
      <v-col cols="12" md="6">
        <ListCard :tweets="tweets"/>
      </v-col>
      <v-col cols="3" class="d-none d-lg-flex">
        <ExploreComponent />
      </v-col>
    </v-row>
    <div class="spinner-div d-flex justify-center mt-5">
      <SpinnerComponent v-if="loadingVisible" color="blue" />
    </div>
  </v-container>
  <!-- <v-layout class="rounded rounded-md">
    <v-navigation-drawer>
      <v-list>
        <v-list-item>
          <SideBar :item="item" @call-emit="listenEmit" />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer location="right">
      <v-list>
        <v-list-item>
          <ExploreComponent />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="min-height: 200px;">
      <ListCard :tweets="tweets"/>
    </v-main>
  </v-layout> -->

  <!-- <div>
    <div class="home-container">
      <div class="home-nav">
        
      </div>
      <div class="home-content">
        <span class="home-content-title">
          <span> Página Inicial </span>
        </span>

        <div class="spinner-div d-flex justify-center mt-5">
          <SpinnerComponent v-if="loadingVisible" color="blue" />
        </div>
        
      </div>
      <ExploreComponent/>
    </div>
  </div> -->
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
</style>

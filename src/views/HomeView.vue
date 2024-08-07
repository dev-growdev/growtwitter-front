<script setup lang="ts">
import SideBar from '@/components/SideBar.vue';
import ListCard from '@/components/ListCard.vue';
import { getUser, showPosts } from '@/services/api';
import type { TweetType } from '@/types/TweetType';
import { onMounted, ref } from 'vue';
import type { UserType } from '@/types';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import ExploreComponent from '@/components/ExploreComponent.vue';

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
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer>
      <v-list>
        <v-list-item>
          <SideBar :item="item" />
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

    <v-main class="d-flex align-center justify-center" style="min-height: 300px">
      <v-list>
        <v-list-item>
          <ListCard :tweets="tweets" />
        </v-list-item>
      </v-list>
    </v-main>
    <div class="spinner-div d-flex justify-center mt-5">
      <SpinnerComponent v-if="loadingVisible" color="blue" />
    </div>

    <v-bottom-navigation :elevation="5">
      <v-btn value="recent">
        <v-icon>mdi-history</v-icon>

        <span>Recent</span>
      </v-btn>

      <v-btn value="favorites">
        <v-icon>mdi-heart</v-icon>

        <span>Favorites</span>
      </v-btn>

      <v-btn value="nearby">
        <v-icon>mdi-map-marker</v-icon>

        <span>Nearby</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>

  <!-- <div class="home-container h-screen">
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="3" class="d-none d-lg-flex">
          <SideBar :item="item" />
        </v-col>

        <v-col cols="12" lg="6">
          <v-row>
            <v-col cols="12" class="border">
              <span>Página Inicial</span>
            </v-col>
            <v-col cols="12" class="border pa-0">
              <ListCard :tweets="tweets" />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" lg="3" class="d-none d-lg-flex">
          <ExploreComponent />
        </v-col>
      </v-row>
    </v-container>

    <div class="spinner-div d-flex justify-center mt-5">
      <SpinnerComponent v-if="loadingVisible" color="blue" />
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

.home-container {
  display: flex;
  width: 100%;
  height: 100%;
  background: #ffffff;
}
</style>

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
  <div class="home-container h-screen">
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="3" class="d-none d-lg-flex">
          <SideBar :item="item" />
        </v-col>

        <v-col cols="12" lg="6">
          <v-row>
            <v-col cols="12">
              <span>Página Inicial</span>
            </v-col>
            <v-col cols="12">
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
</style>

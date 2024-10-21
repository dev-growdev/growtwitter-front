<script setup lang="ts">
import SideBar from '@/components/SideBar.vue';
import { getUser } from '@/services/api';
import { onMounted, ref } from 'vue';
import type { UserType } from '@/types';
import { tempoDesdeCriacao } from '@/utils/PastTime';
import ExploreComponent from '@/components/ExploreComponent.vue';
import { fetchAndProcessWords } from '@/utils/ExploreArray';
import ApplicationBar from '@/components/ApplicationBar.vue';
interface ProcessedItem {
  title: string;
  content: string;
  created_at: string;
}
const item = ref<UserType>();
const items = ref<ProcessedItem[]>([]);
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

onMounted(async () => {
  handleGetUser();
  items.value = await fetchAndProcessWords();
});
</script>

<template>
  <v-app>
    <v-navigation-drawer v-if="!$vuetify.display.mdAndDown" permanent width="455" location="left" class="border-0"
      touchless disable-swipe>
      <SideBar :item="item!" />
    </v-navigation-drawer>

    <ApplicationBar class="d-flex d-lg-none" />

    <v-main class="mx-0 mx-md-4">
      <v-container class="pa-0">
        <v-row class="border px-4 px-md-0">
          <v-col class="mx-2 mt-6">
            <h2>O que está acontecendo?</h2>
          </v-col>
          <v-col cols="12" class="d-flex flex-column border-t py-4" v-for="(item, index) in items" :key="index">
            <p>{{ item.title }} - {{ tempoDesdeCriacao(item.created_at) }}</p>
            <RouterLink :to="`/search?keyword=${item.title}`">
              <h3>{{ item.content }}</h3>
            </RouterLink>
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
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.explore-div {
  margin: 1rem;
  margin-bottom: 1.6rem;
}

.explore-div p {
  font-size: 0.8rem;
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

.home-nav-component {
  width: 90%;
  height: 100%;
  padding: 1em 0 0 1em;
  background-color: black;
}

.home-content {
  width: 55%;
  height: 100%;
  border-right: 2px solid #e9e9e9;
  border-left: 2px solid #e9e9e9;
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

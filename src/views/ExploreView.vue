<script setup lang="ts">
import SideBar from '@/components/SideBar.vue';
import { getUser} from '@/services/api';
import { onMounted, ref } from 'vue';
import type { UserType } from '@/types';
import { tempoDesdeCriacao } from '@/utils/PastTime';
import ExploreComponent from '@/components/ExploreComponent.vue';
import { items } from '@/utils/ExploreArray';

const item = ref<UserType[]>([]);


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

});

</script>

<template>
  <div>
    <div class="home-container">
      <div class="home-nav">
        <SideBar :item="item" />
      </div>
      <div class="home-content">
        <span class="home-content-title">
          <span> Explorar </span>
        </span>

        <div class="explore-div" v-for="(item, index) in items" :key="index">
          <p>{{ item.title }} - {{ tempoDesdeCriacao(item.created_at) }}</p>
          <h4>{{ item.content }}</h4>
        </div>
      </div>

      <ExploreComponent/>

      </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.explore-div{
  margin: 1rem;
  margin-bottom: 1.6rem ;
}

.explore-div p {
  font-size: 0.8rem;
}

.spinner-div{
  position: absolute;
  left: 46%;
  top: 50%
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

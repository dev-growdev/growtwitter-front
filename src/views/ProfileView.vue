<script setup lang="ts">
import MenuApp from '@/components/Menu.vue';
import FooterApp from '@/components/Footer.vue';
import { onMounted, ref } from 'vue';
import { showPostsUser } from '@/services/api';
// import PabloCard from '@/components/PabloCard.vue';

const tweets = ref<TweetType[]>([]);
const user = ref<string>('');

async function show() {
  const response = await showPostsUser();
  console.log(response);

  tweets.value = response.data.data.posts;
  user.value = response.data.data.name;
}

onMounted(() => show());
</script>

<template>
  <MenuApp />
  <main>
    <h1>Tweets de @{{ user }}</h1>
    <div v-for="item in tweets" :key="item.id">
      {{ item.content }}
      <!-- a linha acima é um teste quando possuirmos o PabloCard podemos removê-la! -->
      <!-- <PabloCard :data="item" /> -->
    </div>
  </main>
  <FooterApp />
</template>

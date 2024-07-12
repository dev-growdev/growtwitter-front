<script setup lang="ts">
import MenuApp from '@/components/Menu.vue';
import FooterApp from '@/components/Footer.vue';
import { onMounted, ref } from 'vue';
import { showPostsUser } from '@/services/api';
// import PabloCard from '@/components/PabloCard.vue';

const tweets = ref<TweetType[]>([]);
<<<<<<< HEAD
const user = ref<string>('');
=======
>>>>>>> d633638ebd29555dad0816260f488bc00a265719

async function show() {
  const response = await showPostsUser();
  console.log(response);

<<<<<<< HEAD
  tweets.value = response.data.data.posts;
  user.value = response.data.data.name;
=======
  tweets.value = response.data.data;
>>>>>>> d633638ebd29555dad0816260f488bc00a265719
}

onMounted(() => show());
</script>

<template>
  <MenuApp />
  <main>
<<<<<<< HEAD
    <h1>Tweets de @{{ user }}</h1>
=======
    <h1>Recados do seu Perfil</h1>
>>>>>>> d633638ebd29555dad0816260f488bc00a265719
    <div v-for="item in tweets" :key="item.id">
      {{ item.content }}
      <!-- a linha acima é um teste quando possuirmos o PabloCard podemos removê-la! -->
      <!-- <PabloCard :data="item" /> -->
    </div>
  </main>
  <FooterApp />
</template>

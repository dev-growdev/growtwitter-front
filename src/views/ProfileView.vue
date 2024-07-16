<script setup lang="ts">
import ListCard from '@/components/ListCard.vue';
import { showPosts } from '@/services/api';
import { ref } from 'vue';

const tweets = ref([]);
const endpoint = '/users/';

async function fetchTweets() {
  const response = await showPosts(endpoint);
  tweets.value = response.data.data.posts;
}

fetchTweets();
</script>

<template>
  <div>
    <ListCard :tweets="tweets" />
  </div>
</template>

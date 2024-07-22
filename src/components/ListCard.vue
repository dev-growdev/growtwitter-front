<script setup lang="ts">
import { defineProps } from 'vue';
import type { TweetType } from '@/types';
import CardTweet from './CardTweet.vue';

interface Props {
  tweets: TweetType[];
}

defineProps<Props>();
</script>

<template>
  <div>
    <div class="home-content-card" v-for="tweet in tweets" :key="tweet.id">
      <CardTweet :data="tweet" />
    </div>
  </div>
</template>

<style scoped>
.home-content-card {
  width: auto;
  height: 100%;
  border-bottom: 2px solid #e9e9e9;
  padding: 10px;
}
</style>

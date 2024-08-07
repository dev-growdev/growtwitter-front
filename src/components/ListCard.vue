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
  <v-row>
    <v-col cols="12" class="" v-for="tweet in tweets" :key="tweet.id">
      <CardTweet :data="tweet" />
    </v-col>
  </v-row>
</template>

<!-- <style scoped>
.home-content-card {
  width: auto;
  height: 100%;
  border-bottom: 2px solid #e9e9e9;
  padding: 10px;
  margin: 5px;
}
</style> -->

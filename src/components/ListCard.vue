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
  <div class="pt-4">
    <div v-for="tweet in tweets" :key="tweet.id">
      <CardTweet :data="tweet" />
    </div>
  </div>
</template>

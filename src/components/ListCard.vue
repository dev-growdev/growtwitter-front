<script setup lang="ts">
import { defineProps } from 'vue';
import type { TweetType } from '@/types';
import CardTweet from './CardTweet.vue';

interface Props {
  tweets: TweetType[];
  retweets: TweetType[];
}

defineProps<Props>();
</script>

<template>
  <div class="pt-4">
    <div v-for="tweet in tweets" :key="tweet.id">
      <CardTweet :data="tweet" />

    </div>
    <div v-for="retweet in retweets" :key="retweet.id">
      <CardTweet :data="retweet" />
    </div>
  </div>
</template>

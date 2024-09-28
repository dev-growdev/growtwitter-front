<script setup lang="ts">
import { defineProps, computed } from 'vue';
import type { TweetType } from '@/types';
import CardTweet from './CardTweet.vue';
import CardRetweet from './CardRetweet.vue';

interface Props {
  tweets: TweetType[];
  retweets: any[];
}

// Define e acessa as props
const props = defineProps<Props>();

// Cria uma lista combinada de tweets e retweets, adicionando um campo `type` para diferenciar
const combinedList = computed(() => {
  const formattedTweets = props.tweets.map(tweet => ({
    ...tweet,
    type: 'tweet', // Adiciona um campo 'type' para identificar
    createdAt: new Date(tweet.created_at) // Certifique-se de que `createdAt` seja um objeto Date
  }));

  const formattedRetweets = props.retweets.map(retweet => ({
    ...retweet,
    type: 'retweet',
    createdAt: new Date(retweet.created_at) // Certifique-se de que `createdAt` seja um objeto Date
  }));

  // Combina e ordena por `createdAt`
  return [...formattedTweets, ...formattedRetweets].sort((a, b) => b.createdAt - a.createdAt);
});
</script>

<template>
  <div class="pt-4">
    <div v-for="item in combinedList" :key="item.id">
      <CardRetweet v-if="item.type === 'retweet'" :data="item"
        :tweet="props.tweets.find(tweet => tweet.id == item.postId)" />
      <CardTweet v-else :data="item" />
    </div>
  </div>
</template>

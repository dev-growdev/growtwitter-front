<script setup lang="ts">
import { defineProps, computed } from 'vue';
import type { TweetType } from '@/types';
import CardTweet from './CardTweet.vue';
import CardRetweet from './CardRetweet.vue';
import { useRoute } from 'vue-router';
import type { RetweetType } from '@/types/RetweetType';

interface Props {
  tweets: TweetType[];
  retweets: RetweetType[];
  profile?: boolean;
}

const props = defineProps<Props>();

const combinedList = computed(() => {
  const formattedTweets = props.tweets.map(tweet => ({
    ...tweet,
    type: 'tweet',
    createdAt: new Date(tweet.created_at)
  }));

  const formattedRetweets = props.retweets.map(retweet => ({
    ...retweet,
    type: 'retweet',
    createdAt: new Date(retweet.created_at)
  }));



  return [...formattedTweets, ...formattedRetweets].sort((a, b) => b.createdAt - a.createdAt);
});

const route = useRoute();

const filteredList = computed(() => {
  if (!props.profile) {
    return combinedList.value;
  }
  const filtered = combinedList.value.filter(item => item.userId === Number(route.params.id));

  return filtered;
});
</script>

<template>
  <div class="pt-4">
    <div v-for="item in filteredList" :key="item.id">
      <CardRetweet v-if="item.type === 'retweet'" :data="item"
        :tweet="props.tweets.find(tweet => tweet.id == item.postId)" />
      <CardTweet v-else :data="item" />
    </div>
  </div>
</template>

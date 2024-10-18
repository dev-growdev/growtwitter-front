<script setup lang="ts">
import { defineProps, computed, } from 'vue';
import type { TweetType } from '@/types';
import CardTweet from './CardTweet.vue';
import CardRetweet from './CardRetweet.vue';
import { useRoute } from 'vue-router';

interface Props {
  tweets: TweetType[];
  retweets: any[];
  profile?: boolean;
  following?: boolean;
  followingsList: number[] | "";
}

const props = defineProps<Props>();

const combinedList = computed(() => {
  const formattedTweets = props.tweets.map((tweet) => ({
    ...tweet,
    type: 'tweet',
    createdAt: new Date(tweet.created_at)
  }));

  const formattedRetweets = props.retweets.map((retweet) => ({
    ...retweet,
    type: 'retweet',
    createdAt: new Date(retweet.created_at)
  }));

  return [...formattedTweets, ...formattedRetweets].sort((a, b) => b.createdAt - a.createdAt);
});

const route = useRoute();

const filteredList = computed(() => {
  if (props.profile ) {
    const filtered = combinedList.value.filter(item => item.userId === Number(route.params.id));
    return filtered;
  }
  if (props.following && props.followingsList) {
  let filtered = [];
  
  for (let j = 0; j < props.followingsList.length; j++) {
      filtered.push(...combinedList.value.filter(item => item.user.id === props.followingsList[j]));
  }
  return filtered.sort((a, b) => b.createdAt - a.createdAt);;
}

  return combinedList.value;
});



</script>

<template>
  <div >
    <div v-for="(item, index) in filteredList" :key="index"> 
          <CardRetweet v-if="item.type === 'retweet'" :data="item"
          :tweet="item.post" /> 
          <CardTweet v-if="item.type === 'tweet'" :data="item" />
    </div> 
  </div>
</template>




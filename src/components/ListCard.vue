<script setup lang="ts">
import { defineProps, computed, ref, watch } from 'vue';
import type { TweetType } from '@/types';
import CardTweet from './CardTweet.vue';
import CardRetweet from './CardRetweet.vue';
import { useRoute } from 'vue-router';

interface Props {
  tweets: TweetType[];
  retweets: any[];
  profile?: boolean;
  following?: boolean;
  followingsList: number[] | '';
}

interface Dados {
  id: number;
  isTweet: boolean;
}
const dados = ref<Dados>();

function receber(dadosP: Dados) {
  console.log('recebi pro tweet: ' + dadosP);

  dados.value = dadosP;
}

watch(dados, () => {
  toHome(); //enviando os dados recebidos do cardTweet ou cardRetweet para home.
});

const listToHome = defineEmits(['toListCard']);

function toHome() {
  listToHome('toListCard', dados.value);
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
  if (props.profile) {
    const filtered = combinedList.value.filter((item) => item.userId === Number(route.params.id));
    return filtered;
  }
  if (props.following && props.followingsList) {
    let filtered = [];

    for (let j = 0; j < props.followingsList.length; j++) {
      filtered.push(...combinedList.value.filter((item) => item.user.id === props.followingsList[j]));
    }
    return filtered.sort((a, b) => b.createdAt - a.createdAt);
  }

  return combinedList.value;
});
</script>

<template>
  <div class="pt-4">
    <div v-for="(item, index) in filteredList" :key="index">
      <!-- filteredList.value.length +1 -->
      <CardRetweet v-if="item.type === 'retweet'" :data="item" :tweet="item.post" @to-list-card="receber" />
      <CardTweet v-if="item.type === 'tweet'" :data="item" @to-list-card="receber" />
    </div>
  </div>
</template>

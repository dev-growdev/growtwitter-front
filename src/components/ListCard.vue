<script setup lang="ts">
import { defineProps, computed, ref, watch } from 'vue';
import type { TweetType } from '@/types';
import CardTweet from './CardTweet.vue';
import CardRetweet from './CardRetweet.vue';
import { useRoute } from 'vue-router';
import type { DadosType, DadosRtType } from '@/types/DadosType';

interface Props {
  tweets: TweetType[];
  retweets: any[];
  profile?: boolean;
  following?: boolean;
  followingsList: number[] | '';
}

const listToHome = defineEmits(['toListCard', 'rtListCard']);
const props = defineProps<Props>();
const dados = ref<DadosType>();
const dadosRT = ref<DadosRtType>();
const route = useRoute();

function receiveDelTweet(dadosP: DadosType) {
  dados.value = dadosP;
}

function receiveRT(dadosP: DadosRtType) {
  dadosRT.value = dadosP;
}

function toHome() {
  listToHome('toListCard', dados.value);
}

function rtToHome() {
  listToHome('rtListCard', dadosRT.value);
}

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

watch(dados, () => {
  toHome(); //enviando os dados recebidos do cardTweet ou cardRetweet para home.
});
watch(dadosRT, () => {
  rtToHome(); //enviando os RTs recebidos do cardTweet  para home.
});
</script>

<template>
  <div class="pt-4">
    <div v-for="(item, index) in filteredList" :key="index">
      <!-- filteredList.value.length +1 -->
      <CardRetweet v-if="item.type === 'retweet'" :data="item" :tweet="item.post" @to-list-card="receiveDelTweet" />
      <CardTweet v-if="item.type === 'tweet'" :data="item" @to-list-card="receiveDelTweet" @rt-list-card="receiveRT" />
    </div>
  </div>
</template>

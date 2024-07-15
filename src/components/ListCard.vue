<script setup lang="ts">
import { defineProps } from 'vue';
import { TweetType } from '@/types';

interface Props {
  tweets: TweetType[];
}

defineProps<Props>();
</script>

<template>
  <h1>LITAGEM:</h1>
  <div>
    <div class="home-content-card" v-for="tweet in tweets" :key="tweet.id">
      <div>
        <p>{{ tweet.user_id }}</p>
        <span>{{ tweet.content }}</span>
      </div>
    </div>
    <!-- <PabloCard :data="tweet" /> -->
  </div>
</template>

<style scoped>
.home-content-card {
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
  padding: 2rem;
  border-bottom: 2px solid #e9e9e9;
}
</style>

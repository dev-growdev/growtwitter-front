<script setup lang="ts">
import type { TweetType } from '@/types';
import default_avatar from '@/assets/default-avatar.png';
import { tempoDesdeCriacao } from '@/utils/PastTime';

interface TweetTypeProps {
  data: TweetType;
}

defineProps<TweetTypeProps>();
</script>

<template>
  <div class="container1">
    <div class="container-img">
      <h1></h1>
      <img class="img-avatar" :src="data.user.avatar_url ?? default_avatar" alt="Avatar" />
    </div>
    <div>
      <div class="tweet-identity">
        <p class="nick-name">{{ data.user.name }}</p>
        <p>@{{ data.user.username }}</p>
        <p>{{ tempoDesdeCriacao(data.created_at) }}</p>
      </div>
      <div class="container-content">
        <p class="content-text">{{ data.content }}</p>
      </div>
      <div class="tweet-pop">
        <p>💬</p>
        <div v-if="data.likes.length === 0">
          <p>🤍</p>
        </div>
        <div v-else-if="data.likes.length === 1">
          <p>❤️ 1 like!</p>
        </div>
        <div v-else>
          <p>❤️{{ data.likes.length }} likes!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container1 {
  display: flex;
  width: 100%;
}
p {
  margin: 5px 0;
}

.container-img {
  display: flex;
  align-items: flex-start;
}

.img-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin: 10px;
}

.tweet-identity {
  display: flex;
  flex-direction: row;
  margin-top: 3px;
  gap: 10px;
}

.nick-name {
  font-weight: bold;
  margin-bottom: 0;
}
.tweet-pop {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.content-text {
  margin-bottom: 0.5rem;
}

p {
  margin: 0;
}
</style>

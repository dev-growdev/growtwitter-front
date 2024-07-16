<script setup lang="ts">
import type { TweetType } from '@/types';
import default_avatar from '@/assets/default-avatar.png';

interface TweetTypeProps {
  data: TweetType;
}

defineProps<TweetTypeProps>();
</script>

<template>
  <div class="container1">
    <div>
      <h1></h1>
      <img class="img-avatar" :src="data.user.avatar_url ?? default_avatar" alt="Avatar" />
    </div>
    <div>
      <div class="tweet-identity">
        <p class="nick-name">{{ data.user.username }}</p>
        <p>{{ data.user.name }}</p>
        <!-- <p>{{ data.posted_since }}</p> -->
      </div>
      <div>
        <p>{{ data.content }}</p>
      </div>
      <div class="tweet-pop">
        <p>💬</p>
        <p>🤍{{ data.likes.length > 0 ? data.likes.length : '' }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container1 {
  display: flex;
  border: solid 1px lightgrey;
  margin: auto;
}
p {
  margin: 5px 0;
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
  gap: 10px;
}

.nick-name {
  font-weight: bold;
}
.tweet-pop {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>

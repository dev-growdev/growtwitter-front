<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const imgAvatar = ref<string>('');
const nickname = ref<string>('');
const userName = ref<string>('');
const posted_since = ref<string>('');
const content = ref<string>('');
const coments = ref<string>('');
const likes = ref<string>('');

onMounted(async () => {
  try {
    const response = await axios.get('url');
    imgAvatar.value = response.data.imgAvatar;
    nickname.value = response.data.nickname;
    userName.value = response.data.userName;
    posted_since.value = response.data.posted_since;
    content.value = response.data.content;
    coments.value = response.data.coments;
    likes.value = response.data.likes;
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="container1">
    <div>
      <img class="img-avatar" :src="imgAvatar" alt="Avatar" />
    </div>
    <div>
      <div class="tweet-identity">
        <p class="nick-name">{{ nickname }}</p>
        <p>{{ userName }}</p>
        <p>{{ posted_since }}</p>
      </div>
      <div>
        <p>{{ content }}</p>
      </div>
      <div class="tweet-pop">
        <p>💬{{ coments }}</p>
        <p>🤍{{ likes }}</p>
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

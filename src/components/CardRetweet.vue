<script setup lang="ts">
import type { TweetType } from '@/types';
import default_avatar from '@/assets/default-avatar.png';
import { tempoDesdeCriacao } from '@/utils/PastTime';

import { onMounted, ref } from 'vue';
import CardTweet from './CardTweet.vue';
import { deleteRetweet } from '@/services/api';

interface TweetTypeProps {
  data: any;
  tweet?: TweetType;
}

const props = defineProps<TweetTypeProps>();
props;

onMounted(() => {});

const dropdown = ref(false);

const toggleDropdown = () => {
  dropdown.value = !dropdown.value;
};

const handleDeleteRetweet = async (retweetID: number) => {
  const response = await deleteRetweet(retweetID);
  console.log(response);

  window.location.reload();
};

const idU = Number(sessionStorage.getItem('userId'));
</script>

<template>
  <div class="card-principal rounded-0">
    <v-card-actions class="ga-2">
      <div class="d-block align-self-start">
        <RouterLink :to="`/profile/${data.user.id}`"><v-avatar :to="`/profile/${data.user.id}`" :image="data.user.avatar_url ?? default_avatar" size="50"></v-avatar></RouterLink>
      </div>
      <div class="tweet-body">
        <div class="tweet-header">
          <div>
            <RouterLink :to="`/profile/${data.user.id}`">
              <strong>{{ data.user.name }}</strong> <span>@{{ data.user.username }}</span>
            </RouterLink>

            <span> ·</span> <span>{{ tempoDesdeCriacao(data.created_at) }}</span>
          </div>
          <div style="display: flex; align-items: end; flex-direction: column; position: relative">
            <v-btn v-if="data.user.id === idU" icon small @click="toggleDropdown"> <v-icon icon="mdi-dots-horizontal"></v-icon></v-btn>
            <div v-if="dropdown" class="dropdown">
              <v-btn small @click="handleDeleteRetweet(data.id)"><v-icon icon="mdi-delete"></v-icon>Apagar</v-btn>
            </div>
          </div>
        </div>
        <div>
          <span>{{ data.content }}</span>
          <p class="tweet-content" v-if="tweet">
            <CardTweet :data="tweet" />
          </p>
        </div>
      </div>
    </v-card-actions>
  </div>
</template>

<style scoped>
.card-principal {
  border-top: 1px solid #ebe8e8;
  transition: background-color 0.3s ease;
}

.dropdown {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  border: 1px solid #ebe8e8;
  padding: 10px;
  border-radius: 5px;
  width: max-content;
  z-index: 10;
}

.tweet-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.tweet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.tweet-header strong {
  font-weight: bold;
}

.tweet-header span {
  color: #657786;
  font-size: 14px;
}

.tweet-content {
  overflow-wrap: break-word;
  word-break: break-word;
}

.v-btn {
  text-transform: none !important;
}

.btn-like:hover {
  filter: drop-shadow(1px 1px 1px red);
  color: rgb(135, 0, 0);
}
</style>

<script setup lang="ts">
import type { TweetType } from '@/types';
import default_avatar from '@/assets/default-avatar.png';
import { tempoDesdeCriacao } from '@/utils/PastTime';

import { ref } from 'vue';
import CardTweet from './CardTweet.vue';
import { deleteRetweet } from '@/services/api';
import ModalSeeProfile from '@/components/ModalSeeProfile.vue';

interface TweetTypeProps {
  data: any;
  tweet?: TweetType;
}

const props = defineProps<TweetTypeProps>();

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
    <v-card-actions class="ma-2 ga-2">
      <div class="profileModal d-block align-self-start">
        <RouterLink :to="`/profile/${data.user.id}`">
          <v-avatar :image="data.user.avatar_url ?? default_avatar" size="50"></v-avatar>
        </RouterLink>
        <ModalSeeProfile class="profileModalChild" style="z-index: 9999" :data="props.data.user" />
      </div>
      <div class="tweet-body">
        <div class="tweet-header">
          <div>
            <div>
              <RouterLink :to="`/profile/${data.user.id}`">
                <strong class="mouseHover">{{ data.user.name }}</strong> <span>@{{ data.user.username }}</span>
              </RouterLink>
              <span> ·</span> <span>{{ tempoDesdeCriacao(data.created_at) }}</span>
              <p class="tweet-content">{{ data.content }}</p>
            </div>
          </div>
          <div style="display: flex; align-items: end; flex-direction: column; position: relative">
            <v-btn v-if="data.user.id === idU" icon small @click="toggleDropdown"> <v-icon icon="mdi-dots-horizontal"></v-icon></v-btn>
            <div v-if="dropdown" class="dropdown">
              <v-btn small @click="handleDeleteRetweet(data.id)"><v-icon icon="mdi-delete"></v-icon>Apagar</v-btn>
            </div>
          </div>
        </div>
        <div>
          <p class="tweet-content" v-if="tweet">
            <CardTweet :data="tweet" />
          </p>
        </div>
      </div>
    </v-card-actions>
  </div>
</template>

<style scoped>
.profileModalChild {
  display: none;
}

.profileModal:hover .profileModalChild {
  display: flex;
}

.card-principal {
  border-top: 1px solid #ebe8e8;
  transition: background-color 0.3s ease;
}

.mouseHover {
  transition: all 0.2s ease;
}

.mouseHover:hover {
  text-decoration: underline;
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

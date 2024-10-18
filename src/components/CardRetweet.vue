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

const reTweetDrop = ref(false);
const userID = Number(sessionStorage.getItem('userId'));

const props = defineProps<TweetTypeProps>();
const cardToList = defineEmits(['toListCard']);

const toggleReTweetDrop = () => {
  reTweetDrop.value = !reTweetDrop.value;
};

const handleDeleteReTweet = async (reTweetID: number) => {
  await deleteRetweet(reTweetID);
  toList(reTweetID, false);
  toggleReTweetDrop();
};

function toList(id: number, isTweet: boolean) {
  cardToList('toListCard', {
    id,
    isTweet
  });
}
</script>

<template>
  <div class="card-principal rounded-0">
    <v-card-actions class="ga-2">
      <div class="profileModal d-block align-self-start">
        <RouterLink :to="`/profile/${data.user.id}`">
          <v-avatar :image="data.user.avatar_url ?? default_avatar" size="50"></v-avatar>
        </RouterLink>
        <ModalSeeProfile class="profileModalChild" style="z-index: 9999" :data="props.data.user" />
      </div>
      <div class="tweet-body">
        <div class="tweet-header">
          <div>
            <RouterLink :to="`/profile/${data.user.id}`">
              <strong class="mouseHover">{{ data.user.name }}</strong> <span style="color: #657786">@{{ data.user.username }}</span>
            </RouterLink>
            <span> ·</span> <span>{{ tempoDesdeCriacao(data.created_at) }}</span>
            <p class="tweet-content">{{ data.content }}</p>
          </div>

          
          <div class="d-flex align-end flex-column position-relative">
            <v-btn @click="toggleReTweetDrop" icon="mdi-dots-vertical"></v-btn>
            <div v-if="reTweetDrop" class="delTweet">
              <v-btn v-if="userID === data.user.id" @click="handleDeleteReTweet(data.id)">Apagar</v-btn>
              <v-btn v-else>Denunciar</v-btn>
            </div>
          </div>
        </div>
        <div>
          <p class="tweet-content" v-if="tweet">
            <CardTweet :data="tweet" :isaReTweet="true" />
          </p>
          <div v-else class="d-flex justify-center w-100">
            <p class="bg-blue-lighten-5 pa-5 w-75 d-flex justify-center rounded-lg">Esse tweet foi excluido pelo autor.</p>
          </div>
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

.delTweet {
  text-transform: none !important;
  background-color: #026eda;
  display: flex;
  flex-direction: column;
  top: 50px;
  right: 0px;
  position: absolute;
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

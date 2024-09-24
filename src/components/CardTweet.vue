<script setup lang="ts">
import type { TweetType } from '@/types';
import default_avatar from '@/assets/default-avatar.png';
import { tempoDesdeCriacao } from '@/utils/PastTime';
import { postLike } from '@/services/api';
import { onMounted, ref } from 'vue';

interface TweetTypeProps {
  data: TweetType;
}

const props = defineProps<TweetTypeProps>();
const liked = ref(false);
const artificialLike = ref(0);

function like() {
  if (liked.value === false) {
    artificialLike.value++;
    liked.value = true;
  } else {
    artificialLike.value--;
    liked.value = false;
  }
}

async function handlePostLike(id: number) {
  like();
  let resp = await postLike(id);
  if (!resp) {
    like(); //desfazer o like do front se não der 200!!
  }
}

onMounted(() => {
  liked.value = props.data.likes.some(
    (like: any) => like.userId == sessionStorage.getItem('userId')
  );
});
</script>

<template>
  <div class="card-principal rounded-0">
    <v-card-actions class="ga-2">
      <div class="d-block align-self-start">
        <RouterLink :to="`/profile/${data.user.id}`">
          <v-avatar :image="data.user.avatar_url ?? default_avatar" size="50"></v-avatar>
        </RouterLink>

      </div>
      <div class="d-block">
        <div class="tweet-header">
          <RouterLink :to="`/profile/${data.user.id}`">
            <strong>{{ data.user.name }}</strong> <span>@{{ data.user.username }}</span>
          </RouterLink>

          <span> ·</span> <span>{{ tempoDesdeCriacao(data.created_at) }}</span>
        </div>
        <p class="tweet-content">{{ data.content }}</p>
        <div class="tweet-actions">
          <v-btn icon small>💬</v-btn>
          <v-btn icon small class="btn-like" @click="handlePostLike(data.id)">
            {{ data.likes_count + artificialLike ? '❤️' : '🤍' }}
            {{ data.likes_count + artificialLike }}
          </v-btn>
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

.card-principal:hover {
  background-color: #f5f8fa;
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

<script setup lang="ts">
import type { TweetType } from '@/types';
import default_avatar from '@/assets/default-avatar.png';
import { tempoDesdeCriacao } from '@/utils/PastTime';
import { postLike } from '@/services/api';
import { ref } from 'vue';

interface TweetTypeProps {
  data: TweetType;
}

defineProps<TweetTypeProps>();

let updateKey = ref(0);

async function handlePostLike(id: number) {
  await postLike(id);
  updateKey.value++;

  // closeModal();
}
</script>

<template>
  <v-card class="text-white mx-auto pa-0" color="blue" max-width="37.5rem">
    <v-card-actions>
      <v-row align="start" justify="center" class="w-100">
        <!-- Coluna para a imagem do avatar -->
        <v-col cols="auto">
          <v-avatar
            class="ma-5"
            :image="data.user.avatar_url ?? default_avatar"
            size="70"
          ></v-avatar>
        </v-col>

        <!-- Coluna para o nome do usuário, username e conteúdo -->
        <v-col>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="mt-3">{{ data.user.name }}</v-list-item-title>
              <v-list-item-subtitle>
                @{{ data.user.username }} · {{ tempoDesdeCriacao(data.created_at) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-text class="text-h5 py-3 mr-3">
            {{ data.content }}
          </v-card-text>

          <div class="d-flex align-items-center justify-content-start">
            <span class="mb-3">💬</span>
            <div v-if="data.likes_count === 0">
              <p>🤍</p>
            </div>
            <div v-else-if="data.likes_count === 1">
              <p>❤️ 1 like!</p>
            </div>
            <div v-else>
              <p>❤️{{ data.likes_count }} likes!</p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.v-card-text {
  padding: 0;
}
.v-list-item {
  padding: 0;
}
</style>

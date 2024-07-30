<script setup lang="ts">
import type { TweetType } from '@/types';
import default_avatar from '@/assets/default-avatar.png';
import { tempoDesdeCriacao } from '@/utils/PastTime';
import { postLike } from '@/services/api';
import { onMounted, ref } from 'vue';

interface TweetTypeProps {
  data: TweetType;
}

defineProps<TweetTypeProps>();

// const props = defineProps<TweetTypeProps>();
// const liked = ref(false)

const artificialLike = ref(0);

async function handlePostLike(id: number) {
  artificialLike.value = artificialLike.value === 0 ? 1 : 0;
  await postLike(id);
}

const toggleValue = () => {};

// onMounted(() => {
//   liked.value = props.likes.some((like: any) => like.userId == sessionStorage.getItem('userId'))
// })
</script>

<template>
  <v-card class="text-white mx-auto pa-0" color="blue" max-width="37.5rem">
    <v-card-actions>
      <v-row align="start" justify="center" class="w-100">
        <v-col cols="auto">
          <v-avatar
            class="ma-5"
            :image="data.user.avatar_url ?? default_avatar"
            size="70"
          ></v-avatar>
        </v-col>

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
            <div v-if="data.likes.length === 0">
              <v-btn @click="toggleValue(), handlePostLike(data.id)">
                {{ artificialLike === 0 ? '🤍' : '❤️' }} {{ artificialLike }}
                {{ artificialLike !== 0 ? 'Like!' : '' }}
              </v-btn>
            </div>
            <div v-else-if="data.likes.length === 1">
              <v-btn @click="toggleValue(), handlePostLike(data.id)"
                >❤️ {{ data.likes.length + artificialLike }}
                {{ data.likes.length + artificialLike === 1 ? 'Like!' : 'Likes!' }}</v-btn
              >
            </div>
            <div v-else>
              <!-- <v-btn @click="handlePostLike(data.id)">❤️{{ data.likes.length }} likes!</v-btn> -->
              <v-btn @click="toggleValue(), handlePostLike(data.id)"
                >❤️{{ data.likes.length + artificialLike }} Likes!</v-btn
              >
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
*/

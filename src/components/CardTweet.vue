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

async function handlePostLike(id: number) {
  console.log(liked);
  console.log(props.data.likes);

  if (liked.value === false) {
    artificialLike.value++;
    liked.value = true;
  } else {
    artificialLike.value--;
    liked.value = false;
  }
  await postLike(id);
}

onMounted(() => {
  liked.value = props.data.likes.some(
    (like: any) => like.userId == sessionStorage.getItem('userId')
  );
});
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
            <v-btn class="mb-3">💬</v-btn>
            <div v-if="data.likes_count === 0">
              <v-btn @click="handlePostLike(data.id)">
                {{ artificialLike === 0 ? '🤍' : '❤️' }} {{ artificialLike }}
                {{ artificialLike !== 0 ? 'Like!' : '' }}
              </v-btn>
            </div>
            <div v-else-if="data.likes_count === 1">
              <v-btn @click="handlePostLike(data.id)"
                >❤️ {{ data.likes_count + artificialLike }}
                {{ data.likes_count + artificialLike === 1 ? 'Like!' : 'Likes!' }}</v-btn
              >
            </div>
            <div v-else>
              <v-btn @click="handlePostLike(data.id)"
                >❤️{{ data.likes_count + artificialLike }} Likes!</v-btn
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

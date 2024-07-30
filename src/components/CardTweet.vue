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
            <v-btn @click="handlePostLike(data.id)">
              {{ data.likes_count + artificialLike ? '❤️' : '🤍' }}
              {{ data.likes_count + artificialLike }}
              {{ 'Like' + (data.likes_count + artificialLike > 1 ? 's' : '') + '!' }}
            </v-btn>
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
.v-btn {
  text-transform: none !important;
}
</style>
*/

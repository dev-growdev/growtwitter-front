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
  <v-card class="card-principal rounded-0 border-b-md">
    <v-card-actions>
      <v-row>
        <v-col cols="2">
          <v-avatar
            class="d-block ma-6 rounded-circle"
            :image="data.user.avatar_url ?? default_avatar"
            size="60"
          ></v-avatar>
        </v-col>

        <v-col cols="10">
          <v-list-item>
            <h3 class="mt-3">{{ data.user.name }}</h3>
            <v-list-item-content class="d-block d-md-flex">
              <v-list-item-subtitle> @{{ data.user.username }} - </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ tempoDesdeCriacao(data.created_at) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-text class="text-h5 py-3">
            {{ data.content }}
          </v-card-text>

          <div class="d-flex align-items-center justify-content-start">
            <v-btn class="mb-3">💬</v-btn>
            <v-btn class="btn-like" @click="handlePostLike(data.id)">
              <div class="heart-like">
                {{ data.likes_count + artificialLike ? '❤️' : '🤍' }}
              </div>
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
.card-principal:hover {
  background-color: #e0e0e0;
}

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

.btn-like:hover {
  filter: drop-shadow(1px 1px 1px red);
  color: rgb(135, 0, 0);
}
</style>
*/

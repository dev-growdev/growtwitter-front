<script setup lang="ts">
import { ref } from 'vue';
import type { UserType } from '../types/UserType';
import default_avatar from '@/assets/default-avatar.png';
import { postFollow } from '@/services/api';
import { RouterLink } from 'vue-router';

interface ModalTypeProps {
  data: UserType;
}

const props = defineProps<ModalTypeProps>();
const btnLoading = ref<boolean>(false);
const isFollowing = ref<boolean>(false);

const myUserData = JSON.parse(localStorage.getItem('userData') || '""');

let itsMe = myUserData.id != props.data.id;

async function handleFollow() {
  try {
    btnLoading.value = true;

    if (itsMe) {
      const response = await postFollow(String(props.data.id), myUserData.id);

      if (response.data.msg === 'Seguido com sucesso') {
        isFollowing.value = true;
      }
      if (response.data.msg === 'Deixou de seguir') {
        isFollowing.value = false;
      }

      if (response.data.msg === 'Falha') {
        isFollowing.value = true;
      }
      btnLoading.value = false;
    }
  } catch {
    console.log({ success: false, msg: 'Não foi possível seguir o usuário' });
  }
}
</script>

<template>
  <div class="flex flex-col align-end position-relative">
    <section class="d-flex flex-row justify-space-between position-absolute bg-grey-lighten-4 ga-2 pa-4 rounded-lg dropdown" style="min-width: 220px; max-width: 300px">
      <article class="d-block align-start">
        <RouterLink :to="`/profile/${data.id}`"><v-avatar :image="data.avatar_url ?? default_avatar" size="75"></v-avatar></RouterLink>

        <div>
          <RouterLink :to="`/profile/${props.data.id}`" class="text-blue-darken-1 font-weight-bold text-h6" v-if="itsMe">
            {{ props.data.name }}
          </RouterLink>
          <RouterLink :to="`/profile/${props.data.id}`" class="text-blue-darken-1 font-weight-bold text-h6" v-if="!itsMe">
            {{ props.data.name }}
            <span class="text-grey-darken-1 text-subtitle-2 font-weight-regular">(Você)</span>
          </RouterLink>
        </div>
        <span class="text-grey-darken-1 font-weight-regular">@{{ props.data.username }}</span>
      </article>
      <article class="d-flex justify-center align-top">
        <v-btn id="followingSpan" v-if="data.id !== myUserData.id" :loading="btnLoading" class="bg-black rounded-xl" height="32" @click="handleFollow()">
          {{ isFollowing ? 'Seguindo' : 'Seguir' }}
        </v-btn>
      </article>
    </section>
  </div>
</template>

<style scoped>
section {
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.dropdown {
  top: 0;
  left: -140%;
  max-width: 300px;
  min-width: 225px;
  z-index: 999;
}

#followingSpan {
  font-size: small;
  font-weight: 600;
}
</style>

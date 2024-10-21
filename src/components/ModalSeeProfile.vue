<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { UserType } from '../types/UserType';
import default_avatar from '@/assets/default-avatar.png';
import { postFollow } from '@/services/api';
import { RouterLink } from 'vue-router';

interface ModalTypeProps {
  data: Partial<UserType>;
}

const props = defineProps<ModalTypeProps>();
const btnLoading = ref<boolean>(false);
const isFollowing = ref<boolean>(false);

const myUserData = JSON.parse(localStorage.getItem('userData') || '""');

let itsMe = myUserData.id != props.data.id;

async function handleFollow() {
  try {
    if (itsMe) {
      btnLoading.value = true;
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

onMounted(() => {
  if (props.data.followers) {
    if (props.data.followers.some((follower: any) => follower.followerId === myUserData.id)) {
      isFollowing.value = true;
    }
  }
});
</script>

<template>
  <div class="mainDiv flex flex-col align-end position-relative">
    <section class="d-flex flex-column justify-space-between position-absolute bg-grey-lighten-5 ga-2 pa-4 rounded-lg dropdown" style="min-width: 320px; max-width: 380px" role="region"
    aria-labelledby="profileSectionTitle">
      <div>
        <article class="d-block align-start">
          <div class="d-flex justify-space-between align-center">
            <RouterLink :to="`/profile/${data.id}`"  aria-label="Profile of {{ data.name }}">
              <v-avatar :image="data.avatar_url ?? default_avatar" size="75" role="img" aria-label="User avatar" />
            </RouterLink>
            <v-btn
              id="followingSpan"
              v-if="data.id !== myUserData.id && isFollowing === true"
              :loading="btnLoading"
              class="followingBtn rounded-xl justify-self-center"
              height="32"
              @click="handleFollow()" aria-label="Unfollow {{ data.name }}"
            >
              Seguindo
            </v-btn>
            <v-btn
              id="followingSpan"
              v-if="data.id !== myUserData.id && isFollowing === false"
              :loading="btnLoading"
              class="followBtn rounded-xl justify-self-center"
              height="40"
              width="80"
              @click="handleFollow()"
               aria-label="Follow {{ data.name }}"
            >
              Seguir
            </v-btn>
          </div>

          <div class="d-flex flex-column mt-2">
            <RouterLink :to="`/profile/${props.data.id}`" class="text-grey-darken-4 font-weight-bold text-h6" v-if="itsMe"
            aria-label="Profile of {{ props.data.name }}">
              {{ props.data.name }}
            </RouterLink>
            <RouterLink :to="`/profile/${props.data.id}`" class="text-grey-darken-4 font-weight-bold text-h6" v-if="!itsMe"  aria-label="Profile of {{ props.data.name }} (You)">
              {{ props.data.name }}
              <span class="text-grey-darken-1 text-subtitle-2 font-weight-regular">(Você)</span>
            </RouterLink>
            <RouterLink :to="`/profile/${props.data.id}`"    aria-label="Username of {{ props.data.name }}">
              <span class="text-grey-darken-1 font-weight-regular">@{{ props.data.username }}</span>
            </RouterLink>
          </div>
        </article>
      </div>

      <div>
        <article class="d-flex justify-start ga-6" role="presentation">
          <p v-if="props.data.followers" aria-label="Followers count">
            <span class="font-weight-bold">
              {{ props.data.followers?.length }}
            </span>
            Seguidores
          </p>
          <p v-if="props.data.followings" aria-label="Following count">
            <span class="font-weight-bold">
              {{ props.data.followings?.length }}
            </span>
            Seguindo
          </p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
section {
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.followingBtn {
  background-color: black;
  color: white;
}

.followingBtn:hover {
  background-color: red;
}

.followBtn {
  background-color: #2196f3;
  color: white;
}

.followBtn:hover {
  background-color: #2182d1;
}

.dropdown {
  top: 0;
  left: -25%;
  max-width: 300px;
  min-width: 225px;
}

#followingSpan {
  font-size: small;
  font-weight: 600;
}
</style>

<script setup lang="ts">
import growtwitterLogo from '@/components/icons/growtwitterLogo.vue';
import homePageLogo from '@/components/icons/homePageLogo.vue';
import ProfileLogo from '@/components/icons/profileLogo.vue';
import HashTag from '@/components/icons/hashTagLogo.vue';
import { ref } from 'vue';
import { logout } from '@/services/api';
import router from '@/router';
import { resetStorage } from '@/services/authentication';
import type { UserType } from '@/types';
import ButtonDefault from '@/components/ButtonDefault.vue';
import ButtonTweet from './ButtonTweet.vue';

const emit = defineEmits(['callEmit']);

interface SidebarProps {
  item: Partial<UserType>;
}
const handleEmit = () => {
  emit('callEmit');
};

defineProps<SidebarProps>();

const spinnerLoading = ref<boolean>(false);

async function handleLogout() {
  spinnerLoading.value = true;
  const response = await logout();
  if (response.status === 200) {
    spinnerLoading.value = false;
    resetStorage();
    router.push('/login');
  } else if (response.status === 400) {
    spinnerLoading.value = false;
    alert('Falha ao deslogar.');
  } else {
    spinnerLoading.value = false;
    alert('Ocorreu um erro entre em contato com o suporte.');
  }
}
</script>

<template>
  <div class="d-flex flex-column justify-space-between h-screen px-2 py-4 pr-5">
    <div class="d-flex justify-end">
      <v-list class="d-flex flex-column">
        <div class="d-flex align-center mb-4" style="margin-left: 12px">
          <growtwitterLogo height="50px" width="200px" aria-label="Growtwitter logo" />
        </div>
        <RouterLink to="/" class="router-icon text-black font-weight-semibold text-h6 d-flex align-center ga-2" aria-label="Home">
          <homePageLogo class="img-icon" />
          Página inicial
        </RouterLink>

        <RouterLink to="/explore" class="router-icon text-black font-weight-semibold text-h6 pt-1 d-flex align-center ga-2" aria-label="Explore">
          <HashTag class="img-icon" />
          Explorar
        </RouterLink>

        <RouterLink :to="`/profile/${item.id}`" class="router-icon text-black font-weight-semibold text-h6 pt-2 d-flex align-center ga-2" aria-label="Profile">
          <ProfileLogo class="img-icon" />
          Perfil
        </RouterLink>
        <div class="d-flex align-center ga-0 mt-2" style="margin-left: 8px">
          <ButtonTweet @add-tweet="handleEmit"  aria-label="Tweet" />
        </div>
      </v-list>
    </div>
    <div>
      <v-list class="d-flex align-center justify-end ga-4">
        <v-img max-width="50" class="rounded-circle" :src="item.avatar_url" aria-label="User avatar"> </v-img>

        <div>
          {{ item.name && item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name }}
          <p class="text-black">@{{ item.username }}</p>
        </div>

        <div>
          <ButtonDefault @click="handleLogout" aria-label="Logout">
            <p v-if="!spinnerLoading">Sair</p>
            <v-progress-circular size="20" v-if="spinnerLoading" indeterminate aria-label="Loading" />
          </ButtonDefault>
        </div>
      </v-list>
    </div>
  </div>
</template>

<style scoped>
.router-icon {
  padding: 10px 12px;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.router-icon:hover {
  background-color: rgb(240, 240, 240);
}

.img-icon {
  max-width: 2.6vh;
  max-height: 3vh;
}
</style>

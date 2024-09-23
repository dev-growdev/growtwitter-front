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
  item: UserType;
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
  <div class="d-flex flex-column justify-space-between h-screen px-2 py-4">
    <div class="d-flex justify-end">
      <v-list class="d-flex flex-column ga-2">
        <div class="d-flex align-center">
          <growtwitterLogo height="50px" width="200px" />
        </div>
        <div class="d-flex align-center ga-2">
          <homePageLogo class="img-icon" />
          <RouterLink to="/" class="text-black font-weight-semibold text-h6">
            Página inicial
          </RouterLink>
        </div>
        <div class="d-flex align-center ga-2">
          <HashTag class="img-icon" />
          <RouterLink to="/explore" class="text-black font-weight-semibold text-h6 pt-1">
            Explorar
          </RouterLink>
        </div>
        <div class="d-flex align-center ga-2">
          <ProfileLogo class="img-icon" />
          <RouterLink to="/profile" class="text-black font-weight-semibold text-h6 pt-2">
            Perfil
          </RouterLink>
        </div>
        <div class="d-flex align-center ga-0">
          <ButtonTweet @add-tweet="handleEmit" />
        </div>
      </v-list>
    </div>
    <div>
      <v-list class="d-flex align-center justify-end ga-4">
        <v-img max-width="50" class="rounded-circle" :src="item.avatar_url"> </v-img>

        <div>
          <p class="text-black">{{ item.name }}</p>
          <p class="text-black">@{{ item.username }}</p>
        </div>

        <div>
          <ButtonDefault @click="handleLogout">
            <p v-if="!spinnerLoading">Sair</p>
            <v-progress-circular size="20" v-if="spinnerLoading" indeterminate />
          </ButtonDefault>
        </div>
      </v-list>
    </div>
  </div>
</template>

<style scoped>
.img-icon {
  max-width: 2.6vh;
  max-height: 3vh;
}
</style>

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
  <v-container class="d-flex h-100">
    <v-row class="">
      <v-col cols="12" lg="12" class="d-flex flex-column align-center align-self-start">
        <growtwitterLogo class="w-66" />
        <v-list class="nav-links">
          <v-list-item
            ><RouterLink to="/"
              ><homePageLogo class="img-icon" /> Página inicial</RouterLink
            ></v-list-item
          >
          <v-list-item
            ><RouterLink to="/explore"
              ><HashTag class="img-icon" /> Explorar</RouterLink
            ></v-list-item
          >
          <v-list-item
            ><RouterLink to="/profile"
              ><ProfileLogo class="img-icon" /> Perfil</RouterLink
            ></v-list-item
          >
        </v-list>

        <ButtonTweet class="w-50" @add-tweet="handleEmit" />
      </v-col>
      <v-col cols="12" lg="12" class="d-flex align-center justify-center ga-5 align-self-end">
        <v-img max-width="70" class="rounded-circle img-perfil" :src="item.avatar_url"> </v-img>
        <div>
          <p class="text-black">{{ item.name }}</p>
          <p class="text-black">@{{ item.username }}</p>
        </div>

        <ButtonDefault class="logout-btn mr-2" @click="handleLogout"
          ><p v-if="!spinnerLoading">Sair</p>
          <v-progress-circular
            class="spinner"
            v-if="spinnerLoading"
            indeterminate
          ></v-progress-circular>
        </ButtonDefault>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.img-icon {
  width: 20px;
  height: 20px;
}

.nav-links {
  width: 60%;
}
</style>

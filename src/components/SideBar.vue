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
  <v-row class="h-screen position-fixed ma-0 pa-0 top-0 left-0 responsivity-force">
    <v-col cols="12" class="d-flex flex-column mx-12 align-self-start">
      <growtwitterLogo />
      <v-list>
        <v-list-item>
          <RouterLink to="/">
            <homePageLogo class="img-icon" />
            Página inicial
          </RouterLink>
        </v-list-item>
        <v-list-item
          ><RouterLink to="/explore">
            <HashTag class="img-icon" />
            Explorar
          </RouterLink>
        </v-list-item>
        <v-list-item
          ><RouterLink to="/profile">
            <ProfileLogo class="img-icon" />
            Perfil
          </RouterLink>
        </v-list-item>
      </v-list>

      <ButtonTweet @add-tweet="handleEmit" />
    </v-col>
    <v-col cols="12" class="d-flex align-center align-self-end mx-12 ga-2">
      <v-img max-width="50" class="rounded-circle" :src="item.avatar_url"> </v-img>
      <div>
        <p class="text-black">{{ item.name }}</p>
        <p class="text-black">@{{ item.username }}</p>
      </div>

      <ButtonDefault class="" @click="handleLogout"
        ><p v-if="!spinnerLoading">Sair</p>
        <v-progress-circular
          class="spinner"
          v-if="spinnerLoading"
          indeterminate
        ></v-progress-circular>
      </ButtonDefault>
    </v-col>
  </v-row>
</template>

<!-- Isto não sei como, mas funciona, não questione, apenas aceite! -->
<style scoped>
.img-icon {
  max-height: 3.375vh;
}

.responsivity-force {
  width: 16vw;
}
</style>

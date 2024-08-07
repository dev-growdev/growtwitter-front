<script setup lang="ts">
import growtwitterLogo from '@/components/icons/growtwitterLogo.vue';
import homePageLogo from '@/components/icons/homePageLogo.vue';
import defaultAvatar from '@/assets/default-avatar.png';
import ProfileLogo from '@/components/icons/profileLogo.vue';
import HashTag from '@/components/icons/hashTagLogo.vue';
import { onMounted, reactive, ref } from 'vue';
import { getUser, logout } from '@/services/api';
import router from '@/router';
import { resetStorage } from '@/services/authentication';
import type { UserType, CreateAccountType } from '@/types';
import ButtonDefault from '@/components/ButtonDefault.vue';
import ButtonTweet from './ButtonTweet.vue';

const emit = defineEmits(['callEmit'])

interface SidebarProps {
  item: UserType;
}
const handleEmit = () => {
  emit('callEmit');
}


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
onMounted(() => {
  handleGetUser();
});
</script>

<template>
  <div class="container-nav position-fixed">
    <div class="content">
      <div class="menu">
        <div><growtwitterLogo /></div>
        <div class="icon-container">
          <div class="icon">
            <div>
              <homePageLogo class="icon-img" /> <RouterLink to="/">Página inicial</RouterLink>
            </div>
          </div>
          <div class="icon">
            <div><HashTag class="icon-img" /><RouterLink to="/explore">Explorar</RouterLink></div>
          </div>
          <div class="icon">
            <div><ProfileLogo class="icon-img" /><RouterLink to="/profile">Perfil</RouterLink></div>
          </div>
        </div>
        <div class="sideBtn">
          <ButtonTweet @add-tweet="handleEmit"/>
        </div>
      </div>

      <div class="perfil-container">
        <div class="perfil-content">
          <div class="perfil-img"><img :src="item.avatar_url" alt="profile-img" /></div>
          <div class="perfil-text">
            <div class="name">{{ item.name }}</div>
            <div class="name-hash">@{{ item.username }}</div>
          </div>
          <div class="perfil-button-container">
            <ButtonDefault class="logout-btn mr-2" @click="handleLogout"
              ><p v-if="!spinnerLoading">Sair</p>
              <v-progress-circular
                class="spinner"
                v-if="spinnerLoading"
                indeterminate
              ></v-progress-circular>
            </ButtonDefault>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-nav {
  margin-top: 2%;
  display: flex;
  height: 100%;
}

.name {
  overflow: hidden;
  width: 1%;
}

.logout-btn {
  width: 3.3rem;
  height: 2.5rem;
  margin-left: 3rem;
}

.spinner {
  height: 1.5rem;
}

li {
  list-style-type: none;
}
ul {
  padding: 0;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5%;
}

.icon-container {
  display: flex;
  flex-direction: column;
}
.icon {
  color: black;
  margin-bottom: 4%;
}
.icon-img {
  width: 8%;
}

.icon > div {
  gap: 5%;
  display: flex;
  align-items: center;
}
.sideBtn {
  width: 60%;
}

.perfil-container {
  width: 100%;
  margin-bottom: 20%;
  margin-left: -2.5rem;
}

.perfil-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 4%;
}

.perfil-img {
  width: 20%;
}
.perfil-img > img {
  width: 100%;
  border-radius: 100%;
}

.perfil-text {
  width: 40%;
  color: black;
}

.name-hash {
  font-size: 1rem;
  color: black;
  overflow: hidden;
  width: 10.5rem;
}
.perfil-button-container {
  display: block;
  width: 20%;
}

#loading-logout {
  background-color: transparent;
  backdrop-filter: none;
  left: 0;
}

@media screen and (max-width: 1500px) {
  .name-hash {
    font-size: 0.5rem;
  }
}
@media screen and (max-width: 1000px) {
  .name-hash {
    font-size: 0.5rem;
  }

  .perfil-content {
    flex-direction: column;
    justify-content: center;
  }

  .perfil-img {
    width: 60%;
  }
  .perfil-text {
    width: 70%;
  }
  .perfil-button-container {
    width: 70%;
  }
}
</style>

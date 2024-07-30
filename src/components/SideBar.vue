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
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import BackgroundOverlay from './BackgroundOverlay.vue';

interface SidebarProps {
  item: UserType;
}

defineProps<SidebarProps>();

const spinnerLoading = ref<boolean>(false);
const backgrounOverlay = ref<boolean>(false);

async function handleLogout() {
  backgrounOverlay.value = true;
  const response = await logout();
  if (response.status === 200) {
    backgrounOverlay.value = false;
    resetStorage();
    router.push('/login');
  } else if (response.status === 400) {
    backgrounOverlay.value = false;
    alert('Falha ao deslogar.');
  } else {
    backgrounOverlay.value = false;
    alert('Ocorreu um erro entre em contato com o suporte.');
  }
}
</script>

<template>
  <BackgroundOverlay v-if="backgrounOverlay">
    <SpinnerComponent id="loading-logout" v-if="backgrounOverlay" color="white" />
  </BackgroundOverlay>
  <SpinnerComponent id="loading-logout" v-if="spinnerLoading" color="blue" />
  <div class="container-nav">
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
          <ButtonTweet />
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
            <ButtonDefault class="perfil-button" @click="handleLogout">Sair</ButtonDefault>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
li {
  list-style-type: none;
}
ul {
  padding: 0;
}
.container-nav {
  padding-top: 10%;
  padding-left: 20%;
  width: 100%;
  height: 100%;
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu {
  display: flex;
  flex-direction: column;
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
  padding-bottom: 10%;
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
  color: rgba(0, 0, 0, 0.884);
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

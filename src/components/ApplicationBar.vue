<script setup lang="ts">
import { useRouter } from 'vue-router';
import { logout } from '@/services/api';
import { resetStorage } from '@/services/authentication';

const userId = sessionStorage.getItem('userId');

const router = useRouter();
async function handleLogout() {

  const response = await logout();

  if (response) {
    resetStorage();
    router.push('/login');
  }



}

</script>

<template>

  <v-bottom-navigation mode="shift">
    <v-btn to="/">
      <v-icon>mdi-home</v-icon>
      <span>Home</span>
    </v-btn>


    <v-btn to="/explore">
      <v-icon>mdi-pound</v-icon>

      <span>Explorar</span>
    </v-btn>

    <v-btn :to="`/profile/${userId}`">
      <v-icon>mdi-account</v-icon>

      <span>Perfil</span>
    </v-btn>

    <v-btn @click="handleLogout">
      <v-icon>mdi-logout</v-icon>

      <span>Logout</span>
    </v-btn>
  </v-bottom-navigation>

</template>

<style scoped></style>

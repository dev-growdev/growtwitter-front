<script setup lang="ts">
import MenuApp from '@/components/Menu.vue';
import FooterApp from '@/components/Footer.vue';
import TheWelcome from '../components/TheWelcome.vue';
import type CardTweet from '@/components/CardTweet.vue';
</script>

<template>
  <MenuApp />
  <main>
    <TheWelcome />
    <CardTweet />
  </main>
  <FooterApp />
</template>

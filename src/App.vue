<script setup lang="ts">
import { RouterView } from 'vue-router';
import ThemeBar from './components/ThemeBar.vue';
</script>

<template>

<div>
  <ThemeBar />
</div>

  <RouterView />
</template>


<style>
div{
  z-index: 1000;
  /* background-color: blue; */
}

</style>
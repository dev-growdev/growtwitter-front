<script setup lang="ts">
import { ref } from 'vue';

const visible = ref<boolean>(true);
</script>

<template>
  <v-overlay :model-value="visible" class="d-flex align-center justify-center" persistent>
    <slot></slot>
  </v-overlay>
</template>

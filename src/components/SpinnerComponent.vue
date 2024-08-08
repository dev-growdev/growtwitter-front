<script setup lang="ts">
defineProps<{ color: string }>();
</script>

<template>
  <v-progress-circular indeterminate :color="color" :size="45" :width="9" />
</template>

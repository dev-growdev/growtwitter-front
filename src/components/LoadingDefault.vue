<script setup lang="ts">
import { ref } from 'vue';

const visible = ref<boolean>(true);
</script>

<template>
  <div v-if="visible" class="loader-container">
    <div class="loader"></div>
    <div class="loader-text">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  gap: 1rem;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.375);
  backdrop-filter: blur(10px);
  z-index: 9999;
}

.loader-text {
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  color: white;
  user-select: none;
  text-shadow: rgba(0, 0, 0, 0.7) 0 5px 10px;
}

.loader {
  width: 3.375rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid #e9e9e9;
  animation:
    l20-1 0.8s infinite linear alternate,
    l20-2 1.6s infinite linear;
  transform: translate(-50%, -50%);
}
@keyframes l20-1 {
  0% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
  }
  12.5% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%);
  }
  25% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%);
  }
  50% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
  }
  62.5% {
    clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
  }
  75% {
    clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%);
  }
  100% {
    clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%);
  }
}
@keyframes l20-2 {
  0% {
    transform: scaleY(1) rotate(0deg);
  }
  49.99% {
    transform: scaleY(1) rotate(135deg);
  }
  50% {
    transform: scaleY(-1) rotate(0deg);
  }
  100% {
    transform: scaleY(-1) rotate(-135deg);
  }
}
</style>

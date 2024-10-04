<template>
  <div>
    <button v-show="showButton" @click="scrollToTop" class="back-to-top">
      <i class="fas fa-arrow-up"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const showButton = ref(false);

const handleScroll = () => {
  showButton.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 40px;
  right: 370px;
  padding: 10px 20px;
  background-color: white;
  color: #4285f4;
  border: #4285f4 2px solid;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  z-index: 9999;
}

.back-to-top:hover {
  background-color: #4285f4;
  color: white;
  border: #4285f4 2px solid;
}

@media (max-width: 1279px) {
  .back-to-top {
    top: 40px;
    right: 30px;
    left: auto;
    bottom: auto;
  }
}
</style>

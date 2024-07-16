<script setup lang="ts">
import MenuApp from '@/components/Menu.vue';
import FooterApp from '@/components/Footer.vue';
import { onMounted, ref } from 'vue';
import { doGet } from '@/services/api';
import { type NoteType } from '@/types';

const notes = ref<NoteType[]>([]);

const getData = async () => {
  const data = await doGet('/notes');

  if (data.length) {
    notes.value = data;
  }
};

onMounted(getData);
</script>

<template>
  <MenuApp />
  <main>
    <h1>Notes</h1>
  </main>
  <FooterApp />
</template>

<style>
.wrapper-cards {
  display: flex;
  flex-wrap: wrap;
}

main {
  margin: 0px 20px;
}
</style>

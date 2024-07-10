<script setup lang="ts">
import type { NoteType } from '@/types';

interface CardItemProps {
  item: NoteType;
}

defineProps<CardItemProps>();
</script>

<template>
  <div class="card">
    <h2>Título: {{ item.title }}</h2>
    <p>Descrição: {{ item.description }}</p>
  </div>
</template>

<style>
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  margin: 20px;
  padding: 20px;
  height: 150px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue';

const selected = ref<string>('');
const teste2 = ref<string>('');
const theme = ref<'light-mode' | 'dark-mode' | 'high-contrast-mode' | 'dalt1'>('light-mode');

watch(selected, (newTheme) => {
  switch (newTheme) {
    case 'Escuro':
      theme.value = 'dark-mode';
      teste2.value = 'escuridão total';
      break;
      case 'Claro':
        theme.value = 'light-mode';
        teste2.value = 'Sol de rchar';
    break;
    case 'Alto contraste':
        theme.value = 'high-contrast-mode';
        teste2.value = 'Baita brilho';
    break;
    case 'Daltonismo 1':
        theme.value = 'dalt1';
        teste2.value = 'Daltonismo tipo 1';
    break;
    default:
      theme.value = 'light-mode';
      break;
  }
});

</script>

<template>
    <!-- <v-toolbar dark flat> -->
        <div :class="theme" class="accessBar">
<div :class="theme" style="height: 4rem;">
  <span> Tema: </span>
  <select v-model="selected" :class="theme">
    <option disabled value="" :class="theme">Por favor, selecione</option>
    <option :class="theme">Escuro</option>
    <option :class="theme">Claro</option>
    <option :class="theme">Alto contraste</option>
    <option :class="theme">Daltonismo 1</option>
  </select>
  <span> {{ teste2 }} </span>

</div>
    <!-- </v-toolbar> -->
</div>
  </template>


<style>

.accessBar{
    width: 375px;
    vertical-align: middle;
}

/* Tema claro (padrão) */
.light-mode {
  background-color: #f0f0f0;
  color: #000;
}

/* Tema escuro */
.dark-mode {
  background-color: #1e1e1e;
  color: #fff;
}

/* Tema alto contraste */
.high-contrast-mode {
  background-color: #000;
  color: #fffb00;
}

/* Tema Daltonismo 1 */
.dalt1 {
  background-color: #0c94e2;
  color: #ff7b00;
}
</style>


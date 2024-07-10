<script setup lang="ts">
/* __placeholder__ */
import type { ProductType } from '@/types/ProductType';
defineProps<{
  products: ProductType[];
}>();
</script>

<template>
  <slot name="header"></slot>
  <div>
    <div v-if="!products.length">Nenhum produto cadastrado.</div>
    <div v-else class="item" v-for="product of products" :key="product.id">
      <h2>{{ product.name }}</h2>
      <p>{{ product.description || 'Sem descrição' }}</p>
    </div>
  </div>
  <div style="background-color: black; color: beige">
    <slot name="footer"></slot>
  </div>
</template>

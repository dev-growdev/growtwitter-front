<script setup lang="ts">
import MenuApp from '@/components/Menu.vue';
import FooterApp from '@/components/Footer.vue';
import ProductsList from '@/components/ProductsList.vue';
import type { ProductType } from '@/types/ProductType';
import { ref } from 'vue';

const data = ref<ProductType[]>([
  { id: '1', name: 'Caderno', value: 10 },
  { id: '2', name: 'Boracha', value: 2 }
]);
</script>

<template>
  <MenuApp />
  <main>
    <h1>Lista de produtos</h1>
    <ProductsList :products="data">
      <template #footer>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab accusamus quaerat, dolorum
        asperiores deleniti, pariatur iste officia quis cum quos impedit dolore, facere accusantium.
        Mollitia minus ut porro culpa commodi?
      </template>
      <template #header>
        Aqui iria a minha descrição para mostrar em algum lugar. Onde? Em um slot, ou um slot
        nomeado.
      </template>
    </ProductsList>
  </main>
  <FooterApp />
</template>

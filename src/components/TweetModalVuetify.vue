<script setup lang="ts">
import { postTweet } from '@/services/api';
import { ref } from 'vue';
import ButtonDefault from '@/components/ButtonDefault.vue';

const content = ref<string>('');
const loadingVisible = ref<boolean>(false);

async function handlePostTweet() {
  if (!content.value) return;

  loadingVisible.value = true;
  await postTweet(content.value);
  loadingVisible.value = false;

  window.location.reload();
}
</script>
<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="blue" text="Vuetify" variant="flat"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title=" O que está acontecendo?">
        <!-- <v-card-text></v-card-text> -->
        <v-textarea
          placeholder="O que está acontecendo?"
          v-model="content"
          label="Tweet"
        ></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="d-flex justify-center mt-5 loading"></div>
          
          <ButtonDefault class="tweet-btn mr-2" :disabled="content.length < 1" @click="handlePostTweet"><p v-if="!loadingVisible">Tweetar</p>

        <v-progress-linear v-if="loadingVisible"  indeterminate></v-progress-linear>

      </ButtonDefault>
          <ButtonDefault @click="isActive.value = false">Fechar</ButtonDefault>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
}

.tweet-btn{
  width: 7rem;
  height: 2.6rem;
}
</style>

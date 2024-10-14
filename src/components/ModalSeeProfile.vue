<script setup lang="ts">
import { ref } from 'vue';
import type { UserType } from '../types/UserType';

const props = defineProps<UserType>()

const seeModal = ref<boolean>(false)

</script>

<template>
    <v-dialog v-model="seeModal" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Retweetar com comentário</span>
          </v-card-title>
          <v-card-text>
            <v-card class="mt-4" outlined>
              <v-card-text>
                <div class="d-flex align-center">
                  <v-avatar :image="props.avatar_url ?? default_avatar" size="50"></v-avatar>
                  <div class="ml-3">
                    <div class="font-weight-bold">{{ props.name }}</div>
                    <div class="text--secondary">@{{ props.username }}</div>
                  </div>
                </div>
                <div class="mt-3 ml-13">{{ props. }}</div>
              </v-card-text>
            </v-card>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="retweetModal = false">Cancelar</v-btn>
            <v-btn :loading="retweetLoading" color="blue darken-1"
              @click="handleRetweetWithComment(data.id, comment)">Retweet</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

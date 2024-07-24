<script setup lang="ts">
import type { TweetType } from '@/types';
import default_avatar from '@/assets/default-avatar.png';
import { tempoDesdeCriacao } from '@/utils/PastTime';

interface TweetTypeProps {
  data: TweetType;
}

defineProps<TweetTypeProps>();
</script>

<template>
  <v-card class="text-white mx-auto pa-0" color="blue" max-width="37.5rem">
    <v-card-actions>
      <v-row align="center" justify="start" class="w-100">
        <!-- Coluna para a imagem do avatar -->
        <v-col cols="auto">
          <v-avatar :image="data.user.avatar_url ?? default_avatar"></v-avatar>
        </v-col>

        <!-- Coluna para o nome do usuário e username -->
        <v-col>
          <v-list-item-title
            >{{ data.user.name }}
            <v-list-item-subtitle>@{{ data.user.username }}</v-list-item-subtitle>
          </v-list-item-title>
        </v-col>

        <!-- Coluna para o subtítulo com nome de usuário e tempo desde a criação -->
        <v-col>
          <v-list-item-subtitle
            >{{ data.user.name }} @{{ data.user.username }}
            {{ tempoDesdeCriacao(data.created_at) }}</v-list-item-subtitle
          >
        </v-col>

        <!-- Coluna para o conteúdo -->
        <v-col cols="12">
          <v-card-text class="text-h5 py-2">
            {{ data.content }}
          </v-card-text>
        </v-col>

        <!-- Coluna para os ícones de interação (likes, comentários) -->
        <v-col cols="auto" class="ml-auto">
          <div class="d-flex align-items-center justify-content-end">
            <v-icon class="me-1" icon="mdi-heart"></v-icon>
            <span class="me-2">💬</span>
            <div v-if="data.likes.length === 0">
              <p>🤍</p>
            </div>
            <div v-else-if="data.likes.length === 1">
              <p>❤️ 1 like!</p>
            </div>
            <div v-else>
              <p>❤️{{ data.likes.length }} likes!</p>
            </div>
            <!-- Adicionando o ícone de comentário corretamente -->
            <v-icon class="me-1">mdi-comment</v-icon>
          </div>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

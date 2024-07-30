<script setup lang="ts">
import { register } from '@/services/api';
import { reactive, ref } from 'vue';
import defaultAvatar from '@/assets/default-avatar.png';
import type { CreateAccountType, RegisterAccountValidationType } from '@/types';
import router from '@/router';
import useAvatar from '@/services/avatar';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import BackgroundOverlay from '@/components/BackgroundOverlay.vue';
import axios from 'axios';

const loadingVisible = ref<boolean>(false);
const visible = ref<boolean>(false);

const account = reactive<CreateAccountType>({
  username: '',
  name: '',
  surname: '',
  email: '',
  password: '',
  avatar_url: undefined
});

const validationErrors = reactive<RegisterAccountValidationType>({
  username: [],
  name: [],
  surname: [],
  email: [],
  password: [],
  avatar: []
});

const clearValidationErrors = () => {
  for (const key in validationErrors) {
    validationErrors[key as keyof RegisterAccountValidationType] = [];
  }
};

const { previewAvatar, loadFileToPreview } = useAvatar();

const bindCustomAvatar = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) {
    return;
  }
  const file = input.files[0];
  account.avatar_url = loadFileToPreview(file);
};

const uploadToCloudinary = async (file: File): Promise<string> => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload avatar');
  }
};

const handleRegister = async () => {
  try {
    let avatarUrl = '';
    if (account.avatar_url instanceof File) {
      avatarUrl = await uploadToCloudinary(account.avatar_url);
    }
    clearValidationErrors();
    const userData = {
      name: account.name,
      surname: account.surname,
      email: account.email,
      password: account.password,
      username: account.username,
      avatar_url: avatarUrl
    };

    loadingVisible.value = true;

    const response = await register(userData);

    loadingVisible.value = false;
    console.log(response.data.user);
    if (response.status === 201) {
      sessionStorage.setItem('token', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      router.push('/');
    } else if (response.status === 422) {
      const errors = response.data.errors;
      for (const key in errors) {
        validationErrors[key as keyof RegisterAccountValidationType] = errors[key];
      }
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <BackgroundOverlay v-if="loadingVisible">
    <SpinnerComponent color="white" />
  </BackgroundOverlay>
  <div class="background">
    <div>
      <v-card class="mx-auto mt-6 pa-12 pb-8" elevation="8" max-width="648" rounded="lg">
        <h1 class="mt-1 text-center">Criar conta</h1>
        <div class="text-subtitle-1 text-medium-emphasis">Nome</div>
        <v-text-field
          density="compact"
          placeholder="Seu primeiro nome"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          v-model="account.name"
          :error-messages="validationErrors.name"
        ></v-text-field>

        <div class="mt-1 text-subtitle-1 text-medium-emphasis">Sobrenome</div>
        <v-text-field
          density="compact"
          placeholder="Seu sobrenome"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          v-model="account.surname"
          :error-messages="validationErrors.surname"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Nome de usuário</div>
        <v-text-field
          density="compact"
          placeholder="Escolha um nome de usuário"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          v-model="account.username"
          :error-messages="validationErrors.username"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>

        <v-text-field
          density="compact"
          placeholder="Seu endereço de e-mail"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="account.email"
          :error-messages="validationErrors.email"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Senha
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Crie uma senha forte"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="account.password"
          :error-messages="validationErrors.password"
        ></v-text-field>

        <div class="mt-1 text-subtitle-1 text-medium-emphasis">Escolha um avatar (opcional):</div>
        <div class="upload-avatar-container">
          <v-file-input
            class="d-none"
            accept="image/png, image/jpeg, image/jpg"
            label="Avatar"
            @change="bindCustomAvatar"
            id="avatar"
          ></v-file-input>
          <label class="upload-avatar-label mt-3" for="avatar">
            <v-avatar :image="previewAvatar ?? defaultAvatar" size="75"></v-avatar>
          </label>
          <div v-if="validationErrors.avatar.length > 0">
            <p class="error-avatar-message" v-for="error in validationErrors.avatar" :key="error">
              {{ error }}
            </p>
          </div>
        </div>

        <v-btn
          @click="handleRegister"
          :disabled="account.password.length < 4"
          class="mb-2"
          color="blue"
          size="large"
          variant="flat"
          block
        >
          Criar
        </v-btn>

        <v-card-text class="text-center">
          <RouterLink to="/login" class="text-blue text-decoration-none">
            Já tem uma conta? <v-icon icon="mdi-chevron-right"></v-icon>
          </RouterLink>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.background {
  height: 100vh;
  background-color: #f0f0f0;
}

.upload-avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
}

.upload-avatar-label {
  cursor: pointer;
}

.upload-avatar-label:hover {
  opacity: 0.3;
}

.error-avatar-message {
  margin-top: 0.5rem;
  color: rgb(176, 0, 32);
  font-size: 0.75rem;
}
</style>

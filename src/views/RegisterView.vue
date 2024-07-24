<script setup lang="ts">
import { register } from '@/services/api';
import { reactive, ref } from 'vue';
import defaultAvatar from '@/assets/default-avatar.png';
import eyeHide from '@/assets/eye-hide.png';
import eyeView from '@/assets/eye-view.png';
import type { CreateAccountType, RegisterAccountValidationType } from '@/types';
import ButtonDefault from '@/components/ButtonDefault.vue';
import router from '@/router';
import useAvatar from '@/services/avatar';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import BackgroundOverlay from '@/components/BackgroundOverlay.vue';

const loadingVisible = ref<boolean>(false);
const hidePassword = ref<boolean>(true);

const account = reactive<CreateAccountType>({
  username: '',
  name: '',
  surname: '',
  email: '',
  password: '',
  avatar: undefined
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
  account.avatar = loadFileToPreview(file);
};

const handleRegister = async () => {
  clearValidationErrors();
  const formData = new FormData();

  formData.append('name', account.name);
  formData.append('surname', account.surname);
  formData.append('email', account.email);
  formData.append('password', account.password);
  formData.append('username', account.username);
  formData.append('avatar', account.avatar ?? '');

  loadingVisible.value = true;

  const response = await register(formData);

  loadingVisible.value = false;

  if (response.status === 201) {
    sessionStorage.setItem('token', response.data.token);
    router.push('/');
  } else if (response.status === 422) {
    const errors = response.data.errors;
    for (const key in errors) {
      validationErrors[key as keyof RegisterAccountValidationType] = errors[key];
    }
  }
};
</script>

<template>
  <BackgroundOverlay v-if="loadingVisible">
    <SpinnerComponent color="white" />
  </BackgroundOverlay>
  <div class="background">
    <div class="container">
      <div class="form-section">
        <h2>Criar conta no Growtwitter</h2>
        <div class="form">
          <label for="name">Nome:</label>
          <input
            id="name"
            class="form-input"
            v-model="account.name"
            type="text"
            placeholder="ex: João"
          />
          <div v-if="validationErrors.name.length > 0" class="error-message">
            <p v-for="message in validationErrors.name" :key="message">{{ message }}</p>
          </div>

          <label for="surname">Sobrenome:</label>
          <input
            id="surname"
            class="form-input"
            v-model="account.surname"
            type="text"
            placeholder="ex: Silva"
          />
          <div v-if="validationErrors.surname.length > 0" class="error-message">
            <p v-for="message in validationErrors.surname" :key="message">{{ message }}</p>
          </div>

          <label for="username">Nome de usuário:</label>
          <input
            id="username"
            class="form-input"
            v-model="account.username"
            type="text"
            placeholder="ex: jsilva123"
          />
          <div v-if="validationErrors.username.length > 0" class="error-message">
            <p v-for="message in validationErrors.username" :key="message">{{ message }}</p>
          </div>

          <label for="email">E-mail:</label>
          <input
            id="email"
            class="form-input"
            v-model="account.email"
            type="email"
            placeholder="ex: jsilva@email.com"
          />
          <div v-if="validationErrors.email.length > 0" class="error-message">
            <p v-for="message in validationErrors.email" :key="message">{{ message }}</p>
          </div>

          <label for="password">Senha:</label>
          <span class="password-container">
            <input
              v-if="hidePassword"
              id="password"
              class="form-input"
              v-model="account.password"
              type="password"
            />
            <input v-else id="password" class="form-input" v-model="account.password" type="text" />
            <img
              class="password-eye"
              @click="() => (hidePassword = !hidePassword)"
              :src="hidePassword ? eyeHide : eyeView"
            />
          </span>
          <div v-if="validationErrors.password.length > 0" class="error-message">
            <p v-for="message in validationErrors.password" :key="message">{{ message }}</p>
          </div>

          <label>Escolha um avatar (opcional):</label>
          <div class="upload-avatar-container">
            <input id="avatar" type="file" @change="bindCustomAvatar" />
            <label class="upload-avatar-label" for="avatar">
              <img class="avatar" :src="previewAvatar ?? defaultAvatar" alt="Image profile" />
            </label>
          </div>
          <div v-if="validationErrors.avatar.length > 0" class="error-message">
            <p v-for="message in validationErrors.avatar" :key="message">{{ message }}</p>
          </div>

          <ButtonDefault class="btn" @click="handleRegister">Criar</ButtonDefault>

          <p>Já tem uma conta?<RouterLink to="/login">Login</RouterLink></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.container {
  display: flex;
  width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
}

.form-section {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-section h2 {
  margin-bottom: 1em;
  font-size: 1.5em;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.password-container {
  position: relative;
  display: flex;
  flex-direction: column;
}

.password-eye {
  width: 1.25rem;
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 10px;
}

.upload-avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
}

.upload-avatar-container div {
  display: flex;
  margin-bottom: 1rem;
}

.upload-avatar-label {
  cursor: pointer;
}

.avatar {
  width: 70px;
  height: 70px;
  border: 3px solid #acaaaa;
  border-radius: 50%;
  overflow: hidden;
}

.avatar:hover {
  opacity: 0.4;
}

input[type='file'] {
  display: none;
}

.error-message {
  color: red;
  font-size: 0.875rem;
}

.error-message p {
  margin: 0;
}
</style>

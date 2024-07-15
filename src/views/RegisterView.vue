<script setup lang="ts">
import { register } from '@/services/api';
import { ref, reactive } from 'vue';
import defaultAvatar from '@/assets/default-avatar.png';
import type { CreateAccountType } from '@/types';
import router from '@/router';

const account = reactive<CreateAccountType>({
  username: '',
  name: '',
  surname: '',
  email: '',
  password: '',
  avatar: undefined
});

const validationErrors = reactive({
  username: [],
  name: [],
  surname: [],
  email: [],
  password: [],
  avatar: []
});

const clearValidationErrors = () => {
  for (const key in validationErrors) {
    validationErrors[key] = [];
  }
};

const previewAvatar = ref(null);

const bindCustomAvatar = async (event: any) => {
  const file = event.target.files[0];
  const fileReader = new FileReader();
  fileReader.onload = (e) => (previewAvatar.value = e.target.result);
  fileReader.readAsDataURL(file);
  account.avatar = file;
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

  const response = await register(formData);

  if (response.status === 201) {
    localStorage.setItem('token', response.data.token);
    router.push('/');
  } else if (response.status === 422) {
    const errors = response.data.errors;
    for (const key in errors) {
      validationErrors[key] = errors[key];
    }
  }
};
</script>

<template>
  <div class="background">
    <div class="container">
      <div class="form-section">
        <h2>Sign up to Growtwitter</h2>
        <div class="form">
          <label for="name">Name:</label>
          <input id="name" class="form-input" v-model="account.name" type="text" />
          <div v-if="validationErrors.name.length > 0" class="error-message">
            <p v-for="message in validationErrors.name" :key="message">{{ message }}</p>
          </div>

          <label for="surname">Surname:</label>
          <input id="surname" class="form-input" v-model="account.surname" type="text" />
          <div v-if="validationErrors.surname.length > 0" class="error-message">
            <p v-for="message in validationErrors.surname" :key="message">{{ message }}</p>
          </div>

          <label for="username">Username:</label>
          <input id="username" class="form-input" v-model="account.username" type="text" />
          <div v-if="validationErrors.username.length > 0" class="error-message">
            <p v-for="message in validationErrors.username" :key="message">{{ message }}</p>
          </div>

          <label for="email">E-mail:</label>
          <input id="email" class="form-input" v-model="account.email" type="email" />
          <div v-if="validationErrors.email.length > 0" class="error-message">
            <p v-for="message in validationErrors.email" :key="message">{{ message }}</p>
          </div>

          <label for="password">Password:</label>
          <input id="password" class="form-input" v-model="account.password" type="password" />
          <div v-if="validationErrors.password.length > 0" class="error-message">
            <p v-for="message in validationErrors.password" :key="message">{{ message }}</p>
          </div>

          <label>Upload avatar (optional):</label>
          <div class="upload-avatar-container">
            <input id="avatar" type="file" @change="bindCustomAvatar" />
            <label class="upload-avatar-label" for="avatar">
              <img :src="previewAvatar ?? defaultAvatar" alt="Image profile" />
            </label>
          </div>
          <div v-if="validationErrors.avatar.length > 0" class="error-message">
            <p v-for="message in validationErrors.avatar" :key="message">{{ message }}</p>
          </div>

          <button class="btn" @click="handleRegister">Create</button>

          <p>Already has Sign Up?<RouterLink to="/login">Sign in</RouterLink></p>
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

.btn {
  padding: 10px;
  background-color: #4285f4;
  border: none;
  color: white;
  border-radius: 21px;
  cursor: pointer;
}
.btn:hover {
  background-color: #357ae8;
}

.form-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

img {
  width: 70px;
  height: 70px;
  border: 3px solid #acaaaa;
  border-radius: 50%;
  overflow: hidden;
}

img:hover {
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

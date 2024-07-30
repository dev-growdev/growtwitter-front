<script setup lang="ts">
import ButtonDefault from '@/components/ButtonDefault.vue';
import { login } from '@/services/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import BackgroundOverlay from '@/components/BackgroundOverlay.vue';

const email = ref<string>('');
const password = ref<string>('');
const keepConnected = ref<boolean>(false);
const error = ref<string>('');
const router = useRouter();

const loadingVisible = ref<boolean>(false);

const handleLogin = async () => {
  error.value = '';
  loadingVisible.value = true;

  const response = await login(email.value, password.value);

  loadingVisible.value = false;

  if (response.status === 200 && keepConnected.value) {
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('userData', JSON.stringify(response.data.data.user));
    router.push('/');
  } else if (response.status === 200 && !keepConnected.value) {
    sessionStorage.setItem('token', response.data.data.token);
    localStorage.setItem('userData', JSON.stringify(response.data.data.user));
    router.push('/');
  }

  error.value = response.data.msg;
};
</script>

<template>
  <BackgroundOverlay v-if="loadingVisible">
    <SpinnerComponent color="white" />
  </BackgroundOverlay>
  <div class="background">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" class="bg-blue-darken-2 rounded-s-lg pa-8">
          <v-card-title>Growtwitter</v-card-title>
          <v-card-subtitle class="text-white"
            >Trabalho final do bloco intermediário</v-card-subtitle
          >
          <v-card-text>
            O Growtwitter é a plataforma definitiva para todos os apaixonados por redes sociais que
            buscam uma experiência familiar e poderosa, semelhante ao Twitter, mas com um toque
            único. Seja parte desta comunidade que valoriza a liberdade de expressão, a conexão com
            pessoas de todo o mundo e a disseminação de ideias.
          </v-card-text>
        </v-col>
        <v-col cols="12" sm="6" class="bg-white rounded-e-lg pa-8">
          <v-card-title>Entrar no Growtwitter</v-card-title>

          <v-text-field label="Email" v-model="email"></v-text-field>
          <v-text-field type="password" label="Password" v-model="password"></v-text-field>

          <div class="keep-connected-container">
            <label for="keep-connected">Permanecer conectado:</label>
            <input type="checkbox" id="keep-connected" v-model="keepConnected" />
          </div>

          <v-btn block @click="handleLogin" class="bg-blue-darken-2 my-4">Enviar</v-btn>

          <v-card-text
            >Não tem uma conta? <RouterLink to="/register">Clique aqui</RouterLink></v-card-text
          >
          <v-card-text
            ><span class="error-message" v-if="error">{{ error }}</span></v-card-text
          >
        </v-col>
      </v-row>
    </v-container>
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
  height: 450px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
}

.info-section {
  flex: 1;
  background-color: #4285f4;
  color: white;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info-section h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.info-section h3 {
  font-size: 1.2em;
  margin-bottom: 1em;
}

.info-section p {
  font-size: 1em;
  line-height: 1.5;
}

.form-section {
  flex: 1;
  padding: 40px;
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
  gap: 10px;
}

.form-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.keep-connected-container {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

span.error-message {
  text-align: center;
  color: red;
  margin: 0;
}
</style>

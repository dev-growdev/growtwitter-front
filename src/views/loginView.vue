<script setup lang="ts">
import { login } from '@/services/api';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import BackgroundOverlay from '@/components/BackgroundOverlay.vue';
import { resetStorage } from '@/services/authentication';

const email = ref<string>('');
const password = ref<string>('');
const keepConnected = ref<boolean>(false);
const error = ref<string>('');
const router = useRouter();

const visible = ref<boolean>(false);
const loadingVisible = ref<boolean>(false);
const attempts = ref<number>(0);
const attemptsVerify = ref<boolean>(false);

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms * 1000));
}

const handleLogin = async () => {
  resetStorage();
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

  attempts.value++;

  error.value = response.data.msg;

  if (attempts.value >= 3) {
    attemptsVerify.value = true;
    error.value = "Tente novamente em 1 minuto";
    localStorage.setItem("attemptsVerify", true.toString());
    await delay(60);
    localStorage.setItem("attemptsVerify", false.toString())
    attemptsVerify.value = false;
  }


};

onMounted(async () => {
  if (localStorage.getItem("attemptsVerify") == "true") {
    attemptsVerify.value = true;
    await delay(60);
    localStorage.setItem("attemptsVerify", false.toString())
    attemptsVerify.value = false;
  }
  else
    localStorage.setItem("attemptsVerify", false.toString())
  attemptsVerify.value = false;
})
</script>

<template>
  <BackgroundOverlay v-if="loadingVisible">
    <SpinnerComponent color="white" />
  </BackgroundOverlay>
  <div class="background">
    <v-container>
      <v-card class="mx-auto mt-sm-6 pa-6 pa-md-12 pb-md-8" elevation="8" max-width="900" rounded="lg">
        <v-row class="d-flex align-center">
          <v-col cols="12" sm="6" class="text bg-blue rounded py-15">
            <v-card-title>Growtwitter</v-card-title>
            <v-card-subtitle class="text-white">Trabalho final do bloco intermediário</v-card-subtitle>
            <v-card-text>
              O Growtwitter é a plataforma definitiva para todos os apaixonados por redes sociais
              que buscam uma experiência familiar e poderosa, semelhante ao Twitter, mas com um
              toque único. Seja parte desta comunidade que valoriza a liberdade de expressão, a
              conexão com pessoas de todo o mundo e a disseminação de ideias.
            </v-card-text>
          </v-col>

          <v-col cols="12" sm="6" class="bg-white rounded-e-lg pa-8">
            <h1 class="pa-5 mb-5 text-center register-title">Entrar no Growtwitter</h1>

            <v-text-field density="compact" placeholder="Digite seu endereço de e-mail"
              prepend-inner-icon="mdi-email-outline" variant="outlined" v-model="email"></v-text-field>

            <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="visible = !visible" :type="visible ? 'text' : 'password'" density="compact"
              placeholder="Digite sua  senha " prepend-inner-icon="mdi-lock-outline" variant="outlined"
              v-model="password"></v-text-field>

            <div class="keep-connected-container pa-5">
              <label for="keep-connected">Permanecer conectado:</label>
              <input type="checkbox" id="keep-connected" v-model="keepConnected" />
            </div>

            <v-btn @click="handleLogin" :disabled="attemptsVerify" class="mb-2" color="blue" size="large" variant="flat"
              block>Enviar</v-btn>

            <v-card-text class="text-center d-flex flex-column">
              <RouterLink to="/register" class="text-blue text-decoration-none">
                Não tem uma conta? <v-icon icon="mdi-chevron-right"></v-icon>
              </RouterLink>
              <RouterLink to="/forgot" class="text-blue text-decoration-none">
                Esqueceu sua senha? <v-icon icon="mdi-chevron-right"></v-icon>
              </RouterLink>
            </v-card-text>
            <v-card-text><span class="error-message" v-if="error">{{ error }}</span></v-card-text>
          </v-col>
        </v-row>
      </v-card>
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

@media (max-width: 600px) {
  .text {
    display: none;
  }
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

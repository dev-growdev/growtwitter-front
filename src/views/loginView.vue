<script setup lang="ts">
import { login } from '@/services/api';
import { onMounted, ref, watch } from 'vue';
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

const selected = ref<string>('');
const theme = ref<'light-mode' | 'dark-mode' | 'high-contrast-mode'>('light-mode');

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

watch(selected, (newTheme) => {
  switch (newTheme) {
    case 'Clássico':
      theme.value = 'light-mode';
      break;
    case 'Escuro - Acromatopsia':
      theme.value = 'dark-mode';
      break;
    case 'Alto contraste - Deuteranopia':
      theme.value = 'high-contrast-mode';
      break;
    default:
      theme.value = 'light-mode';
      break;
  }
});

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

  <!-- accessibility bar -->
  <div :class="theme" class="accessBar">
    <div :class="theme" style="border: none;">
      <span>Alterar tema de acessibilidade: </span>
      <select v-model="selected" :class="theme" style="border: none;">
        <option disabled value="" :class="theme"> --- </option>
        <option :class="theme">Classico</option>
        <option :class="theme">Escuro - Acromatopsia</option>
        <option :class="theme">Alto contraste - Deuteranopia</option>
      </select>
    </div>
  </div>


  <BackgroundOverlay v-if="loadingVisible">
    <SpinnerComponent color="white" />
  </BackgroundOverlay>
  <div :class="theme" class="background">
    <v-container>
      <v-card :class="theme" class="mx-auto mt-sm-6 pa-6 pa-md-12 pb-md-8" elevation="8" max-width="900" rounded="lg">
        <v-row class="d-flex align-center">
          <v-col cols="12" sm="6" :class="theme" class="textBackground backgroundTextExplanation rounded py-15">
            <v-card-title>Growtwitter</v-card-title>
            <v-card-subtitle :class="theme" class="subTitleColorText" style="border: none;">Trabalho final do curso
              despertar.dev</v-card-subtitle>
            <v-card-text>
              O Growtwitter é a plataforma definitiva para todos os apaixonados por redes sociais
              que buscam uma experiência familiar e poderosa, semelhante ao Twitter, mas com um
              toque único. Seja parte desta comunidade que valoriza a liberdade de expressão, a
              conexão com pessoas de todo o mundo e a disseminação de ideias.
            </v-card-text>
          </v-col>

          <v-col :class="theme" cols="12" sm="6" class="rounded-e-lg pa-8 loginArea">
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

            <v-btn @click="handleLogin" :disabled="attemptsVerify" :class="theme"
              class="mb-2 btnBackground backgroundTextExplanation" size="large" variant="flat" block>Enviar</v-btn>

            <v-card-text class="text-center">
              <RouterLink to="/register" :class="theme" class="noAccessColor text-decoration-none"
                style="border: none;">
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

.accessBar {
  padding: 0.5rem;
  text-align: center;
}

.textBackground {
  background-color: #2196f3;
  color: #fff;
}

.subTitleColorText {
  color: #fff;
}

.btnBackground {
  background-color: #2196f3;
  color: #fff;
}

.noAccessColor {
  color: #1d96dc;
}

/* Tema escuro */
.dark-mode {
  background-color: #000;
  color: #fff;
  border: solid 1px #fff;
}

.dark-mode .backgroundTextExplanation {
  background-color: rgb(62, 68, 62);
  border: none;
}

.dark-mode .loginArea {
  border: none;
}

/* Tema alto contraste */
.high-contrast-mode {
  background-color: #000;
  color: #fffb00;
  border: solid 1px #fffb00;
}
</style>

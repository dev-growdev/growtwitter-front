<script setup lang="ts">
// import { login } from '@/services/api'
import { ref } from 'vue';
// import { useRouter } from 'vue-router';

const email = ref<string>('');
const password = ref<string>('');
// const router = useRouter();

const handleLogin = async () => {
  // const response = await login(email.value, password.value)
  // if (response) {
  //   router.push('/')
  // }
};
</script>

<template>
  <div class="background">
    <div class="container">
      <div class="info-section">
        <h1>Growtwitter</h1>
        <h3>Trabalho final do bloco intermediário</h3>
        <p>
          O Growtwitter é a plataforma definitiva para todos os apaixonados por redes sociais que
          buscam uma experiência familiar e poderosa, semelhante ao Twitter, mas com um toque único.
          Seja parte desta comunidade que valoriza a liberdade de expressão, a conexão com pessoas
          de todo o mundo e a disseminação de ideias.
        </p>
      </div>
      <div class="form-section">
        <h2>Entrar no Growtwitter</h2>
        <div class="form">
          <label>E-mail:</label>
          <input class="form-input" v-model="email" type="text" />

          <label>Password:</label>
          <input class="form-input" v-model="password" type="password" />

          <button class="btn" v-on:click="handleLogin">Entrar</button>

          <p>Nao tem uma conta? <RouterLink to="/register">Clique aqui</RouterLink></p>
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
  height: 400px;
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
</style>

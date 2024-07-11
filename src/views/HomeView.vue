<script setup lang="ts"></script>

<template>
  <div>
    <div class="home-container">
      <div class="home-nav">
        <div class="home-nav-component"></div>
      </div>
      <div class="home-content">
        <span class="home-content-title">
          <span> Página Inicial </span>
        </span>

        <div class="home-content-card"></div>
      </div>
      <div class="home-whats">
        <div class="home-whats-card">
          <div>
            <h1>O que está acontecendo?</h1>
          </div>
          <div>
            <span>Esportes - Há 45 min</span>
            <h2>Assunto sobre esportes</h2>
          </div>

          <div>
            <span>Assunto do Momento em Brasil</span>
            <h2>Assunto do Momento</h2>
          </div>

          <div>
            <span>Música - Assunto do Momento</span>
            <h2>Assunto sobre Música</h2>
          </div>

          <div>
            <span>Cinema - Assunto do Momento</span>
            <h2>Assunto sobre Filmes e Cinema</h2>
          </div>

          <a href="">Mostrar mais</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.home-container {
  display: flex;

  width: 100%;
  height: 100vh;
  background: #ffffff;
}

.home-nav {
  display: flex;
  justify-content: center;
  width: 20%;
  height: 100%;
  background: #ffffff;
}

.home-nav-component {
  width: 80%;
  height: 100%;
  background-color: black;
}

.home-content {
  width: 55%;
  height: 100%;
  border-right: 2px solid #b4b4b4;
  border-left: 2px solid #b4b4b4;
}

.home-content-title {
  display: flex;
  align-items: center;
  padding: 2%;
  width: 100%;
  height: 8%;
  border-bottom: 2px solid #b4b4b4;

  font-weight: 600;
  font-size: 2rem;
  font-style: normal;
}

.home-content-card {
  width: 100%;
  height: 20%;
  background-color: black;
}

.home-whats {
  display: flex;
  justify-content: center;
  padding-top: 3%;
  width: 25%;
  height: 100%;
}

.home-whats-card {
  display: flex;
  flex-direction: column;
  padding: 5%;
  gap: 6%;
  width: 90%;
  height: fit-content;
  border-radius: 3%;
  background-color: #e9e9e9;
}

.home-whats-card > a {
  text-decoration: none;
  color: #289ef0;
}

.home-whats-card > div {
  width: 100%;
  height: 90px;
}

.home-whats-card > div > h1 {
  font-size: 1.8rem;
  font-weight: 600;
}

.home-whats-card > div > h2 {
  font-size: 1.3rem;
  font-weight: 600;
}

.home-whats-card > div > span {
  font-size: 1rem;
}
</style>

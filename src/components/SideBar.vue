<script setup lang="ts">
import growtwitterLogo from '@/components/icons/growtwitterLogo.vue';
import homePageLogo from '@/components/icons/homePageLogo.vue';
import ProfileLogo from '@/components/icons/profileLogo.vue';
import HashTag from '@/components/icons/hashTagLogo.vue';
interface sideType {
  name: string;
  hashName: string;
  urlImg: string;
}

interface SidebarProps {
  item: sideType;
}

defineProps<SidebarProps>();
</script>

<template>
  <div class="container-nav">
    <div class="content">
      <div class="menu">
        <div><growtwitterLogo /></div>
        <div class="icon-container">
          <div class="icon">
            <div><homePageLogo class="icon-img" /><span>Pagina Inicial</span></div>
          </div>
          <div class="icon">
            <div><HashTag class="icon-img" /><span>Explorar</span></div>
          </div>
          <div class="icon">
            <div><ProfileLogo class="icon-img" /><span>Perfil</span></div>
          </div>
        </div>
        <div class="sideBtn"><button>Twettar</button></div>
      </div>

      <div class="perfil-container">
        <div class="perfil-content">
          <div class="perfil-img"><img :src="item.urlImg" alt="profile-img" /></div>
          <div class="perfil-text">
            <div class="name">{{ item.name }}</div>
            <div class="name-hash">{{ item.hashName }}</div>
          </div>
          <div class="perfil-button-container">
            <RouterLink class="perfil-button" to="/">Sair</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
li {
  list-style-type: none;
}
ul {
  padding: 0;
}
.container-nav {
  padding-top: 10%;
  padding-left: 20%;
  width: 100%;
  height: 100%;
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 5%;
}
.icon-container {
  display: flex;
  flex-direction: column;
}
.icon {
  color: black;
  margin-bottom: 4%;
}
.icon-img {
  width: 8%;
}

.icon > div {
  gap: 5%;
  display: flex;
  align-items: center;
}
.sideBtn {
  width: 60%;
}
.sideBtn > button {
  width: 100%;
  border: none;
  border-radius: 20px;
  background-color: #1c9bf0;
  color: #f1f1f1;
  padding: 5px;
  cursor: pointer;
}

.sideBtn > button:hover {
  background-color: gray;
}

.perfil-container {
  width: 100%;
  padding-bottom: 10%;
}

.perfil-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 4%;
}

.perfil-img {
  width: 20%;
}
.perfil-img > img {
  width: 100%;
  border-radius: 100%;
}

.perfil-text {
  width: 40%;
  color: black;
}

.name-hash {
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.884);
}
.perfil-button-container {
  display: block;
  width: 20%;
}
.perfil-button {
  color: white;
  font-size: 100%;
  display: flex;
  justify-content: center;

  background-color: #1c9bf0;
  border-radius: 1.375rem;
}

.perfil-button:hover {
  background-color: gray;
}

@media screen and (max-width: 1500px) {
  .name-hash {
    font-size: 0.5rem;
  }
}
@media screen and (max-width: 1000px) {
  .name-hash {
    font-size: 0.5rem;
  }

  .perfil-content {
    flex-direction: column;
    justify-content: center;
  }

  .perfil-img {
    width: 60%;
  }
  .perfil-text {
    width: 70%;
  }
  .perfil-button-container {
    width: 70%;
  }
}
</style>

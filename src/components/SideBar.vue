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

      <div class="perfil">
        <div class="picAndName">
          <img class="pic" :src="item.urlImg" alt="" />
          <div class="name">
            <span>{{ item.name }} </span>
            <span class="username"> {{ item.hashName }}</span>
          </div>
        </div>
        <RouterLink style="color: black; font-size: 10px" to="/">Sair</RouterLink>
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
  margin-top: 10%;
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

.pic {
  width: 50px;
  border-radius: 100%;
  margin-right: 5px;
}

.username {
  font-size: 0.375rem;
  color: gray;
  margin-top: 0;
}
.name {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.picAndName {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}
</style>

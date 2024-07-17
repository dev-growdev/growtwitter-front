<script setup lang="ts">
import growtwitterLogo from '@/components/icons/growtwitterLogo.vue';
import homePageLogo from '@/components/icons/homePageLogo.vue';
import ProfileLogo from '@/components/icons/profileLogo.vue';
import HashTag from '@/components/icons/hashTagLogo.vue';
import TweetModal from '@/components/TweetModal.vue';
import { ref } from 'vue';

interface sideType{
    name:string
    hashName:string
    urlImg:string
}

interface SidebarProps {
  item: sideType;
}

defineProps<SidebarProps>();

const visible = ref<boolean>(false);

function showModal(){
  visible.value = true;
}

function closeModal() {
  visible.value = false;
}


</script>


<template>
 <div class="sideBar">
        <div class="upper">
          <growtwitterLogo/>
          <ul>
            <li><homePageLogo/><span class="li-span">Pagina Inicial</span></li>
            <li><HashTag/><span class="li-span">Explorar</span></li>
            <li><ProfileLogo/><span class="li-span">Perfil</span></li>
          </ul>
          <div>
            <button class="sideBtn" @click="showModal" >Tweetar</button>
            <TweetModal v-if="visible" @close="closeModal"/>
          </div>

        </div>
        <div class="botton">
            <div class="picAndName">
                <img class="pic" :src="item.urlImg" alt="">
                <div class="name">
                    <span>{{ item.name }} </span>
                    <span class="username"> {{item.hashName}}</span>
                </div>
            </div>
            <RouterLink style="color: black; font-size: 10px;" to="/">Sair</RouterLink>
        </div>
      </div>
</template>

<style scoped>
li{
  list-style-type: none;
}
ul{
  padding: 0;
}
.upper{
  margin-top: 15px;
}
.sideBtn{
  width: 120px;
  border: none;
  border-radius: 20px;
  background-color: #1C9BF0;
  color: #f1f1f1;
  padding: 5px;
  cursor: pointer;
}
.sideBtn:hover{
  background-color: gray;
}
.li-span{
  margin-left: 5px;
}
.pic{
    width: 50px;
    border-radius: 100%;
    margin-right: 5px;
}
.sideBar{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 10PX
}
.username{
    font-size: 0.375rem;
    color: gray;
    margin-top: 0;
}
.name{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.picAndName{
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
}

</style>
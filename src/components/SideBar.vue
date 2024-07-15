<script setup lang="ts">
import growtwitterLogo from '@/components/icons/growtwitterLogo.vue';
import homePageLogo from '@/components/icons/homePageLogo.vue';
import ProfileLogo from '@/components/icons/profileLogo.vue';
import HashTag from '@/components/icons/hashTagLogo.vue'
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
          <button class="sideBtn">Twettar</button>
        </div>
        <div class="botton">
            <div class="picAndName">
                <img class="pic" src="https://pyxis.nymag.com/v1/imgs/d8e/265/8647a0155d65e195130745751c6682e17d-cowboy-bebop-.rsquare.w330.jpg" alt="">
                <div class="name">
                    <span> Spike Siegel</span>
                    <span class="username"> @Siegel__spike</span>
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
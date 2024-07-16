<script setup lang="ts">
import { postTweet } from '@/services/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const content = ref<string>('');


function closeModal(){
  const modal = document.getElementById("modal-tweet");
  if(modal){
    modal.style.display = "none";
  }
}

async function handlePostTweet(){
  await postTweet({
    id: "",
  content: content.value,
  user_id: 0
  });


  closeModal();

}
</script>


<template>
    <div class="modal" id="modal-tweet">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <button class="delete" @click="closeModal">X</button>
        </header>
        <section class="modal-card-body">
          <textarea type="content" class="text" placeholder="O que está acontecendo?" v-model="content"></textarea>
        </section>
        <footer class="modal-card-foot">
          <button class="tweet-button" @click="handlePostTweet" >Tweetar</button>
        </footer>
      </div>
    </div>

  </template>
  
  
  <style>
  .text {
  font-size:20px;
  width: 100%;
  height: 100%;
}
.modal {
    display: none;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal-card {
    width: 600px;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
  }
  .modal-card-head,
  .modal-card-foot {
    padding: 1rem;
    background-color: white;
  }
  .modal-card-body {
    padding: 16px;
    width: 100%;
    height: 300px
  }
  textarea {
    width: 100%;
    height: 100px;
    resize: none;
    padding: 10px;
    border:none;
    border-radius: 4px;
  }
  .delete {
    background-color: white;
    border: none;
    font-weight: lighter;
    font-size: 25px;
  }
  .modal-card-foot {
    border-top: 1px #ddd solid;
    display: flex;
    justify-content: right;
  }
  .tweet-button {
    background-color: #289ef0;
    font-size: 16px;
    border: 1px solid #289ef0;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 16px;
  }
  .tweet-button:hover {
    color: #289ef0;
    background-color: white;
    /* border: #289ef0 solid 1px; */
  }

  .delete:hover{
    color: #289ef0;
  }
  </style>
  
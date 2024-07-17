<script setup lang="ts">
import { postTweet } from '@/services/api';
import { ref } from 'vue';

const content = ref<string>('');
const visible = ref<boolean>(true);

const emit = defineEmits(['close']);

function closeModal() {
  emit('close');
}

async function handlePostTweet(){
  await postTweet(content.value);

  closeModal();
}
</script>


<template>
    <div v-if="visible" class="modal" id="modal-tweet">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <button class="delete" @click="closeModal">x</button>
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
  width: 90%;
  height: 90%;
}
.text:focus {
  outline: none;
}
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  @keyframes scale-in {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  }

  .modal-card {
    -webkit-animation: scale-in 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940);
	  animation: scale-in 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940);
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
  
<script setup lang="ts"></script>

<template>
  <div class="container1">
    <div>
      <img
        class="img-avatar"
        src="https://th.bing.com/th/id/OIP.tXKGs73UYjBEZSclUWLSMAHaHa?rs=1&pid=ImgDetMain"
        alt="logo1"
      />
    </div>
    <div>
      <div class="tweet-identity">
        <p class="nick-name">NickName</p>
        <p>@username</p>
        <p>posted_since</p>
      </div>
      <div>
        <p>content</p>
      </div>
      <div class="tweet-pop">
        <p>💬coments</p>
        <p>🤍likes</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container1 {
  display: flex;
  border: solid 1px lightgrey;
  margin: auto;
}
p {
  margin: 5px 0;
}

.img-avatar {
  height: 3rem;
  border-radius: 50%;
  margin: 10px;
}
.tweet-identity {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.nick-name {
  font-weight: bold;
}
.tweet-pop {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>

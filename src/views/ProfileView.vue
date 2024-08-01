<script setup lang="ts">
import SideBar from '@/components/SideBar.vue';
import defaultAvatar from '@/assets/default-avatar.png';
import ListCard from '@/components/ListCard.vue';
import { edit, getUser, showPosts } from '@/services/api';
import type { TweetType } from '@/types/TweetType';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import { onMounted, reactive, ref } from 'vue';
import default_avatar from '@/assets/default-avatar.png';
import type { CreateAccountType, RegisterAccountValidationType, UserType } from '@/types';
import useAvatar from '@/services/avatar';
import axios from 'axios';
import ExploreComponent from '@/components/ExploreComponent.vue';

const loadingVisible = ref<boolean>(false);
const loadingVisibleModal = ref<boolean>(false);

const item = ref<UserType>({
  name: '',
  surname: '',
  username: '',
  email: '',
  password: '',
  avatar_url: defaultAvatar
});

const editDialog = ref<boolean>(false);

async function handleGetUser() {
  const userData = localStorage.getItem('userData');

  if (!userData) {
    const response = await getUser();
    item.value = response.data.data;
    localStorage.setItem('userData', JSON.stringify(item.value));
    return;
  }

  item.value = JSON.parse(userData);

  account.username = item.value.username;
  account.name = item.value.name;
  account.surname = item.value.surname;
  account.email = item.value.email;
  account.password = item.value.password;
}

// MODAL

const account = reactive<CreateAccountType>({
  username: item.value.username,
  name: item.value.name,
  surname: item.value.surname,
  email: item.value.email,
  password: item.value.password,
  avatar_url: undefined
});

const validationErrors = reactive<RegisterAccountValidationType>({
  username: [],
  name: [],
  surname: [],
  email: [],
  password: [],
  avatar: []
});

const { previewAvatar, loadFileToPreview } = useAvatar();

const clearValidationErrors = () => {
  for (const key in validationErrors) {
    validationErrors[key as keyof RegisterAccountValidationType] = [];
  }
};

const bindCustomAvatar = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) {
    return;
  }
  const file = input.files[0];
  account.avatar_url = loadFileToPreview(file);
};

const uploadToCloudinary = async (file: File): Promise<string> => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload avatar');
  }
};

const handleEdit = async () => {
  try {
    loadingVisibleModal.value = true;

    let avatarUrl = '';
    if (account.avatar_url instanceof File) {
      avatarUrl = await uploadToCloudinary(account.avatar_url);
    }

    clearValidationErrors();

    const userId = JSON.parse(localStorage.getItem('userData') as string);

    const userData = {
      id: userId.id,
      name: account.name,
      surname: account.surname,
      email: account.email,
      password: account.password,
      username: account.username,
      avatar_url: avatarUrl !== '' ? avatarUrl : account.avatar_url
    };

    const response = await edit(userData);

    if (response.status === 201 || response.status === 200) {
      localStorage.setItem('userData', JSON.stringify(response.data.data));

      await fetchTweets();
      handleGetUser();

      loadingVisibleModal.value = false;

      editDialog.value = false;
    } else if (response.status === 422) {
      const errors = response.data.errors;
      loadingVisibleModal.value = false;
      for (const key in errors) {
        validationErrors[key as keyof RegisterAccountValidationType] = errors[key];
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// END MODAL

onMounted(() => {
  handleGetUser();
  fetchTweets();
});

const tweets = ref<TweetType[]>([]);
const endpoint = '/postsbyuserauth';

async function fetchTweets() {
  loadingVisible.value = true;

  const response = await showPosts(endpoint);

  loadingVisible.value = false;
  tweets.value = response.data.data;
}
</script>
<template>
  <div>
    <div class="home-container">
      <div class="home-nav">
        <SideBar :item="item" />
      </div>
      <div class="home-content">
        <span class="home-content-title">
          <div class="profile-top">
            <img class="arrow-profile" src="../assets/icone_seta.svg" alt="" />
            <div class="profile-header">
              <span class="title"> Perfil de {{ item.username }} </span>
              <p class="tweet-count">{{ tweets.length }} tweets</p>
              <!-- <img class="profile-pic" src="https://pyxis.nymag.com/v1/imgs/d8e/265/8647a0155d65e195130745751c6682e17d-cowboy-bebop-.rsquare.w330.jpg" alt=""> -->
              <img class="profile-pic" :src="item.avatar_url ?? default_avatar" alt="" />
              <div class="name-username">
                <h3>{{ item.name }} {{ item.surname }}</h3>
                <h6>@{{ item.username }}</h6>
              </div>
            </div>
          </div>

          <button class="edit-btn" @click="editDialog = true">Editar</button>

          <div class="spinner-div d-flex justify-center mt-5">
            <SpinnerComponent v-if="loadingVisible" color="blue" />
          </div>

          <template>
            <div class="pa-4 text-center">
              <v-dialog v-model="editDialog" max-width="600">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    class="text-none font-weight-regular"
                    prepend-icon="mdi-account"
                    text="Edit Profile"
                    variant="tonal"
                    v-bind="activatorProps"
                  ></v-btn>
                </template>

                <!-- Modal de edição de perfil -->
                <v-card class="mx-auto mt-6 pa-12 pb-8" elevation="8" min-width="720" rounded="lg">
                  <div>
                    <h1 class="mt-1 text-center">Editar perfil</h1>
                    <div class="text-subtitle-1 text-medium-emphasis">Nome</div>
                    <v-text-field
                      density="compact"
                      :placeholder="account.name.toUpperCase()"
                      prepend-inner-icon="mdi-account-outline"
                      variant="outlined"
                      v-model="account.name"
                      :error-messages="validationErrors.name"
                    ></v-text-field>

                    <div class="mt-1 text-subtitle-1 text-medium-emphasis">Sobrenome</div>
                    <v-text-field
                      density="compact"
                      :placeholder="account.surname.toUpperCase()"
                      prepend-inner-icon="mdi-account-outline"
                      variant="outlined"
                      v-model="account.surname"
                      :error-messages="validationErrors.surname"
                    ></v-text-field>

                    <div class="text-subtitle-1 text-medium-emphasis">Nome de usuário</div>
                    <v-text-field
                      density="compact"
                      :placeholder="account.username"
                      prepend-inner-icon="mdi-account-outline"
                      variant="outlined"
                      v-model="account.username"
                      :error-messages="validationErrors.username"
                    ></v-text-field>

                    <div class="mt-1 text-center text-subtitle-1 text-medium-emphasis">
                      Escolha um avatar (opcional):
                    </div>
                    <div class="d-flex justify-center my-4 ga-2 upload-avatar-container">
                      <v-file-input
                        class="d-none"
                        accept="image/png, image/jpeg, image/jpg"
                        label="Avatar"
                        @change="bindCustomAvatar"
                        id="avatar"
                      ></v-file-input>
                      <label class="upload-avatar-label" for="avatar">
                        <v-avatar :image="previewAvatar ?? item.avatar_url" size="75"></v-avatar>
                      </label>
                      <div v-if="validationErrors.avatar.length > 0">
                        <p
                          class="error-avatar-message"
                          v-for="error in validationErrors.avatar"
                          :key="error"
                        >
                          {{ error }}
                        </p>
                      </div>
                    </div>

                    <v-btn
                      @click="handleEdit"
                      class="mb-2"
                      color="blue"
                      size="large"
                      variant="flat"
                      block
                      :disabled="loadingVisibleModal"
                    >
                      <span v-if="!loadingVisibleModal"> Editar Perfil </span>
                      <div class="d-flex justify-center" v-if="loadingVisibleModal">
                        <v-progress-circular indeterminate color="white" :size="20" :width="3" />
                      </div>
                    </v-btn>
                  </div>
                </v-card>
              </v-dialog>
            </div>
          </template>
        </span>

        <ListCard :tweets="tweets" />
      </div>
      <ExploreComponent />
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.spinner-div {
  position: absolute;
  left: 46%;
  top: 50%;
}

.edit-btn {
  font-size: 0.8rem;
  align-self: first baseline;
  margin-bottom: 1rem;
  margin-left: 1rem;
  background-color: #289ef0;
  border: #289ef0 1px solid;
  color: #ffffff;
  height: 1.3rem;
  width: 3.5rem;
  border-radius: 0.5rem;
}

.edit-btn:hover {
  color: #289ef0;
  background-color: #ffffff;
  border: 1px solid #289ef0;
}

.name-username {
  margin-top: 0.6rem;
  margin-bottom: 0.5rem;
}

h3 {
  font-size: 1rem;
}
h6 {
  font-size: 0.8rem;
}

.profile-top {
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
}

.profile-pic {
  width: 7rem;
  height: 7rem;
  border: 4px solid #e9e9e9;
  border-radius: 50%;
  margin-top: 1rem;
}

.profile-pic:hover {
  border: 4px solid #289ef0;
}

.profile-header {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 1.1rem;
}

.tweet-count {
  font-size: 0.8rem;
  color: rgb(110, 110, 110);
}

.arrow-profile {
  margin: 1rem;
  height: 0.7rem;
}

.home-container {
  display: flex;

  width: 100%;
  height: 100%;
  background: #ffffff;
}

.home-nav {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 20%;
  height: 100vh;
  background: #ffffff;
  position: sticky;
  top: 0;
  color: white;
}

.home-nav-component {
  width: 90%;
  height: 100%;
  padding: 1em 0 0 1em;
  background-color: black;
}

.home-content {
  width: 55%;
  height: 100%;
  border-right: 2px solid #e9e9e9;
  border-left: 2px solid #e9e9e9;
}

.home-content-title {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;
  height: 16rem;
  border-bottom: 2px solid #e9e9e9;
  font-weight: 600;
  font-size: 1.3rem;
  font-style: normal;
}
</style>

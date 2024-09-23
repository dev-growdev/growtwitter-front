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
  <v-app id="app">
    <v-navigation-drawer width="470" class="border-0 pa-0">
      <SideBar :item="item" />
    </v-navigation-drawer>

    <ApplicationBar class="d-flex d-lg-none" />

    <SpinnerComponent v-if="loadingVisible" class="spinner-div" color="blue" />

    <v-main>
      <v-container class="pa-0">
        <v-row>
          <v-col cols="12" v-if="!loadingVisible" class="border px-4 px-md-0 mx-0 mx-md-4">
            <div class="wrapper-profile">
              <div class="profile-top">
                <div style="display: flex; align-items: first baseline; gap: 10px">
                  <a href="/"
                    ><img class="arrow-profile" src="../assets/icone_seta.svg" alt=""
                  /></a>
                  <div style="display: flex; flex-direction: column">
                    <span style="font-weight: 700"> Perfil de {{ item.username }} </span>
                    <p style="font-size: small">{{ tweets.length }} tweets</p>
                  </div>
                </div>

                <button @click="editDialog = true"><span>Editar</span></button>
              </div>
              <div class="profile-header">
                <img class="profile-pic" :src="item.avatar_url ?? default_avatar" alt="" />
                <div class="name-username">
                  <h3>{{ item.name }} {{ item.surname }}</h3>
                  <h6>@{{ item.username }}</h6>
                </div>
              </div>
              <div class="spinner-div d-flex justify-center mt-5">
                <SpinnerComponent v-if="loadingVisible" color="blue" />
              </div>

              <template>
                <div class="text-center" style="background-color: brown">
                  <v-dialog v-model="editDialog" class="profile-dialog">
                    <!-- Modal de edição de perfil -->
                    <v-card class="mx-auto pa-12 pb-8 profile-card" elevation="8">
                      <v-btn icon class="close-btn" @click="editDialog = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>

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
                            <v-avatar
                              :image="previewAvatar ?? item.avatar_url"
                              size="75"
                            ></v-avatar>
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
                            <v-progress-circular
                              indeterminate
                              color="white"
                              :size="20"
                              :width="3"
                            />
                          </div>
                        </v-btn>
                      </div>
                    </v-card>
                  </v-dialog>
                </div>
              </template>
            </div>
          </v-col>
          <v-col>
            <ListCard :tweets="tweets" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-navigation-drawer width="455" location="right" class="border-0 pa-2">
      <ExploreComponent />
    </v-navigation-drawer>
  </v-app>
</template>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.profile-top {
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
  justify-content: space-between;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
}

.profile-header {
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.profile-pic {
  width: 7rem;
  height: 7rem;
  border: 4px solid #e9e9e9;
  border-radius: 50%;
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
.spinner-div {
  position: absolute;
  left: 46%;
  top: 50%;
}


.home-content {
  width: 55%;
  height: 100%;
  border-right: 2px solid #e9e9e9;
  border-left: 2px solid #e9e9e9;
  border-bottom: 2px solid #e9e9e9;
}

button {
  outline: none;
  cursor: pointer;
  border: none;
  padding: 0.4rem 1rem;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  position: relative;
  display: inline-block;
  letter-spacing: 0.05rem;
  font-weight: 700;
  font-size: 14px;
  border-radius: 500px;
  overflow: hidden;
  background: #23a6d5;
  color: ghostwhite;
}

button span {
  position: relative;
  z-index: 10;
  transition: color 0.4s;
}

button:hover span {
  color: white;
}

button::before,
button::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

button::before {
  content: '';
  background: #000;
  width: 120%;
  left: -10%;
  transform: skew(30deg);
  transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
}

button:hover::before {
  transform: translate3d(100%, 0, 0);
}
</style>

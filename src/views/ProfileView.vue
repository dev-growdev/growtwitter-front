<script setup lang="ts">
import SideBar from '@/components/SideBar.vue';
import defaultAvatar from '@/assets/default-avatar.png';
import ListCard from '@/components/ListCard.vue';
import {
  edit,
  getUser,
  showPosts,
  getUserbyId,
  getFollowersAndFollowingById,
  postFollow
} from '@/services/api';
import type { TweetType } from '@/types/TweetType';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import { onMounted, reactive, ref } from 'vue';
import default_avatar from '@/assets/default-avatar.png';
import type { CreateAccountType, RegisterAccountValidationType, UserType } from '@/types';
import useAvatar from '@/services/avatar';
import axios from 'axios';
import ExploreComponent from '@/components/ExploreComponent.vue';
import { useRoute } from 'vue-router';
import ApplicationBar from '@/components/ApplicationBar.vue';
const route = useRoute();

const loadingVisible = ref<boolean>(false);
const loadingVisibleModal = ref<boolean>(false);

const item = ref<UserType>({
  name: '',
  surname: '',
  username: '',
  email: '',
  password: '',
  avatar_url: defaultAvatar,
  id: 0,
  followers_count: 0,
  following_count: 0
});

const anotherUser = ref<UserType>({
  name: '',
  surname: '',
  username: '',
  email: '',
  password: '',
  avatar_url: defaultAvatar,
  id: 0,
  followers_count: 0,
  following_count: 0
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
  account.id = item.value.id;
}

// MODAL

const account = reactive<CreateAccountType>({
  id: item.value.id,
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

const isFollowing = ref<boolean>(false);
const btnLoading = ref<boolean>(false);

async function getFollowersAndFollowing(id: number) {
  try {
    const response = await getFollowersAndFollowingById(id);
    if (
      response.data.followersData.some((follower: any) => follower.followerId === item.value.id)
    ) {
      isFollowing.value = true;
    }
    anotherUser.value.followers_count = response.data.followings;
    anotherUser.value.following_count = response.data.followers;
  } catch (error) {
    console.log(error);
  }
}
async function handleFollow() {
  try {
    btnLoading.value = true;
    console.log(anotherUser.value.followers_count);

    const response = await postFollow(route.params.id, item.value.id);
    console.log(response);
    if (isFollowing.value) {
      anotherUser.value.following_count--;
      isFollowing.value = false;
    } else {
      anotherUser.value.following_count++;
      isFollowing.value = true;
    }
    btnLoading.value = false;
  } catch (error) {
    console.log(error);
  }
}

async function getuserbyid(id: number) {
  try {
    loadingVisible.value = true;
    const response = await getUserbyId(id);
    loadingVisible.value = false;

    anotherUser.value = response.data.data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getuserbyid(route.params.id);
  getFollowersAndFollowing(route.params.id);
  handleGetUser();
  fetchTweets();
});

const tweets = ref<TweetType[]>([]);
const endpoint = '/posts/' + route.params.id;

async function fetchTweets() {
  loadingVisible.value = true;
  const response = await showPosts(endpoint);

  loadingVisible.value = false;
  tweets.value = response.data.data;
}
</script>

<template>
  <v-app class="ma-0" id="app">
    <v-navigation-drawer width="470" class="d-none d-md-flex border-0 pa-0">
      <SideBar :item="item" />
    </v-navigation-drawer>

    <ApplicationBar class="d-flex d-lg-none" />

    <SpinnerComponent v-if="loadingVisible" class="spinner-div" color="blue" />

    <!-- Modal para editar o perfil -->
    <template>
      <div class="text-center" style="background-color: brown">
        <v-dialog v-model="editDialog">
          <v-card class="pa-12 pb-8 profile-card" elevation="8">
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

    <v-main class="mx-0 mx-md-4">
      <v-container class="mt-0 pa-0">
        <v-row class="border ga-4">
          <v-col class="pa-0 ma-0">
            <v-img class="bg-grey" height="215" aspect-ratio="16/9" cover />
            <img
              class="profile-img mx-4 rounded-circle border-md"
              width="100"
              height="100"
              :src="anotherUser.avatar_url ?? default_avatar"
              alt=""
            />
          </v-col>
          <v-col cols="12" class="d-flex flex-row justify-end ga-2 py-4 py-md-0 px-4">
            <button v-if="item.id === anotherUser.id" @click="editDialog = true">
              <span>Editar</span>
            </button>
            <v-btn
              :loading="btnLoading"
              class="d-flex justify-start align-self-start"
              height="32"
              @click="handleFollow"
            >
              <span>{{ isFollowing ? 'Seguindo' : 'Seguir' }}</span>
            </v-btn>
          </v-col>
          <v-col class="py-0 px-4">
            <v-list class="py-0">
              <div class="d-flex flex-column">
                <span class="text-h4 font-weight-bold"
                  >{{ anotherUser.name }} {{ anotherUser.surname }}</span
                >
                <span class="text-h6">@{{ anotherUser.username }}</span>
              </div>
              <div class="d-flex ga-4">
                <p class="text-h7">
                  <span class="font-weight-bold">{{ anotherUser.followers_count ?? '0' }}</span>
                  seguidores
                </p>
                <p class="text-h7">
                  <span class="font-weight-bold">{{ anotherUser.following_count ?? '0' }}</span>
                  seguindo
                </p>
                <p class="text-h7">
                  <span class="font-weight-bold">{{ tweets.length }}</span> posts
                </p>
              </div>
            </v-list>
          </v-col>
          <v-col cols="12">
            <ListCard :tweets="tweets" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-navigation-drawer width="455" location="right" class="d-none d-md-flex border-0 pa-2">
      <ExploreComponent />
    </v-navigation-drawer>
  </v-app>
</template>

<style scoped>
@media (max-width: 600px) {
  .profile-card {
    margin: 0 0vw;
  }
}

@media (min-width: 600px) {
  .profile-card {
    margin: 0 20vw;
  }
}

@media (max-width: 600px) {
  .spinner-div {
    position: absolute;
    top: 50%;
  }
}

.spinner-div {
  position: absolute;
  top: 60%;
  left: 45%;
}

.profile-img {
  position: absolute;
  top: 17dvh;
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

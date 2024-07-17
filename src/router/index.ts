import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/loginView.vue';
import ProfileView from '@/views/ProfileView.vue';
import RegisterView from '@/views/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login-user',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    }
    // TODO: ADD Route for explore when view has crated
  ]
});

// Structure to use checklogged

// router.beforeEach(async (to) => {
//   if (
//     (getToken() && to.name === "login") ||
//     (getToken() && to.name === "register")
//   ) {
//     return { name: "home" };
//   }

//   if (!getToken() && to.name === "home") {
//     return { name: "login" };
//   }
// });

export default router;

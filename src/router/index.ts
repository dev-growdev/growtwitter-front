import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/loginView.vue';
import ProfileView from '@/views/ProfileView.vue';
import RegisterView from '@/views/RegisterView.vue';
import { isUserAuthenticated } from '@/services/authentication';

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
      name: 'login',
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

router.beforeEach((to) => {
  if (!isUserAuthenticated() && to.name !== 'login' && to.name !== 'register') {
    return { name: 'login' };
  } else if (isUserAuthenticated() && (to.name === 'login' || to.name === 'register')) {
    return { name: 'home' };
  }
  return true;
});

export default router;

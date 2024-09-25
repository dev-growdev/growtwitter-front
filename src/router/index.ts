import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/loginView.vue';
import ProfileView from '@/views/ProfileView.vue';
import RegisterView from '@/views/RegisterView.vue';
import { isUserAuthenticated } from '@/services/authentication';
import ExploreView from '@/views/ExploreView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home - GrowTwitter'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Login - GrowTwitter'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Register - GrowTwitter'
      }
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: ProfileView,
      meta: {
        title: 'Perfil - GrowTwitter'
      }
    },
    {
      path: '/explore',
      name: 'explore',
      component: ExploreView,
      meta: {
        title: 'Explorar - GrowTwitter'
      }
    }
  ]
});

router.afterEach((to) => {
  const nearestTitle = to.meta?.title;
  if (nearestTitle) document.title = nearestTitle;
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

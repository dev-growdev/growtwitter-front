import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/loginView.vue';
import ProfileView from '@/views/ProfileView.vue';
import RegisterView from '@/views/RegisterView.vue';
import { isUserAuthenticated } from '@/services/authentication';
import ExploreView from '@/views/ExploreView.vue';
import ForgotView from '@/views/ForgotView.vue';
import ResetView from '@/views/ResetView.vue';

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
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: ForgotView,
      meta: {
        title: 'Esqueceu sua senha - GrowTwitter'
      }
    }
    ,
    {
      path: '/reset',
      name: 'reset',
      component: ResetView,
      meta: {
        title: 'Redefinir sua senha - GrowTwitter'
      }
    }
  ]
});

router.afterEach((to) => {
  const nearestTitle = to.meta?.title as string;
  if (nearestTitle) document.title = nearestTitle;
});

router.beforeEach((to) => {
  if (!isUserAuthenticated() && to.name !== 'login' && to.name !== 'register' && to.name !== 'forgot' && to.name !== 'reset') {
    return { name: 'login' };
  } else if (isUserAuthenticated() && (to.name === 'login' || to.name === 'register')) {
    return { name: 'home' };
  }
  return true;
});

export default router;

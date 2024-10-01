import type { Router } from 'vue-router';

export async function isLogged(router: Router) {
  sessionStorage.removeItem('token');
  return router.push('/login');
}

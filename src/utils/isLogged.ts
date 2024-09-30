import { isTokenAuthenticated } from '@/services/authentication';
import type { Router } from 'vue-router';

export async function isLogged(router: Router) {
  //descobri que o router não pode ser usado dentro de funções no vue3 só pode ser chamada dentro de um "setup" de um componente ou função que seja parte do ciclo de vida de um componente em Vue 3
  const token = await isTokenAuthenticated();
  const user = sessionStorage.getItem('userData') ?? localStorage.getItem('userData');

  if (user && token) return router.push('/');
  sessionStorage.removeItem('token');
  return router.push('/login');
}

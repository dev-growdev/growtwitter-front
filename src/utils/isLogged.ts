import { useRouter } from 'vue-router';

export async function isLogged() {
  const token = sessionStorage.getItem('token') || localStorage.getIem('token');
  const user = sessionStorage.getItem('userData') || localStorage.getItem('userData');
  const router = useRouter();
  if (user && token) return router.push('/'); // verifica se tem user e token
  sessionStorage.removeItem('token');
  return router.push('/login');
}

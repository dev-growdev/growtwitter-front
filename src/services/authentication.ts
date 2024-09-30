import { client } from './api';

export function isUserAuthenticated() {
  return localStorage.getItem('token') || sessionStorage.getItem('token') ? true : false;
}

export async function isTokenAuthenticated() {
  try {
    const token = getUserToken();
    const config = {
      headers: { Authorization: `Bearer ${getUserToken()}` }
    };

    const response = await client.get(`logout/${token}`, config);

    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}

export function getUserToken() {
  return localStorage.getItem('token') ?? sessionStorage.getItem('token');
}

export function resetStorage() {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
}

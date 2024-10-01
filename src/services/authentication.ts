import { client } from './api';

export function isUserAuthenticated() {
  return localStorage.getItem('token') || sessionStorage.getItem('token') ? true : false;
}

export function getUserToken() {
  return localStorage.getItem('token') ?? sessionStorage.getItem('token');
}

export function resetStorage() {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
}

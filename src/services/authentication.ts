export function isUserAuthenticated() {
  return localStorage.getItem('token') || sessionStorage.getItem('token') ? true : false;
}

export function getUserToken() {
  return localStorage.getItem('token') ?? sessionStorage.getItem('token');
}

export function isUserAuthenticated() {
  return localStorage.getItem('token') || sessionStorage.getItem('token') ? true : false;
}

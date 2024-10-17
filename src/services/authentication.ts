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

export function getUserId() {
  const userId = sessionStorage?.getItem('userId')
  if(userId){
    return JSON.parse(userId);
  }
}

import axios from 'axios';

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function doGet(url: string) {
  try {
    const response = await client.get(url);

    return response?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function showPostsUser() {
  const id = 1; //aqui no lugar de 1, preciso acessar o id do usuario que está logado
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
  };
  try {
    const response = await client.get(`/posts/${id}`, config);
    return response;
  } catch (error) {
    return false;
  }
}

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
<<<<<<< HEAD
=======
  const id = 1; //aqui no lugar de 1, preciso acessar o id do usuario que está logado
>>>>>>> d633638ebd29555dad0816260f488bc00a265719
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
  };
  try {
<<<<<<< HEAD
    const response = await client.get(`/users/`, config);
=======
    const response = await client.get(`/posts/${id}`, config);
>>>>>>> d633638ebd29555dad0816260f488bc00a265719
    return response;
  } catch (error) {
    return false;
  }
}

import axios from 'axios';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const login = async (email: string, password: string) => {
  try {
    const response = await client.post('/login', {
      email,
      password
    });

    if (response.status == 200) {
      sessionStorage.setItem('token', response.data.data.token);
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return { error: true, message: 'Usuário ou senha incorretos.' };
  }
};

export async function register(formData: FormData) {
  try {
    return await client.post('/users', formData);
  } catch (error) {
    return error?.response;
  }
}

export async function doGet(url: string) {
  try {
    const response = await client.get(url);

    return response?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function showPosts(endpoint: string) {
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
  };
  try {
    const response = await client.get(endpoint, config);
    return response;
  } catch (error) {
    return false;
  }
}

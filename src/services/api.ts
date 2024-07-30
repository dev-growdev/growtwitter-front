import axios from 'axios';
import { getUserToken } from './authentication';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json'
  }
});

export const login = async (email: string, password: string) => {
  try {
    const response = await client.post('/login', {
      email,
      password
    });

    return response;
  } catch (error: any) {
    return error?.response;
  }
};

export async function logout() {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };
  try {
    return await client.delete('/logout', config);
  } catch (error: any) {
    return error?.reponse;
  }
}

export async function register(userData: any) {
  try {
    return await client.post('/users', userData);
  } catch (error: any) {
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
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };
  try {
    const response = await client.get(endpoint, config);
    return response;
  } catch (error: any) {
    return error?.response;
  }
}

export async function postTweet(content: string) {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };
  try {
    return await client.post('/posts', { content }, config);
  } catch (error) {
    return error;
  }
}

export const getUser = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };

  try {
    const response = await client.get('/users', config);

    return response;
  } catch (error: any) {
    return error?.response;
  }
};

export async function postLike(postId: number) {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };
  try {
    return await client.post('/likes', { postId }, config);
  } catch (error) {
    return error;
  }
}

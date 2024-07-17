import type { TweetType } from '@/types';
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
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


export async function postTweet(content:string) {
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
  }
  try {
    return await client.post('/posts', content, config);
  } catch (error) {
    return error;
  }
}

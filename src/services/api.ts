import axios from 'axios';
import { configMyRequest } from './CookiesRequestService';
import type { UserDataType } from '@/types/UserDataType';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json'
  }
});

export const login = async (email: string, password: string) => {
  try {
    const config = await configMyRequest(false);

    const response = await client.post(
      '/login',
      {
        email,
        password
      },
      config
    );

    sessionStorage.setItem('userId', response.data.data.user.id);

    return response;
  } catch (error: any) {
    return error?.response;
  }
};

export async function logout() {
  try {
    const config = await configMyRequest();

    return await client.delete('/logout', config);
  } catch (error: any) {
    return error?.reponse;
  }
}

export async function register(userData: UserDataType) {
  try {
    const config = await configMyRequest(false);
    
    return await client.post(
      '/users',
      userData,
      config
    );
  } catch (error: any) {
    return error?.response;
  }
}

export async function edit(userData: UserDataType) {
  try {
    const config = await configMyRequest();

    return await client.put(`/users/${userData.id}`, userData, config);
  } catch (error: any) {
    return error?.response;
  }
}

export async function doGet(url: string) {
  try {
    const config = await configMyRequest();

    const response = await client.get(url, config);

    return response?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function showPosts(endpoint: string) {
  try {
    const config = await configMyRequest();

    return await client.get(endpoint, config);
  } catch (error: any) {
    return error?.response;
  }
}

export async function postTweet(content: string) {
  try {
    const config = await configMyRequest();

    const response = await client.post('/posts', { content }, config);

    return response;
  } catch (error) {
    return error;
  }
}

export const getUser = async () => {
  try {
    const config = await configMyRequest();

    const response = await client.get('/users', config);

    return response;
  } catch (error: any) {
    return error?.response;
  }
};

export const getUserbyId = async (id: string) => {
  try {
    const config = await configMyRequest();

    const response = await client.get('/users/' + id, config);

    return response;
  } catch (error: any) {
    return error?.response;
  }
};

export const getFollowersAndFollowingById = async (id: string) => {
  try {
    const config = await configMyRequest();

    const response = await client.get('/follow/' + id, config);

    return response;
  } catch (error: any) {
    return error?.response;
  }
};

export const postFollow = async (followingId: string, followerId: string) => {
  try {
    const config = await configMyRequest();

    const data = {
      followingId: followingId,
      followerId: followerId
    };

    const response = await client.post('/follow/', data, config);

    return response;
  } catch (error: any) {
    return error?.response;
  }
};

export const postRetweet = async (postId: number, content?: string) => {
  try {
    const config = await configMyRequest();

    const data = {
      postId: postId,
      content: content
    };
    const response = await client.post('/retweet', data, config);

    return response;
  } catch (error: any) {
    return error?.response;
  }
};

export async function getRetweet() {
  try {
    const config = await configMyRequest();

    const response = await client.get(`/retweet`, config);
    return response;
  } catch (error: any) {
    return error?.response;
  }
}

export async function postLike(postId: number) {
  try {
    const config = await configMyRequest();

    await client.post('/likes', { postId }, config);
    return true;
  } catch (error) {
    return false;
  }
}

export async function postComment(postId: number, content: string) {
  try {
    const config = await configMyRequest();

    return await client.post('/comment', { postId, content }, config);
  } catch (error) {
    return error;
  }
}

export const getProfileData = async (id: string) => {
  try {
    const config = await configMyRequest();

    const response = await client.get('/profile/' + id, config);
    return response;
  } catch (error: any) {
    return error?.response;
  }
};
export const getHomeData = async () => {
  try {
    const config = await configMyRequest();

    const response = await client.get('/home', config);
    return response;
  } catch (error: any) {
    return error?.response;
  }
};

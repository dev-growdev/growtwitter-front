import axios from 'axios';
import { configMyRequest } from './CookiesRequestService';
import type { UserDataType } from '@/types/UserDataType';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json'
  }
});

// Login - Register - Methods
export async function login(email: string, password: string) {
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
}

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

    return await client.post('/users', userData, config);
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

export async function showFollowing(endpoint: string) {
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

export async function getUser() {
  try {
    const config = await configMyRequest();

    const response = await client.get('/users', config);

    return response;
  } catch (error: any) {
    return error?.response;
  }
}

export async function getUserbyId(id: string) {
  try {
    const config = await configMyRequest();

    const response = await client.get('/users/' + id, config);

    return response;
  } catch (error: any) {
    return error?.response;
  }
}

export async function getFollowersAndFollowingById(id: string) {
  try {
    const config = await configMyRequest();

    const response = await client.get('/follow/' + id, config);

    return response;
  } catch (error: any) {
    return error?.response;
  }
}

export async function postFollow(followingId: string, followerId: string) {
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
}

export async function postRetweet(postId: number, content?: string) {
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
}

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

export async function getProfileData(id: string, page: number) {
  try {
    const config = await configMyRequest();
    const response = await client.get('/profile/' + id + '?page=' + page, config);

    return response;
  } catch (error: any) {
    return error?.response;
  }
}

export async function getHomeData(page: number) {
  try {
    const config = await configMyRequest();
    const response = await client.get('/home?page=' + page, config);

    return response;
  } catch (error: any) {
    return error?.response;
  }
}

export async function deleteTweet(postID: number) {
  try {
    const config = await configMyRequest();

    await client.delete(`/posts/${postID}`, config);
  } catch (error: any) {
    return error?.response;
  }
}

export async function deleteRetweet(retweetID: number) {
  try {
    const config = await configMyRequest();

    await client.delete(`/retweet/${retweetID}`, config);
  } catch (error: any) {
    return error?.response;
  }
}

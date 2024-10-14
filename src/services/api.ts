import axios from 'axios';
import { getUserToken } from './authentication';
export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json'
  }
});

// Login - Register - Methods
export const login = async (email: string, password: string) => {
  try {
    const response = await client.post('/login', {
      email,
      password
    });
    sessionStorage.setItem('userId', response.data.data.user.id);
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

export async function edit(userData: any) {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getUserToken()}` }
    };
    return await client.put(`/users/${userData.id}`, userData, config);
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
    return await client.get(endpoint, config);
  } catch (error: any) {
    return error?.response;
  }
}

export async function postTweet(content: string) {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };
  try {
    const response = await client.post('/posts', { content }, config);
    return response;
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

export const getUserbyId = async (id: string) => {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };

  try {
    const response = await client.get('/users/' + id, config);

    return response;
  } catch (error: any) {
    return error?.response;
  }
};

export const getFollowersAndFollowingById = async (id: string) => {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };

  try {
    const response = await client.get('/follow/' + id, config);

    return response;
  } catch (error: any) {
    return error?.response;
  }
};

export const postFollow = async (followingId: string, followerId: string) => {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };
  const data = {
    followingId: followingId,
    followerId: followerId
  };
  try {
    const response = await client.post('/follow/', data, config);

    return response;
  } catch (error: any) {
    return error?.response;
  }
};

export const postRetweet = async (postId: number, content?: string) => {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };
  const data = {
    postId: postId,
    content: content
  };
  try {
    const response = await client.post('/retweet', data, config);

    return response;
  } catch (error: any) {
    return error?.response;
  }
};

export async function getRetweet() {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };
  try {
    const response = await client.get(`/retweet`, config);
    return response;
  } catch (error: any) {
    return error?.response;
  }
}

export async function postLike(postId: number) {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };
  try {
    await client.post('/likes', { postId }, config);
    return true;
  } catch (error) {
    return false;
  }
}

export async function postComment(postId: number, content: string) {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };
  try {
    return await client.post('/comment', { postId, content }, config);
  } catch (error) {
    return error;
  }
}

export const getProfileData = async (id: string, page:number) => {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };

  try {
    const response = await client.get('/profile/' + id + '?page=' + page, config);
    return response;
  } catch (error: any) {
    return error?.response;
  }
};
export const getHomeData = async (page: number) => {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };

  try {
    const response = await client.get('/home?page=' + page, config);
    return response;
  } catch (error: any) {
    return error?.response;
  }
};

export const deleteTweet = async (postID: number) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getUserToken()}` }
    };

    const response = await client.delete(`/posts/${postID}`, config);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteRetweet = async (retweetID: number) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getUserToken()}` }
    };

    const response = await client.delete(`/retweet/${retweetID}`, config);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

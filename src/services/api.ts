import axios from 'axios';

const client = axios.create({
  baseURL: 'https://65089a2a56db83a34d9c8c86.mockapi.io/api/v1',
  headers: {
    'Content-Type': 'application/json'
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
    
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export async function doGet(url: string) {
  try {
    const response = await client.get(url);

    return response?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json'
  }
});

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

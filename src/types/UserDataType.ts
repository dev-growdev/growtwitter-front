export interface UserDataType {
  id?: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  username: string;
  avatar_url: File | string| undefined
}

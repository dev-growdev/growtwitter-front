export interface CreateAccountType {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  avatar_url?: File;
}

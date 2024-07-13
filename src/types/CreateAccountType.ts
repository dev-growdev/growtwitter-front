interface CreateAccountType {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  avatar?: File;
}

export type { CreateAccountType };

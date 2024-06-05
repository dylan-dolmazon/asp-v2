export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  token?: Token;
  password?: string;
  updateAt?: string;
  createdAt?: string;
  role?: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

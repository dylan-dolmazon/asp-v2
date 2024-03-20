export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  token?: Token;
  updateAt?: string;
  createdAt?: string;
  role: string;
};

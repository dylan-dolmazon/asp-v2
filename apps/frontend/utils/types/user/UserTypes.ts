import { number, string } from "yup";

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  accessTokens?: string;
};

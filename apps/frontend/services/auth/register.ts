export const registerUser = async (
  email: string,
  username: string,
  firstname: string,
  lastname: string,
  password: string
) => {
  return useCustomFetch<User>(`user/register`, "POST", {
    email,
    username,
    lastname,
    firstname,
    password,
    role: "user",
  });
};

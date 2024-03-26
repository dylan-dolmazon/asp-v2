export const registerUser = async (
  email: string,
  username: string,
  firstname: string,
  lastname: string,
  password: string
) => {
  return await useCustomFetch<User>(`user/register`, "POST", {
    body: {
      email,
      username,
      lastname,
      firstname,
      password,
    },
  });
};

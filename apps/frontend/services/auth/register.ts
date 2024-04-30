export const registerUser = async (credentials: User) => {
  return await useCustomFetch<User>(`user/register`, "POST", {
    body: { ...credentials },
  });
};

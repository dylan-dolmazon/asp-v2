export const loginUser = async (credentials: UserLogin) => {
  return await useCustomFetch<User>(`user/login`, "POST", {
    body: { ...credentials },
  });
};

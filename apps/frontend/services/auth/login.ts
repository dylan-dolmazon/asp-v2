export const loginUser = async (email: string, password: string) => {
  return await useCustomFetch<User>(`user/login`, "POST", {
    body: { email, password },
  });
};

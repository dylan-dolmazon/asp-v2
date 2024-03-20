export const loginUser = async (email: string, password: string) => {
  return useCustomFetch<User>(`user/login`, "POST", { email, password });
};

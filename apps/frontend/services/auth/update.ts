export const updateUser = async (id: number, userInfos: UserUpdate) => {
  return await useCustomFetch<User>(`user/update/${id}`, "PUT", {
    body: { ...userInfos },
  });
};

type UsersToAdminType = {
  username: string;
  role: string;
}[];

export const updateUserToAdmin = async (users?: UsersToAdminType) => {
  const config = useRuntimeConfig();

  return await useCustomFetch<User>(`user/update`, "PUT", {
    body: { users: users, key: config.public.MODERATOR_KEY },
  });
};

export const getUsers = async (page: Ref, limit: number = 10, name?: Ref) => {
  return await useCustomFetch<{ data: User[]; meta: Meta }>(`user`, "GET", {
    params: {
      page,
      limit,
      name,
    },
  });
};

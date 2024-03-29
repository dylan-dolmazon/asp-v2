export const getPlayer = async (id: string) => {
  return await useCustomFetch<Player>(`players/${id}`);
};

export const deletePlayer = async (id: string) => {
  return await useCustomFetch(`players/${id}`, "DELETE");
};

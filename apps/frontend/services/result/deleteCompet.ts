export const deleteCompet = async (id: number) => {
  return await useCustomFetch(`/compets/${id}`, "DELETE");
};

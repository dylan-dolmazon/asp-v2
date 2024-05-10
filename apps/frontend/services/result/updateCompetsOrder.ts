export const updateCompetsOrder = async (id: number) => {
  return await useCustomFetch(`/compets/new-favorite/${id}`, "PUT");
};

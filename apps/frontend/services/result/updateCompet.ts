export const updateCompet = async (id: number, number?: number) => {
  return await useCustomFetch(`/compets/${id}`, "PUT", {
    body: {
      number: number,
    },
  });
};

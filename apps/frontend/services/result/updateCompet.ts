export const updateCompet = async (
  id: number,
  name?: string,
  number?: number
) => {
  return await useCustomFetch(`/compets/${id}`, "PUT", {
    body: {
      name: name,
      number: number,
    },
  });
};

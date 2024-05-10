export const createCompet = async (compet: Compet) => {
  return await useCustomFetch(`/compets/create`, "POST", {
    body: {
      ...compet,
    },
  });
};

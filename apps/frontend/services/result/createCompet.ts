export const createCompet = async (compet: CreateCompet) => {
  return await useCustomFetch(`/compets/create`, "POST", {
    body: {
      ...compet,
    },
  });
};

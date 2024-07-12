export const createCompet = async (competNumber: number) => {
  return await useCustomFetch(`/compets/create`, "POST", {
    body: {
      number: competNumber,
    },
  });
};

export const getCompetHistory = async (competId: Ref) => {
  return await useCustomFetch<DisplayClassementHistory[]>(
    `/classement-history`,
    "GET",
    {
      params: {
        competId,
      },
    }
  );
};

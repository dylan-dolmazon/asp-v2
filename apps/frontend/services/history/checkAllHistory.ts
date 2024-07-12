export const checkAllHistory = async (competsId: number[], season: string) => {
  return await useCustomFetch<Compet[]>(`/classement-history/check`, "PUT", {
    body: { competsId, season },
  });
};

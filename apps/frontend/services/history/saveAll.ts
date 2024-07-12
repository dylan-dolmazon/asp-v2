export const saveAllHistory = async (competsId: number[]) => {
  return await useCustomFetch<Compet[]>(`/classement-history/save`, "PUT", {
    body: { competsId },
  });
};

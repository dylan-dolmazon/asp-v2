import type { Entry } from "@shared/types/EntriesTypes";

export const getEntry = async (id: number) => {
  return useCustomFetch<Entry>(`entries/${id}`);
};

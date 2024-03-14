import type { Entry } from "@shared/types/EntriesTypes";

export const deleteEntry = async (id: number) => {
  return useCustomFetch<Entry>(`entries/${id}`, "DELETE");
};

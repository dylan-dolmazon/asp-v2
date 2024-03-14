import type { Entry } from "@shared/types/EntriesTypes";

export const getEntries = async () => {
  return useCustomFetch<Entry[]>("entries");
};

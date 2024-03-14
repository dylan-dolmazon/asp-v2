import type { Entry } from "@shared/types/EntriesTypes";

export const createEntry = async (entrie: Entry) => {
  return useCustomFetch<{
    entries: Entry;
  }>("entries", "POST", entrie);
};

import type { Entry, EntryUpdate } from "@shared/types/EntriesTypes";

export const updateEntry = async (id: number, entrie: EntryUpdate) => {
  return useCustomFetch<{
    entries: Entry;
  }>(`entries/${id}`, "PUT", entrie);
};

import type { Entries } from "@shared/types/EntriesTypes";
import { useCustomFetch } from "../composables/useCustomFetch";

export const getEntries = async () => {
  return useCustomFetch<{
    count: number;
    entries: Entries[];
  }>("entries");
};

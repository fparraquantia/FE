import { create } from "zustand";

export const store = create<{
  selectedUserId: string | null;
}>(() => ({
  selectedUserId: null,
}));

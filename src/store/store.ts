import { create } from "zustand";

interface initialPromptStore {
  initialPrompt: string | null;
  addInitialPrompt: (value: string) => void;
  removeInitialPrompt: (name: string) => void;
}

export const useInitialPromptStore = create<initialPromptStore>((set) => ({
  initialPrompt: null,
  addInitialPrompt: (value) => set((state: any) => ({ initialPrompt: value })),
  removeInitialPrompt: () => set({ initialPrompt: null }),
}));

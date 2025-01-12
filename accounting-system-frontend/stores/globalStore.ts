import { create } from "zustand";

interface StoreState {
  snackbar: boolean;
  setSnackbar: (arg: boolean) => void;
}

export const useGlobalStore = create<StoreState>()((set) => ({
  snackbar: false,
  setSnackbar: (arg) => set({ snackbar: arg }),
}));

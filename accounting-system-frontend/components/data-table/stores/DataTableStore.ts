import { create } from "zustand";

interface StoreState {
  vouchers: Array<any>;
  setVouchers: (arg: Array<any>) => void;

  allOrSomeRowsSelected: boolean;
  setAllOrSomeRowsSelected: (arg: boolean) => void;

  currentSelectedVouchers: Array<any>;
  setCurrentSelectedVouchers: (arg: Array<any>) => void;
}

export const useDataTableStore = create<StoreState>()((set) => ({
  vouchers: [],
  setVouchers: (arg) => set({ vouchers: arg }),

  allOrSomeRowsSelected: false,
  setAllOrSomeRowsSelected: (arg) => set({ allOrSomeRowsSelected: arg }),

  currentSelectedVouchers: [],
  setCurrentSelectedVouchers: (arg) => set({ currentSelectedVouchers: arg }),
}));

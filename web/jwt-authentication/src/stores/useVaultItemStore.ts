import { create } from "zustand";
import { Store } from "@/interfaces/vault";

export const vaultItemStore = create<Store>()((set) => ({
  vaultItems: null,
  setVaultItems: (s) => set(() => ({ vaultItems: s })),
}));

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Store } from "@/interfaces/userStore";

export const useUserStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    { name: "user-data" }
  )
);

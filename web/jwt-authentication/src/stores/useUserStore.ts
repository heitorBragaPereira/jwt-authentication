import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Store } from "@/interfaces/userStore";

export const useUserStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      cleanUser: () => set({ user: null }),
    }),
    { name: "user-data" }
  )
);

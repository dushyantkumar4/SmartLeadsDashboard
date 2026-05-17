import { create } from "zustand";
import { persist } from "zustand/middleware";

type CommonState = {
  theme: "light" | "dark";

  toggleTheme: () => void;
};

export const commonStore = create<CommonState>()(
  persist(
    (set, get) => ({
      theme: "light",

      toggleTheme: () =>
        set({
          theme: get().theme === "light" ? "dark" : "light",
        }),
    }),
    {
      name: "theme-storage",
    }
  )
);


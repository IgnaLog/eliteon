import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  theme: "light" | "dark";
};

type Actions = {
  toggleTheme: () => void;
};

export const useThemeStore = create(
  persist<State & Actions>(
    (set) => ({
      theme: "dark",

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    { name: "theme-storage" }
  )
);

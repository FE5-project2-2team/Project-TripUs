import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
	isDark: boolean;
	toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
	persist(
		(set, get) => ({
			isDark: false,
			toggleTheme: () => {
				const next = !get().isDark;
				document.documentElement.classList.toggle("dark", next);
				set({ isDark: next });
			}
		}),
		{
			name: "theme-storage" // localStorage에 저장될 key 이름
		}
	)
);

import { create } from "zustand";
import { persist } from "zustand/middleware";


type AuthStore = {
	isLoggedIn: boolean;
	accessToken: string | null;
	userId: string | null;
	login: (accessToken: string, userId: string) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			isLoggedIn: false,
			accessToken: null,
			userId: null,

			login: (accessToken, userId) =>
				set({ isLoggedIn: true, accessToken, userId }),
			logout: () =>
				set({ 
					isLoggedIn: false, 
					accessToken: null, 
					userId: null,
				}),
		}),
		{
			name: "auth-storage", // for local storge
		}
	)
);

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import profileCircle from "../assets/images/profileImg_circle.svg";

type AuthStore = {
	isLoggedIn: boolean;
	accessToken: string | null;
	userId: string | null;

	image: string;
	nickname: string | null;

	login: (accessToken: string, userId: string) => void;
	logout: () => void;
	setImage: (image: string) => void;
	setNickname: (nickname: string) => void;
};

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			isLoggedIn: false,
			accessToken: null,
			userId: null,
			image: profileCircle,
			nickname: null,

			login: (accessToken, userId) =>
				set({ isLoggedIn: true, accessToken, userId }),
			logout: () =>
				set({
					isLoggedIn: false,
					accessToken: null,
					userId: null,
					image: profileCircle,
					nickname: null
				}),
			setImage: (image) => set({ image }),
			setNickname: (nickname) => set({ nickname })
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => sessionStorage)
		}
	)
);

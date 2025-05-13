import { create } from "zustand";
import profileCircle from "../assets/images/profileImg_circle.svg";

interface UserState {
	image: string;
	nickname: string | null;
	setImage: (image: string) => void;
	setNickname: (nickname: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
	image: profileCircle,
	nickname: null,
	setImage: (image) => set({ image }),
	setNickname: (nickname) => set({ nickname })
}));
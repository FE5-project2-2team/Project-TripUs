import { create } from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  accessToken: string | null;
  userId: string | null;
  login: (accessToken: string, userId: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  userId: null,
  login: (accessToken, userId) =>
    set({ isLoggedIn: true, accessToken, userId }),
  logout: () => set({ isLoggedIn: false, accessToken: null, userId: null }),
}));

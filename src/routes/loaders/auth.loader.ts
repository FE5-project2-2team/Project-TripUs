import { redirect } from "react-router";
import { useAuthStore } from "../../store/authStore";

export async function fetchUserData() {}

export function requireAuth() {
	const isLoggedIn = useAuthStore.getState().isLoggedIn;
	if (!isLoggedIn) {
		return redirect("/login");
	}
}

export function requireNoAuth() {
	const isLoggedIn = useAuthStore.getState().isLoggedIn;
	if (isLoggedIn) {
		return redirect("/");
	}
}

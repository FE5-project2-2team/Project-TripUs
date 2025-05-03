import axios from "axios";
import { APIUrl } from "../constants/apis";
import { useAuthStore } from "../store/authStore";

export const axiosInstance = axios.create({
	baseURL: APIUrl
});

axiosInstance.interceptors.request.use((config) => {
	const token = useAuthStore.getState().accessToken;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

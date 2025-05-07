import axios from "axios";
import { APIUrl } from "../constants/apis";
import { useAuthStore } from "../store/authStore";

export const axiosInstance = axios.create({
	baseURL: APIUrl
});

export const formDataInstance = axios.create({
	baseURL: APIUrl,
	headers: { "Content-Type": "multipart/form-data" }
});

axiosInstance.interceptors.request.use((config) => {
	const token = useAuthStore.getState().accessToken;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

formDataInstance.interceptors.request.use((config) => {
	const token = useAuthStore.getState().accessToken;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

import { axiosInstance } from "./axios";

export const getNotiList = async () => {
	const { data } = await axiosInstance.get("/notifications");
	return data;
};

export const createNoti = async (notification: NotiType) => {
	const { data } = await axiosInstance.post(
		"/notifications/create",
		notification
	);
	return data;
};

export const readNoti = async () => {
	await axiosInstance.put("/notifications/seen");
};

import { axiosInstance } from "./axios";

export const getNotiList = async () => {
	const { data } = await axiosInstance.get("/notifications");
	console.log("알림응답데이터:", JSON.stringify(data, null, 2));
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

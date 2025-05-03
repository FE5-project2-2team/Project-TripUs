import { axiosInstance } from "./axios";

export const getNotiList = async () => {
	try {
		const { data } = await axiosInstance.get("/notifications");
		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

export const createNoti = async (notification: NotiType) => {
	try {
		const { data } = await axiosInstance.post(
			"/notifications/create",
			notification
		);
		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

export const readNoti = async () => {
	try {
		await axiosInstance.put("/notifications/seen");
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

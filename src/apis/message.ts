import { axiosInstance } from "./axios";

export const getMessageList = async (userId: string) => {
	try {
		const { data } = await axiosInstance.get("/messages", {
			params: { userId }
		});
		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

export const createMessage = async (message: string, receiver: string) => {
	try {
		const { data } = await axiosInstance.post("/messages/create", {
			message,
			receiver
		});
		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

export const getConversations = async () => {
	try {
		const { data } = await axiosInstance.get("/messages/conversations");
		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

export const readMessage = async (sender: string) => {
	try {
		axiosInstance.put("/messages/update-seen", {
			sender
		});
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

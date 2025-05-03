import { axiosInstance } from "./axios";

export const getChannels = async () => {
	try {
		const { data } = await axiosInstance.get("/channels");
		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

export const getChannelInfo = async (name: string) => {
	try {
		const { data } = await axiosInstance.get(`/channels/${name}`);
		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

export const createChannel = async (
	role: string,
	description: string,
	name: string
) => {
	try {
		if (role !== "SuperAdmin") {
			throw Error("Not Authorized");
		}
		const { data } = await axiosInstance.post("/channels/create", {
			authRequired: true,
			description,
			name
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

export const deleteChannel = async (id: string) => {
	try {
		const { data } = await axiosInstance.delete("/channels/delete", {
			data: { id }
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

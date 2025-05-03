import { axiosInstance } from "./axios";

export const createLike = async (postId: string) => {
	try {
		const { data } = await axiosInstance.post("/likes/create", {
			postId
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

export const deleteLike = async (likeId: string) => {
	try {
		const { data } = await axiosInstance.delete("/likes/delete", {
			data: { id: likeId }
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

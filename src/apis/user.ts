import { axiosInstance } from "./axios";

export const getUsers = async () => {
	try {
		const { data } = await axiosInstance.get("/users/get-users");
		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

export const getOnlineUsers = async () => {
	try {
		const { data } = await axiosInstance.get("/users/online-users");
		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

export const getUserInfo = async (id: string) => {
	try {
		const { data } = await axiosInstance.get(`/users/${id}`);
		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

export const uploadPhoto = async (isCover: boolean, image: BinaryType) => {
	try {
		const { data } = await axiosInstance.post("/users/upload-photo", {
			isCover,
			image
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

export const deletePhoto = async (isCover: boolean) => {
	try {
		const { data } = await axiosInstance.post("/users/delete-photo", {
			isCover
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

export const updateUserPwd = async (newPwd: string) => {
	try {
		const { data } = await axiosInstance.put("/settings/update-password", {
			password: newPwd
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

export const updateUserInfo = async ({ profile, tagList }: UpdatedUserData) => {
	const userInfo: { fullName?: string; username?: string } = {};
	if (profile) {
		userInfo.fullName = JSON.stringify(profile);
	}
	if (tagList) {
		userInfo.username = JSON.stringify(tagList);
	}
	try {
		const { data } = await axiosInstance.put("/settings/update-user", userInfo);
		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

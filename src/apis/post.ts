import { axiosInstance, formDataInstance } from "./axios";

export const getPosts = async (channelId: string) => {
	try {
		const { data } = await axiosInstance.get(`/posts/channel/${channelId}`);
		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

export const getPostsByChannelId = async (channelId: string) => {
	try {
		const { data } = await axiosInstance.get(`/posts/channel/${channelId}`);
		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

export const getPostById = async (postId: string) => {
	try {
		const { data } = await axiosInstance.get(`/posts/${postId}`);
		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

export const getPostsByAuthor = async (AuthorId: string) => {
	try {
		const { data } = await axiosInstance.get(`/posts/author/${AuthorId}`);
		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

export const createPost = async (post: PostUpdateData) => {
	try {
		const { data } = await formDataInstance.post("/posts/create", post);
		return data._id;
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

export const updatePost = async (post: PostUpdateData) => {
	try {
		await axiosInstance.put("/posts/update", post);
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

export const deletePost = async (postId: string) => {
	try {
		await axiosInstance.delete("/posts/delete", {
			data: { id: postId }
		});
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log("Unknwon Error", error);
		}
	}
};

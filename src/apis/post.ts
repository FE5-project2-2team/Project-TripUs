import { axiosInstance } from "./axios";

export const getPosts = async (channelId: string) => {
	const { data } = await axiosInstance.get(`/posts/channel/${channelId}`);
	return data;
};

export const getPostsByAuthor = async (AuthorId: string) => {
	const { data } = await axiosInstance.get(`/posts/author/${AuthorId}`);
	return data;
};

export const createPost = async (post: Post) => {
	await axiosInstance.post("/posts/create", post);
};

export const updatePost = async (post: Post) => {
	await axiosInstance.put("/posts/update", post);
};

export const deletePost = async (postId: string) => {
	await axiosInstance.delete("/posts/delete", {
		data: { id: postId }
	});
};

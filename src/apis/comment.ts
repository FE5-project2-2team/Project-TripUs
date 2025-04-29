import { axiosInstance } from "./axios";

export const createComment = async (postId: string, comment: string) => {
  try {
    const { data } = await axiosInstance.post("/comments/create", {
      postId,
      comment,
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

export const deleteComment = async (commentId: string) => {
  try {
    const { data } = await axiosInstance.delete("/comments/delete", {
      data: { id: commentId },
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

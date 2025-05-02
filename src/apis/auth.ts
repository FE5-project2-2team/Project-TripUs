import { AxiosError } from "axios";
import { axiosInstance } from "./axios";

export const registerUser = async (userInfo: UserInfo) => {
  const { email, fullName, password } = userInfo;
  try {
    const { data } = await axiosInstance.post("/signup", {
      email,
      fullName: JSON.stringify(fullName),
      password,
    });
    return data.user;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
    } else {
      console.log("Unknwon Error", error);
    }
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await axiosInstance.post("/login", {
      email,
      password,
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

export const logoutUser = async () => {
  try {
    const { data } = await axiosInstance.post("/logout");
    console.log(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Unknwon Error", error);
    }
  }
};

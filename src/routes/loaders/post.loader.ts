import { LoaderFunctionArgs } from "react-router";
import { useAuthStore } from "../../store/authStore";
import { usePostStore } from "../../store/postStore";

export const fetchPost = async ({ params }: LoaderFunctionArgs) => {
	const getData = usePostStore.getState().getData;
	const userId = useAuthStore.getState().userId;
	if (params.id && userId) {
		await getData(params.id, userId);
	}
};

import { useForm } from "react-hook-form";
import { CHANNELS } from "../constants/posts";

export function usePostForm(defaultValues?: Partial<FormValues>) {
	return useForm<FormValues>({
		mode: "onSubmit",
		shouldFocusError: false,
		defaultValues: {
			channel: CHANNELS.RECRUITMENT,
			member: 2,
			location: "",
			dateRange: [],
			title: "",
			contents: "",
			condition: {
				gender: "",
				ageRange: []
			},
			images: [],
			...(defaultValues || {})
		}
	});
}

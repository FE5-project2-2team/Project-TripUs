import { useCallback, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import { useNavigate } from "react-router";
import { createPost, updatePost } from "../apis/post";
import { CHANNELS } from "../constants/posts";
import { useAuthStore } from "../store/authStore";
import urlToFile from "../utils/urlToFile";
import { validateForm } from "../utils/validators";
import { useInput } from "./useInput";

export function usePostForm() {
	const navigate = useNavigate();
	const userId = useAuthStore((state) => state.userId);

	const { inputs, values, setValues } = useInput({
		title: "",
		location: "",
		channel: CHANNELS.RECRUITMENT,
		member: "2"
	});

	const [dateRange, setDateRange] = useState<Date[]>([]);
	const [condition, setCondition] = useState<{
		gender: string;
		ageRange: string[];
	}>({
		gender: "",
		ageRange: []
	});

	const contents = useRef<ReactQuill | null>(null);

	const onDateChange = (selctedDates: Date[]) => {
		if (selctedDates.length === 2) setDateRange(selctedDates);
	};

	const conditionHandler = (
		e: React.ChangeEvent<HTMLInputElement>,
		type: string
	) => {
		setCondition((cond) =>
			type === "radio"
				? { ...cond, gender: e.target.value }
				: {
						...cond,
						ageRange: cond.ageRange.find((age) => age === e.target.value)
							? cond.ageRange.filter((age) => age !== e.target.value)
							: [...cond.ageRange, e.target.value]
					}
		);
	};

	const submitHandler = async (
		e: React.FormEvent<HTMLFormElement>,
		postId?: string
	) => {
		e.preventDefault();
		try {
			console.log(e);
			const imageFile = await urlToFile(contents);
			const validationData = {
				title: values.title,
				location: values.location,
				dateRange,
				condition,
				contents
			};
			const alertMessage = validateForm(validationData);
			if (alertMessage) {
				alert(alertMessage);
				return;
			}
			const detailData: PostDetail = {
				title: values.title,
				memberLimit: Number(values.member),
				memberList: [userId!],
				applicantList: [],
				location: values.location,
				dateRange,
				isRecruiting: true,
				recruitCondition: condition,
				description: contents.current
					?.getEditor()
					.editor.getText(0, 20) as string,
				contents: contents.current?.getEditor().getContents()
			};

			const formData = new FormData();
			formData.append("title", JSON.stringify(detailData));
			formData.append("channelId", values.channel);
			if (imageFile) formData.append("image", imageFile);

			if (postId) {
				formData.append("postId", postId);
				await updatePost(formData);
				navigate(`/post/detail/${postId}`);
			} else {
				const postId = await createPost(formData);
				navigate(`/post/detail/${postId}`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const updateInputs = useCallback(
		(postData: PostData) => {
			const postInfo: PostDetail = JSON.parse(postData.title);
			const date = postInfo.dateRange.map((date) => new Date(date));
			setValues({
				title: postInfo.title,
				location: postInfo.location,
				channel: postData.channel._id,
				member: postInfo.memberLimit.toString()
			});
			setDateRange(date);
			contents.current?.getEditor().setContents(postInfo.contents);
			setCondition({
				gender: postInfo.recruitCondition.gender,
				ageRange: postInfo.recruitCondition.ageRange
			});
		},
		[setValues]
	);

	return {
		inputs,
		dateRange,
		contents,
		handlers: {
			conditionHandler,
			onDateChange,
			submitHandler,
			updateInputs
		}
	};
}

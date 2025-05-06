import axios from "axios";
import { useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import { useNavigate } from "react-router";
import { createPost } from "../apis/post";
import { CHANNELS } from "../constants/posts";
import { useAuthStore } from "../store/authStore";
import urlToFile from "../utils/urlToFile";
import { validateForm } from "../utils/validators";
import { useInput } from "./useInput";

export function usePostForm() {
	const navigate = useNavigate();
	const userId = useAuthStore((state) => state.userId);

	const { inputs, values } = useInput({
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

	const ImageHandler = async () => {
		if (!contents.current) return;

		const quillInstance = contents.current.getEditor();
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();

		input.onchange = async () => {
			const file = input.files?.[0] as File;
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", "postImages");

			try {
				const { data } = await axios.post(
					"https://api.cloudinary.com/v1_1/dopw7udhj/image/upload",
					formData
				);
				const range = quillInstance.getSelection(true);
				quillInstance.insertEmbed(range.index, "image", data.secure_url);
				quillInstance.setSelection(range.index + 1);
			} catch (error) {
				console.error(error);
			}
		};
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

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
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
			const detailData: PostData = {
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

			const postId = await createPost(formData);
			navigate(`/post/detail/${postId}`);
		} catch (error) {
			console.error(error);
		}
	};

	return {
		inputs,
		dateRange,
		contents,
		handlers: {
			conditionHandler,
			onDateChange,
			submitHandler,
			ImageHandler
		}
	};
}

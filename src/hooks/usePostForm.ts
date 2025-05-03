import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { createPost } from "../apis/post";
import { CHANNELS } from "../constants/posts";
import { useAuthStore } from "../store/authStore";
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
	const [showImages, setShowImages] = useState<string[]>([]);
	const [condition, setCondition] = useState<{
		gender: string;
		ageRange: string[];
	}>({
		gender: "",
		ageRange: []
	});
	const contents = useRef<HTMLDivElement>(null);
	const ImageListRef = useRef<File[]>([]);

	const addImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const imageFiles = e.target.files!;
		ImageListRef.current = [...ImageListRef.current, ...imageFiles];
		const imageUrlList = [...imageFiles]
			.filter((file) => file.type.startsWith("image/"))
			.map((imageFile) => URL.createObjectURL(imageFile));
		if (showImages.length <= 10) {
			setShowImages((list) => {
				const result = [...list, ...imageUrlList];
				return result.slice(0, 10);
			});
		}
	};

	const encodeImages = (
		images: File[]
	): Promise<(string | ArrayBuffer | null)[]> => {
		const promises = images.map((image) => {
			return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => resolve(reader.result);
				reader.onerror = () => reject(reader.error);
				reader.readAsDataURL(image);
			});
		});
		return Promise.all(promises);
	};

	const removeImageHandler = (image: string) => {
		setShowImages((images) => images.filter((img) => image !== img));
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

	const onDateChange = (selctedDates: Date[]) => {
		if (selctedDates.length === 2) setDateRange(selctedDates);
	};

	const isFormVaild = () => {
		return (
			values.title &&
			values.location &&
			dateRange.length === 2 &&
			condition.gender &&
			condition.ageRange.length > 0 &&
			contents.current!.innerText.trim().length > 0 &&
			contents.current!.innerText.length < 1000
		);
	};

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const encodedImages = await encodeImages(ImageListRef.current);

			if (!isFormVaild()) {
				alert("입력 정보가 부족하거나 글자 수가 1000자를 초과하였습니다.");
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
				images: encodedImages,
				recruitCondition: condition,
				contents: contents.current!.innerHTML
			};

			const formData = new FormData();
			formData.append("title", JSON.stringify(detailData));
			formData.append("image", ImageListRef.current[0] || null);
			formData.append("channelId", values.channel);

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
		showImages,
		handlers: {
			addImageHandler,
			removeImageHandler,
			conditionHandler,
			onDateChange,
			submitHandler
		}
	};
}

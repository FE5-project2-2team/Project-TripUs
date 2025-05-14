import "flatpickr/dist/themes/material_blue.css";
import { useRef } from "react";
import ReactQuill from "react-quill-new";
import { useNavigate } from "react-router";
import { createPost } from "../apis/post";
import { showToast } from "../components/commons/Toast";
import PostForm from "../components/features/post/PostForm";
import { useImage } from "../hooks/useImage";
import { usePostForm } from "../hooks/usePostForm";
import { useAuthStore } from "../store/authStore";
import { formErrorHandler } from "../utils/errorhandle";

export default function PostCreate() {
	const navigate = useNavigate();
	const userId = useAuthStore((state) => state.userId)!;
	const { imageListRef, ...imageProps } = useImage();
	const contentsRef = useRef<ReactQuill | null>(null);
	const methods = usePostForm();
	const submitHandler = async (data: FormValues) => {
		try {
			if (!data.condition) return;
			const editor = contentsRef.current?.getEditor();
			const detailData: PostDetail = {
				title: data.title,
				memberLimit: Number(data.member),
				memberList: [userId],
				applicantList: [],
				location: data.location,
				dateRange: data.dateRange,
				isRecruiting: true,
				recruitCondition: data.condition,
				description: editor?.getText() as string,
				contents: editor?.getContents(),
				images: imageListRef.current
			};

			const fullText = editor?.getText().replace(/\n/g, "").trim();
			if ((fullText && fullText.length < 5) || !fullText) {
				showToast({
					type: "error",
					message: "내용을 5자 이상 입력해 주세요"
				});
				return;
			} else if (fullText && fullText.length > 1000) {
				showToast({
					type: "error",
					message: "내용은 1000자까지만 입력할 수 있습니다"
				});
				return;
			}

			const formData = new FormData();
			formData.append("title", JSON.stringify(detailData));
			formData.append("channelId", data.channel);

			const postId = await createPost(formData);
			navigate(`/post/detail/${postId}`);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<PostForm
			submitHandler={submitHandler}
			errorHandler={formErrorHandler}
			contentsRef={contentsRef}
			imageProps={imageProps}
			methods={methods}
			type="create"
		/>
	);
}

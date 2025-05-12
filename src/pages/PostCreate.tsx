import "flatpickr/dist/themes/material_blue.css";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";
import { useNavigate } from "react-router";
import { createPost } from "../apis/post";
import Icon from "../components/commons/Icon";
import ConditionList from "../components/features/post/ConditionList";
import Contents from "../components/features/post/Contents";
import InfoForm from "../components/features/post/InfoForm";
import InputTitle from "../components/features/post/InputTitle";
import UploadImage from "../components/features/post/UploadImage";
import { CHANNELS } from "../constants/posts";
import { useImage } from "../hooks/useImage";
import { useAuthStore } from "../store/authStore";
import { urlToFile } from "../utils/image";

export default function PostCreate() {
	const navigate = useNavigate();
	const userId = useAuthStore((state) => state.userId)!;
	const { imageListRef, ...imageProps } = useImage();

	const methods = useForm<FormValues>({
		mode: "onSubmit",
		defaultValues: {
			channel: CHANNELS.RECRUITMENT,
			member: 2,
			location: "",
			dateRange: [],
			title: "",
			condition: {
				gender: "",
				ageRange: []
			}
		}
	});

	const contents = useRef<ReactQuill | null>(null);

	const submitHandler = async (data: FormValues) => {
		try {
			const detailData: PostDetail = {
				title: data.title,
				memberLimit: Number(data.member),
				memberList: [userId],
				applicantList: [],
				location: data.location,
				dateRange: data.dateRange,
				isRecruiting: true,
				recruitCondition: data.condition,
				description: contents.current
					?.getEditor()
					.editor.getText(0, 100) as string,
				contents: contents.current?.getEditor().getContents(),
				images: imageListRef.current
			};

			const formData = new FormData();
			formData.append("title", JSON.stringify(detailData));
			formData.append("channelId", data.channel);
			let imageFile: File | undefined;
			if (data.channel === CHANNELS.REVIEW) {
				imageFile = await urlToFile(contents);
				if (imageFile) {
					formData.append("image", imageFile);
				}
			} else {
				formData.append("image", imageListRef.current[0]);
			}

			const postId = await createPost(formData);
			navigate(`/post/detail/${postId}`);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex justify-center items-center">
			<main className="font-[Noto-Sans]">
				<FormProvider {...methods}>
					<form
						className="mt-10"
						onSubmit={methods.handleSubmit(submitHandler)}
						action=""
					>
						<InfoForm />
						<div className="flex flex-col gap-10 my-13">
							<InputTitle />
							<Contents contentsRef={contents} />
							{methods.watch().channel === CHANNELS.RECRUITMENT && (
								<UploadImage {...imageProps} />
							)}
							<ConditionList />
						</div>
						<div className="flex items-center justify-between mb-10">
							<div
								onClick={() => navigate(-1)}
								className="flex justify-center items-center gap-4 cursor-pointer"
							>
								<Icon position="39.301% 27.747%" size="16px" />
								<span className="text-xl">나가기</span>
							</div>
							<button
								type="submit"
								className="bg-[#06b796] text-white px-[50px] py-[18px] rounded-[10px] text-xl hover:bg-[#038383] hover:cursor-pointer"
							>
								등록하기
							</button>
						</div>
					</form>
				</FormProvider>
			</main>
		</div>
	);
}

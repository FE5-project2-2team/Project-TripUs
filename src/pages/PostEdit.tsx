import { useEffect, useRef } from "react";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";
import { useLocation, useNavigate } from "react-router";
import { updatePost } from "../apis/post";
import Icon from "../components/commons/Icon";
import { showToast } from "../components/commons/Toast";
import ConditionList from "../components/features/post/ConditionList";
import Contents from "../components/features/post/Contents";
import InfoForm from "../components/features/post/InfoForm";
import InputTitle from "../components/features/post/InputTitle";
import UploadImage from "../components/features/post/UploadImage";
import { CHANNELS } from "../constants/posts";
import { useImage } from "../hooks/useImage";
import { urlToFile } from "../utils/image";

export default function PostEdit() {
	const navigate = useNavigate();
	const location = useLocation();
	const { postData }: { postData: PostData } = location.state;
	const postInfo: PostDetail = JSON.parse(postData.title);
	const { imageListRef, initImages, ...imageProps } = useImage();

	const methods = useForm<FormValues>({
		mode: "onSubmit",
		defaultValues: {
			channel: postData.channel._id,
			member: postInfo.memberLimit,
			location: postInfo.location,
			dateRange: postInfo.dateRange.map((date) => new Date(date)),
			title: postInfo.title,
			condition: {
				gender: postInfo.recruitCondition.gender,
				ageRange: postInfo.recruitCondition.ageRange
			}
		}
	});

	const contents = useRef<ReactQuill | null>(null);
	contents.current?.getEditor().setContents(postInfo.contents);

	const errorHandler = (errors: FieldErrors<FormValues>) => {
		const editor = contents.current?.getEditor();
		const fullText = editor?.getText().replace(/\n/g, "").trim();
		if (errors.location) {
			showToast({ type: "error", message: errors.location.message });
		} else if (errors.dateRange) {
			showToast({ type: "error", message: errors.dateRange.message });
		} else if (errors.title) {
			const titleLen = errors.title.ref?.value.length;
			showToast({
				type: "error",
				message: errors.title.message + ` (현재 : ${titleLen}자)`
			});
		} else if ((fullText && fullText.length < 5) || !fullText) {
			showToast({ type: "error", message: "내용을 5자 이상 입력해 주세요" });
		} else if (fullText && fullText.length > 1000) {
			showToast({
				type: "error",
				message: "내용은 1000자까지만 입력할 수 있습니다"
			});
		} else if (errors.condition?.gender) {
			showToast({ type: "error", message: errors.condition.gender.message });
		} else if (errors.condition?.ageRange) {
			showToast({ type: "error", message: errors.condition.ageRange.message });
		}
	};

	const submitHandler = async (data: FormValues) => {
		try {
			if (!postInfo) return;
			const detailData: PostDetail = {
				...postInfo,
				title: data.title,
				memberLimit: Number(data.member),
				location: data.location,
				dateRange: data.dateRange,
				recruitCondition: data.condition,
				description: contents.current
					?.getEditor()
					.editor.getText(0, 100) as string,
				contents: contents.current?.getEditor().getContents(),
				images: imageListRef.current
			};

			const editor = contents.current?.getEditor();
			const fullText = editor?.getText().replace(/\n/g, "").trim();
			if ((fullText && fullText.length < 5) || !fullText) {
				showToast({ type: "error", message: "내용을 5자 이상 입력해 주세요" });
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
			let imageFile: File | undefined;
			if (data.channel === CHANNELS.REVIEW) {
				imageFile = await urlToFile(contents);
				if (imageFile) {
					formData.append("image", imageFile);
				}
			} else {
				formData.append("image", imageListRef.current[0]);
			}

			formData.append("postId", postData._id);
			await updatePost(formData);
			navigate(`/post/detail/${postData._id}`);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (!postInfo.images) return;
		initImages(postInfo.images);
	}, []);

	return (
		<div className="flex justify-center items-center">
			<main className="font-[Noto-Sans]">
				<FormProvider {...methods}>
					<form
						className="mt-10"
						action=""
						onSubmit={methods.handleSubmit(submitHandler, errorHandler)}
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

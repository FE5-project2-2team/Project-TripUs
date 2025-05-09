import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";
import { Link, useLocation, useNavigate } from "react-router";
import { getPostById, updatePost } from "../apis/post";
import ConditionList from "../components/features/post/ConditionList";
import Contents from "../components/features/post/Contents";
import InfoForm from "../components/features/post/InfoForm";
import InputTitle from "../components/features/post/InputTitle";
import urlToFile from "../utils/urlToFile";

export default function PostEdit() {
	const navigate = useNavigate();
	const location = useLocation();
	const { postId }: { postId: string } = location.state;
	const [postInfo, setPostInfo] = useState<PostDetail | null>(null);

	const methods = useForm<FormValues>({
		mode: "onSubmit",
		defaultValues: {
			channel: "",
			member: 0,
			location: "",
			dateRange: [],
			title: "",
			condition: {
				gender: "",
				ageRange: []
			}
		}
	});

	const getPostData = useCallback(async () => {
		const postData: PostData = await getPostById(postId);
		const postInfo: PostDetail = JSON.parse(postData.title);
		setPostInfo(postInfo);
		methods.reset({
			channel: postData.channel._id,
			member: postInfo.memberLimit,
			location: postInfo.location,
			dateRange: postInfo.dateRange.map((date) => new Date(date)),
			title: postInfo.title,
			condition: {
				gender: postInfo.recruitCondition.gender,
				ageRange: postInfo.recruitCondition.ageRange
			}
		});
		contents.current?.getEditor().setContents(postInfo.contents);
	}, [methods, postId]);

	const contents = useRef<ReactQuill | null>(null);

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
				contents: contents.current?.getEditor().getContents()
			};
			const formData = new FormData();
			formData.append("title", JSON.stringify(detailData));
			formData.append("channelId", data.channel);

			const imageFile = await urlToFile(contents);
			if (imageFile) formData.append("image", imageFile);

			formData.append("postId", postId);
			await updatePost(formData);
			navigate(`/post/detail/${postId}`);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getPostData();
	}, [getPostData]);

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
							<ConditionList />
						</div>
						<div className="flex items-center justify-between mb-10">
							<Link to={"/"}>
								<div className="flex justify-center items-center gap-4">
									<FontAwesomeIcon icon={faArrowLeft} />
									<span className="text-xl">나가기</span>
								</div>
							</Link>
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

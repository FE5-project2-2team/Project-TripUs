import { useState } from "react";
import { FieldErrors, FormProvider, UseFormReturn } from "react-hook-form";
import ReactQuill from "react-quill-new";
import { useNavigate } from "react-router";
import { CHANNELS } from "../../../constants/posts";
import { useThemeStore } from "../../../store/themeStore";
import Icon from "../../commons/Icon";
import ConditionList from "./ConditionList";
import Contents from "./Contents";
import InfoForm from "./InfoForm";
import InputTitle from "./InputTitle";
import UploadImage from "./UploadImage";

interface PostFormProps {
	submitHandler: (data: FormValues) => void;
	errorHandler: (errors: FieldErrors<FormValues>) => void;
	contentsRef: React.RefObject<ReactQuill | null>;
	imageProps: {
		showImages: string[];
		addImage: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
		removeImage: (image: string) => void;
	};
	methods: UseFormReturn<FormValues>;
	type: string;
}

export default function PostForm({
	submitHandler,
	errorHandler,
	contentsRef,
	imageProps,
	methods,
	type
}: PostFormProps) {
	const { isDark } = useThemeStore();
	const navigate = useNavigate();
	const [isConfirmed, setIsConfirmed] = useState(0);
	const confirmHandler = () => {
		setIsConfirmed((state) => (state ? 0 : 1));
	};
	return (
		<div className="flex justify-center items-center">
			<main className="font-[Noto-Sans]">
				<FormProvider {...methods}>
					<form
						className="mt-10"
						action=""
						onSubmit={methods.handleSubmit(submitHandler, errorHandler)}
					>
						<InfoForm type={type} confirmHandler={confirmHandler} />
						<div className="flex flex-col gap-10 my-13">
							<InputTitle />
							<Contents contentsRef={contentsRef} isConfirmed={isConfirmed} />
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
								<Icon
									position={isDark ? "50.218% 27.747%" : "39.301% 27.747%"}
									size="16px"
								/>
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

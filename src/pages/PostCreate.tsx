import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "flatpickr/dist/themes/material_blue.css";
import { Link } from "react-router";
import ConditionList from "../components/features/post/ConditionList";
import Contents from "../components/features/post/Contents";
import InfoForm from "../components/features/post/InfoForm";
import InputTitle from "../components/features/post/InputTitle";
import UploadImage from "../components/features/post/UploadImage";
import { usePostForm } from "../hooks/usePostForm";

export default function PostCreate() {
	const {
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
	} = usePostForm();
	return (
		<div className="flex justify-center items-center">
			<main className="font-[Noto-Sans]">
				<form className="mt-10" onSubmit={(e) => submitHandler(e)} action="">
					<InfoForm
						inputs={{
							channel: inputs.channel,
							member: inputs.member,
							location: inputs.location
						}}
						onDateChange={onDateChange}
						dateRange={dateRange}
					/>
					<div className="flex flex-col gap-10 my-13">
						<InputTitle title={inputs.title} />
						<Contents contentsInputs={inputs.contents} contentsRef={contents} />
						<UploadImage
							contentsRef={contents}
							removeImageHandler={removeImageHandler}
							addImageHandler={addImageHandler}
							showImages={showImages}
						/>
						<ConditionList conditionHandler={conditionHandler} />
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
			</main>
		</div>
	);
}

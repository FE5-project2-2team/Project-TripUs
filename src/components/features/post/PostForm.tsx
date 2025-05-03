import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "flatpickr/dist/themes/material_blue.css";
import { Link } from "react-router";
import { usePostForm } from "../../../hooks/usePostForm";
import ConditionList from "./ConditionList";
import Contents from "./Contents";
import InfoForm from "./InfoForm";
import InputTitle from "./InputTitle";
import UploadImage from "./UploadImage";

export default function PostForm() {
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
				<Contents ref={contents} />
				<UploadImage
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
	);
}

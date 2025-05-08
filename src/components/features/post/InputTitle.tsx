import { useFormContext } from "react-hook-form";

export default function InputTitle() {
	const { register } = useFormContext();
	return (
		<div>
			<label htmlFor="title" className="post-input-title">
				제목
			</label>
			<input
				id="title"
				type="text"
				placeholder="제목을 입력해 주세요"
				className="bg-[#F9F9F9] w-full p-5 rounded-[10px] placeholder:text-[#CDCDCD]"
				{...register("title")}
			/>
		</div>
	);
}

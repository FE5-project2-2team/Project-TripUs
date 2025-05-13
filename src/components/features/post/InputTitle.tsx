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
				className="bg-[#F9F9F9] w-full p-5 rounded-[10px] placeholder:text-[#CDCDCD] focus:outline-0"
				{...register("title", {
					required: "제목을 입력해 주세요",
					minLength: {
						value: 2,
						message: "제목은 최소 2자 이상이어야 합니다"
					},
					maxLength: {
						value: 20,
						message: "제목은 최대 20자까지 가능합니다"
					}
				})}
			/>
		</div>
	);
}

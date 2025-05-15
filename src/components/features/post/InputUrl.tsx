import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export default function InputUrl() {
	const { register } = useFormContext();
	return (
		<div className="relative flex flex-col items-start">
			<label htmlFor="location" className={twMerge("post-input-title")}>
				오픈 카톡 주소
			</label>
			<input
				id="location"
				type="url"
				placeholder="주소 입력 (필요 시 입력)"
				autoComplete="off"
				className={twMerge(
					"input-style placeholder:text-[#CDCDCD] focus:outline-0 w-full",
					"dark:placeholder:text-[#616161] dark:border-[#616161]",
					"disabled:text-[#aaaaaa]"
				)}
				{...register("url")}
			/>
		</div>
	);
}

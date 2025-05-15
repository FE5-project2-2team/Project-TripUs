import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useClickAway } from "react-use";
import { twMerge } from "tailwind-merge";

export default function CustomSelect({
	isEditing,
	name,
	label,
	options
}: {
	isEditing?: boolean;
	name: string;
	label: string;
	options: { label: string | number; value: string | number }[];
}) {
	const { register, setValue, watch } = useFormContext();
	const [optionOepn, setOptionOpen] = useState(false);
	const optionsRef = useRef<HTMLUListElement | null>(null);

	const toggleOptionHandler = () => {
		setOptionOpen((state) => !state);
	};

	useClickAway(optionsRef, () => {
		setOptionOpen(false);
	});

	return (
		<div className="relative">
			<label
				htmlFor={name}
				className={twMerge("post-input-title", isEditing && "text-[#aaaaaa]")}
			>
				{label}
			</label>
			<input
				onClick={toggleOptionHandler}
				className="input-style focus:outline-0 cursor-pointer"
				type="text"
				readOnly
				{...register(name)}
				value={options.find((opt) => opt.value === watch(name))?.label || ""}
			/>
			{optionOepn && (
				<ul
					ref={optionsRef}
					className={twMerge(
						"absolute top-[94px] w-full overflow-hidden border-1 border-[#d6d6d6] py-2 px-2 bg-white pb-2 rounded-b-[10px]",
						"dark:bg-[#333] dark:border-[#000] z-20"
					)}
				>
					{options.map((option) => (
						<li
							onClick={() => {
								toggleOptionHandler();
								setValue(name, option.value);
							}}
							key={option.value}
							className="px-5 py-2 rounded-sm hover:bg-[#E0F4F2] hover:text-[#06b796] cursor-pointer dark:hover:text-[#333]"
						>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

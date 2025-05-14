import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export default function LabelSelect({
	type,
	name,
	label,
	children
}: {
	type?: string;
	name: string;
	label: string;
	children: React.ReactNode;
}) {
	const { register } = useFormContext();
	const isEditing = type === "edit";
	return (
		<div>
			<label
				htmlFor={name}
				className={twMerge("post-input-title", isEditing && "text-[#aaaaaa]")}
			>
				{label}
			</label>
			<select
				className="input-style cursor-pointer focus:outline-none disabled:cursor-default disabled:text-[#aaaaaa]"
				id={name}
				{...register(name)}
				disabled={isEditing}
			>
				{children}
			</select>
		</div>
	);
}

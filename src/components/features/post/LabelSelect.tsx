import { useFormContext } from "react-hook-form";

export default function LabelSelect({
	name,
	label,
	children
}: {
	name: string;
	label: string;
	children: React.ReactNode;
}) {
	const { register } = useFormContext();
	return (
		<div>
			<label htmlFor={name} className="post-input-title">
				{label}
			</label>
			<select
				className="input-style cursor-pointer"
				id={name}
				{...register(name)}
			>
				{children}
			</select>
		</div>
	);
}

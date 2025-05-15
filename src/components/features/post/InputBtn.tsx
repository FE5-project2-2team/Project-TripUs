import { ComponentPropsWithoutRef } from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type InputProps = ComponentPropsWithoutRef<"input"> & { value: string };

export default function InputBtn(props: InputProps) {
	const { value, name, type, children } = props;
	const { register } = useFormContext();
	return (
		<label htmlFor={value}>
			<input
				className="peer hidden"
				id={value}
				value={value}
				type={type}
				{...register(`condition.${name}`)}
			/>
			<span
				className={twMerge(
					"cond-btn peer-checked:text-[#06b796] border-2 peer-checked:border-[#06b796]",
					"dark:bg-[#333]"
				)}
			>
				{children}
			</span>
		</label>
	);
}

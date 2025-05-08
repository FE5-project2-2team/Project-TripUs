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
				{...register(`condition.${name}`, {
					required:
						name === "gender"
							? "성별을 선택해 주세요"
							: "나이를 선택해 주세요(다중 선택 가능)"
				})}
			/>
			<span
				className={twMerge(
					"cond-btn peer-checked:text-[#06b796] border-2 peer-checked:border-[#06b796]"
				)}
			>
				{children}
			</span>
		</label>
	);
}

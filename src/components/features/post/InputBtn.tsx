import { ComponentPropsWithoutRef, useRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = ComponentPropsWithoutRef<"input"> & { value: string };

export default function InputBtn(props: InputProps) {
	const { value, children, ...rest } = props;
	const inputRef = useRef<null | HTMLInputElement>(null);
	return (
		<label htmlFor={value}>
			<input
				className="w-0 h-0 absolute"
				id={value}
				value={value}
				ref={inputRef}
				key={value}
				{...rest}
			/>
			<span
				className={twMerge(
					"cond-btn",
					inputRef.current?.checked &&
						"text-[#06b796] border-2 border-[#06b796]"
				)}
			>
				{children}
			</span>
		</label>
	);
}

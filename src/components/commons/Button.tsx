import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
	reverse?: boolean;
};

export default function Button(props: ButtonProps) {
	const { children, className, reverse, ...rest } = props;
	return (
		<button
			{...rest}
			className={twMerge(
				"flex justify-center items-center h-15 text-xl rounded-[10px] py-[17.5px] text-center font-bold cursor-pointer box-border",
				reverse
					? "bg-white text-[#06b796] border-2 border-[#06b796]"
					: "bg-[#06b796] text-white",
				className
			)}
		>
			{children}
		</button>
	);
}

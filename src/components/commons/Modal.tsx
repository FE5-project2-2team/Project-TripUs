import { twMerge } from "tailwind-merge";

export default function Modal({
	children,
	ref,
	className
}: {
	children: React.ReactNode;
	ref: React.RefObject<HTMLDivElement | null>;
	className?: string;
}) {
	return (
		<div
			ref={ref}
			className={twMerge(
				"z-60 bg-white dark:bg-[#313131] sm:w-[142px] p-[6px] border-0 rounded-[10px] absolute sm:right-[-11px] top-16 shadow-[0_1px_4px_0_rgba(0,0,0,0.16)]",
				"w-30 ",
				className
			)}
		>
			<ul className="flex flex-col gap-[6px]">{children}</ul>
		</div>
	);
}

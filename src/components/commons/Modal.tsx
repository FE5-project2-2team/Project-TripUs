import { twMerge } from "tailwind-merge";

export default function Modal({
	children,
	ref
}: {
	children: React.ReactNode;
	ref: React.RefObject<HTMLDivElement | null>;
}) {
	return (
		<div
			ref={ref}
			className={twMerge(
				"z-20 bg-white w-[142px] p-[6px] border-0 rounded-[10px] absolute right-[-11px] top-16 shadow-[0_1px_4px_0_rgba(0,0,0,0.16)]",
				"dark:bg-[#333]"
			)}
		>
			<ul className="flex flex-col gap-[6px]">{children}</ul>
		</div>
	);
}

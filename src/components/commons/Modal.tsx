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
			className="z-20 bg-white dark:bg-[#313131] w-[142px] p-[6px] border-0 rounded-[10px] absolute right-[-11px] top-16 shadow-[0px_2px_8px_rgba(0,0,0,0.20)]"
		>
			<ul className="flex flex-col gap-[6px]">{children}</ul>
		</div>
	);
}

export default function Modal({
	children,
	ref
}: {
	children: React.ReactNode;
	ref: React.RefObject<null>;
}) {
	return (
		<div
			ref={ref}
			className="z-20 bg-white w-[142px] p-[6px] border border-[#E0F4F2] rounded-[10px] absolute right-[-11px] top-12"
		>
			<ul className="flex flex-col gap-[6px]">{children}</ul>
		</div>
	);
}

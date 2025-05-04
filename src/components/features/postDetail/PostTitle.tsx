export default function PostTitle({
	isRecruiting,
	title,
	children
}: {
	isRecruiting: boolean | undefined;
	title: string | undefined;
	children: React.ReactNode;
}) {
	return (
		<div className="mb-9">
			<h2 className="flex justify-center items-center mb-[14px]">
				<span className="mr-4 text-xl text-[#06B796] px-3 bg-[#F3F4F6] py-[5.5px] rounded-lg">
					{isRecruiting ? "모집중" : "모집완료"}
				</span>
				<span className="text-[28px] font-medium">{title}</span>
			</h2>
			{children}
		</div>
	);
}

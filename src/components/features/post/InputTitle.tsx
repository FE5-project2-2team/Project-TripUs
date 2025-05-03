export default function InputTitle({
	title
}: {
	title: {
		value: string;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	};
}) {
	return (
		<div>
			<label htmlFor="title" className="post-input-title">
				제목
			</label>
			<input
				id="title"
				name="title"
				type="text"
				placeholder="제목을 입력해 주세요"
				className="bg-[#F9F9F9] w-full p-5 rounded-[10px] placeholder:text-[#CDCDCD]"
				{...title}
			/>
		</div>
	);
}

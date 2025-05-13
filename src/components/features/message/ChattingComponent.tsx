interface ChattingComponentProps {
	message: string;
	sender: UserData;
	createdAt: string;
	isMe: boolean;
}

export default function ChattingComponent({
	message,
	sender,
	createdAt,
	isMe
}: ChattingComponentProps) {
	const nickname = isMe
		? "나"
		: typeof sender.fullName === "string"
			? JSON.parse(sender.fullName).name
			: (sender.fullName as User).name;
	const time = new Date(createdAt).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});

	return (
		<div className={`flex my-5 ${isMe ? "justify-end" : ""}`}>
			{!isMe && (
				<div className="ml-3">
					<p className="text-xs text-[#333] mb-1">{nickname}</p>
					<div className="p-3 bg-white rounded-md max-w-[300px] break-words">
						<span className="text-sm text-[#333]">{message}</span>
					</div>
				</div>
			)}

			{isMe && (
				<div className="flex flex-col items-end mr-3">
					<p className="text-xs text-[#333] mb-1">{nickname}</p>
					<div className="p-3 bg-[#E0F4F2] rounded-md max-w-[300px] break-words">
						<span className="text-sm text-[#333]">{message}</span>
					</div>
				</div>
			)}

			<div
				className={`text-[11px] text-gray-400 ml-2 self-end ${
					isMe ? "order-first mr-1" : ""
				}`}
			>
				{time}
			</div>
		</div>
	);
}

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
	const nickname = isMe ? "나" : sender.fullName;
	const time = new Date(createdAt).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});

	return (
		<>
			{isMe ? (
				<div className="flex justify-end my-5">
					<div className="flex flex-col justify-end mr-3">
						<p className="text-xs text-black">{time}</p>
					</div>
					<div className="mr-3">
						<div className="flex justify-end">
							<p className="text-xs text-white">{nickname}</p>
						</div>
						<div className="p-3 bg-white rounded-md mt-2">
							<span className="text-xs text-black">{message}</span>
						</div>
					</div>
				</div>
			) : (
				<div className="flex my-5">
					<div className="ml-3">
						<p className="text-xs text-white">{nickname}</p>
						<div className="p-3 bg-white rounded-md mt-2">
							<span className="text-xs text-black">{message}</span>
						</div>
					</div>
					<div className="flex flex-col justify-end ml-3">
						<p className="text-xs text-black">{time}</p>
					</div>
				</div>
			)}
		</>
	);
}

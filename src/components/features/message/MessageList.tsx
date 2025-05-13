import ChattingComponent from "./ChattingComponent";

interface MessageListProps {
	messages: MessageData[];
	myUserId: string;
}

export default function MessageList({ messages, myUserId }: MessageListProps) {
	return (
		<div className="flex flex-col px-4 py-2 overflow-y-auto h-full">
			{messages.map((msg) => (
				<ChattingComponent
					key={msg._id}
					message={msg.message}
					sender={msg.sender}
					createdAt={msg.createdAt}
					isMe={msg.sender._id === myUserId}
				/>
			))}
		</div>
	);
}

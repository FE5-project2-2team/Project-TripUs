import { useEffect, useRef } from "react";
import ChattingComponent from "./ChattingComponent";

interface MessageListProps {
	messages: MessageData[];
	myUserId: string;
}

export default function MessageList({ messages, myUserId }: MessageListProps) {
	const bottomRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	return (
		<div className="flex flex-col px-4 py-2 overflow-y-auto h-full">
			{messages.map((msg, idx) => {
				const isMe = msg.sender._id === myUserId;

				const previous = messages[idx - 1];
				const isFirstOfGroup =
					!previous || previous.sender._id !== msg.sender._id;

				let showTime = true;
				if (previous) {
					const currentTime = new Date(msg.createdAt).getTime();
					const prevTime = new Date(previous.createdAt).getTime();
					const diff = currentTime - prevTime;
					if (diff < 60 * 1000) showTime = false;
				}

				return (
					<ChattingComponent
						key={msg._id}
						message={msg.message}
						sender={msg.sender}
						createdAt={msg.createdAt}
						isMe={isMe}
						seen={msg.seen}
						showProfileImage={!isMe && isFirstOfGroup}
						showTime={showTime}
						isFirstOfGroup={isFirstOfGroup}
					/>
				);
			})}
			<div ref={bottomRef} />
		</div>
	);
}

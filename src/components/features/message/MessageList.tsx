import { useEffect, useRef, useState } from "react";
import ChattingComponent from "./ChattingComponent";

interface MessageListProps {
	messages: MessageData[];
	myUserId: string;
}

export default function MessageList({ messages, myUserId }: MessageListProps) {
	const messageBoxRef = useRef<HTMLDivElement | null>(null);
	const [showScrollButton, setShowScrollButton] = useState(false);

	useEffect(() => {
		const box = messageBoxRef.current;
		if (!box) return;

		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = box;
			const isNearBottom = scrollTop + clientHeight >= scrollHeight - 10;

			// 아래에 있으면 버튼 숨기기, 위로 올라가면 표시
			setShowScrollButton(!isNearBottom);
		};

		box.addEventListener("scroll", handleScroll);
		return () => box.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToBottom = () => {
		const box = messageBoxRef.current;
		if (box) {
			box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
		}
	};

	return (
		<div
			ref={messageBoxRef}
			className="flex flex-col px-4 py-2 overflow-y-auto h-full custom-scrollbar"
		>
			{messages.map((msg, idx) => {
				const isMe = msg.sender._id === myUserId;
				const previous = messages[idx - 1];
				const next = messages[idx + 1];

				const isFirstOfGroup =
					!previous || previous.sender._id !== msg.sender._id;

				const currentDate = new Date(msg.createdAt);
				const nextDate = next ? new Date(next.createdAt) : null;

				const isSameSenderAsNext = next && next.sender._id === msg.sender._id;

				const isSameDate =
					nextDate &&
					currentDate.getFullYear() === nextDate.getFullYear() &&
					currentDate.getMonth() === nextDate.getMonth() &&
					currentDate.getDate() === nextDate.getDate();

				const isSameMinute =
					nextDate &&
					Math.abs(currentDate.getTime() - nextDate.getTime()) < 60 * 1000;

				const showTime =
					!nextDate || !isSameSenderAsNext || !isSameDate || !isSameMinute;

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

			{showScrollButton && (
				<button
					onClick={scrollToBottom}
					className={`absolute bottom-[72px] left-1/2 transform -translate-x-1/2 
						w-[40px] h-[40px] rounded-full bg-white border border-gray-300 
						flex items-center justify-center text-black text-xl transition-all duration-300 hover:opacity-80 hover:ring hover:ring-gray-200 
						${showScrollButton ? "opacity-100" : "opacity-0 pointer-events-none"}`}
				>
					↓
				</button>
			)}
		</div>
	);
}

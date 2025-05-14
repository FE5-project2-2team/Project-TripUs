import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuthStore } from "../store/authStore";
import { getMessageList, readMessage } from "../apis/message";
import MessageList from "../components/features/message/MessageList";
import MessageInput from "../components/features/message/MessageInput";

export default function Message() {
	const { id } = useParams();
	const [messages, setMessages] = useState<MessageData[]>([]);
	const myUserId = useAuthStore((state) => state.userId);

	const opponent =
		messages.length > 0
			? messages[0].sender._id === myUserId
				? messages[0].receiver
				: messages[0].sender
			: null;

	useEffect(() => {
		if (!id) return;

		const fetchMessages = async () => {
			try {
				const data = await getMessageList(id);
				setMessages(data);
				readMessage(id); // 읽음 처리
			} catch (err) {
				console.error("메시지 로딩 실패", err);
			}
		};
		fetchMessages();

		const interval = setInterval(fetchMessages, 3000);
		return () => clearInterval(interval);
	}, [id]);

	const handleNewMessage = (newMsg: MessageData) => {
		setMessages((prev) => [...prev, newMsg]);
	};

	return (
		<div className="flex flex-col h-full relative">
			{opponent && (
				<h2 className="px-4 text-[20px] font-semibold text-[#333] mt-[25px] mb-[25px]">
					{typeof opponent.fullName === "string"
						? JSON.parse(opponent.fullName).name
						: (opponent.fullName as User).name}
				</h2>
			)}

			<MessageList messages={messages} myUserId={myUserId!} />
			<MessageInput receiverId={id!} onMessageSent={handleNewMessage} />
		</div>
	);
}

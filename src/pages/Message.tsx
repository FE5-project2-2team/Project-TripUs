import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuthStore } from "../store/authStore";
import { getMessageList, readMessage } from "../apis/message";
import MessageList from "../components/features/message/MessageList";
import MessageInput from "../components/features/message/MessageInput";

export default function Message() {
	const { userId } = useParams();
	const [messages, setMessages] = useState<MessageData[]>([]);
	const myUserId = useAuthStore((state) => state.userId);

	useEffect(() => {
		if (!userId) return;

		getMessageList(userId)
			.then(setMessages)
			.catch((err) => console.error("메시지 조회 실패", err));
	}, [userId]);

	useEffect(() => {
		if (!userId) return;
		readMessage(userId);
	}, [userId]);
	return (
		<div className="flex flex-col h-full">
			<MessageList messages={messages} myUserId={myUserId!} />
			<MessageInput
				receiverId={userId!}
				onMessageSent={(newMsg) => setMessages((prev) => [...prev, newMsg])}
			/>
		</div>
	);
}

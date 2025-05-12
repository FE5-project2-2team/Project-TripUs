import { useState } from "react";
import { createMessage } from "../../../apis/message";

interface MessageInputProps {
	receiverId: string;
	onMessageSent: (newMessage: MessageData) => void;
}

export default function MessageInput({
	receiverId,
	onMessageSent
}: MessageInputProps) {
	const [text, setText] = useState("");

	const handleSend = async () => {
		if (!text.trim()) return;
		try {
			const data = await createMessage(text, receiverId);
			onMessageSent(data);
			setText("");
		} catch (err) {
			console.error("메시지 전송 실패", err);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") handleSend();
	};

	return (
		<div className="p-4 border-t flex">
			<input
				value={text}
				onChange={(e) => setText(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder="메시지를 입력하세요"
				className="flex-1 border rounded px-3 py-2 text-sm"
			/>
			<button
				onClick={handleSend}
				className="ml-2 px-4 py-2 bg-blue-500 text-white rounded text-sm"
			>
				전송
			</button>
		</div>
	);
}

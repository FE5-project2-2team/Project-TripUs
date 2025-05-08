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

	const handleSubmit = async () => {
		if (!text.trim()) return;

		try {
			const newMessage = await createMessage(text, receiverId);
			onMessageSent(newMessage);
			setText("");
		} catch (err) {
			console.error("메시지 전송 실패", err);
		}
	};

	return (
		<div className="p-2 border-t border-gray-300 flex">
			<input
				className="flex-1 border rounded p-2"
				placeholder="메시지를 입력하세요"
				value={text}
				onChange={(e) => setText(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter" && !e.shiftKey) {
						e.preventDefault();
						handleSubmit();
					}
				}}
			/>
			<button
				className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
				onClick={handleSubmit}
			>
				보내기
			</button>
		</div>
	);
}

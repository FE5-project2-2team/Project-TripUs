import { useParams } from "react-router";
import ConversationList from "./ConversationList";
import Message from "../../../pages/Message";

export default function MessageLayout() {
	const { id } = useParams();
	return (
		<div className="flex h-[calc(100vh-64px)] bg-[#F6FAF9]">
			<aside className="w-[400px] border-r border-gray-200 p-4 overflow-y-auto">
				<ConversationList />
			</aside>

			<main className="flex-1">
				{id ? (
					<Message />
				) : (
					<div className="flex items-center justify-center h-full text-gray-400">
						대화할 사용자를 선택해주세요.
					</div>
				)}
			</main>
		</div>
	);
}

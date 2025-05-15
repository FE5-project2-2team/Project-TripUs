import { useParams } from "react-router";
import ConversationList from "./ConversationList";
import Message from "../../../pages/Message";

export default function MessageLayout() {
	const { id } = useParams();
	return (
		<div className="w-full flex justify-center bg-[#F6FAF9]">
			<div className="w-[1280px] flex h-[calc(100vh-64px)]">
				<aside className="w-[400px] p-4 overflow-y-auto">
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
		</div>
	);
}

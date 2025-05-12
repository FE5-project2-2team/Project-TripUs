import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getConversations } from "../../../apis/message";
import { useAuthStore } from "../../../store/authStore";

export default function ConversationList() {
	const [conversations, setConversations] = useState<ConversationData[]>([]);
	const navigate = useNavigate();
	const myUserId = useAuthStore((state) => state.userId);

	useEffect(() => {
		const fetchConversations = async () => {
			try {
				const data = await getConversations();
				setConversations(data);
			} catch (err) {
				console.log("대화 목록 불러오기 실패", err);
			}
		};
		fetchConversations();
	}, []);

	const getDisplayName = (fullName: string | User) => {
		if (typeof fullName === "string") {
			try {
				const parsed = JSON.parse(fullName);
				return parsed.name || "이름없음";
			} catch {
				return fullName;
			}
		} else {
			return fullName.name;
		}
	};

	if (conversations.length === 0) {
		return (
			<div className="text-gray-400 text-center mt-10">
				아직 대화한 사람이 없습니다.
				<br />
				사람들과 대화를 시작해보세요!
			</div>
		);
	}

	return (
		<div className="w-full h-full overflow-y-auto p-2">
			{conversations.map((conv) => {
				const opponent =
					conv.sender._id === myUserId ? conv.receiver : conv.sender;

				const formattedTime = new Date(conv.createdAt).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit"
				});

				return (
					<div
						key={opponent._id}
						className="w-full h-[80px] bg-white rounded-[10px] flex items-center px-4 justify-between mt-4 hover:bg-gray-100 cursor-pointer"
						onClick={() => navigate(`/message/${opponent._id}`)}
					>
						<div className="flex items-center gap-4 overflow-hidden">
							<img
								src={opponent.image}
								alt="프로필"
								className="w-10 h-10 rounded-full mr-3"
							/>
							<div className="flex flex-col overflow-hidden">
								<div className="text-[18px] text-[#333] font-medium">
									{getDisplayName(opponent.fullName)}
								</div>
								<div className="text-sm text-gray-500 truncate max-w-[200px]">
									{conv.message}
								</div>
							</div>
						</div>

						<div className="text-xs text-gray-400 whitespace-nowrap ml-2">
							{formattedTime}
						</div>
					</div>
				);
			})}
		</div>
	);
}

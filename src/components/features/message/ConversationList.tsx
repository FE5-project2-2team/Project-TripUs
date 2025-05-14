import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getConversations } from "../../../apis/message";
import { useAuthStore } from "../../../store/authStore";
import Icon from "../../commons/Icon";

export default function ConversationList() {
	const [conversations, setConversations] = useState<ConversationData[]>([]);
	const navigate = useNavigate();
	const myUserId = useAuthStore((state) => state.userId);
	const [hoveredField, setHoveredField] = useState<string | null>(null);
	const [searchRoom, setSearchRoom] = useState("");

	const totalUnread = conversations.filter(
		(conv) => conv.receiver._id === myUserId && !conv.seen
	).length;

	useEffect(() => {
		const fetchConversations = async () => {
			try {
				const data = await getConversations();
				console.log("getConversation 응답", data);
				setConversations(data);
			} catch (err) {
				console.log("대화 목록 불러오기 실패", err);
			}
		};
		fetchConversations();

		const interval = setInterval(fetchConversations, 3000);
		return () => clearInterval(interval);
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

	const filteredConversations = conversations.filter((conv) => {
		const opponent = conv.sender._id === myUserId ? conv.receiver : conv.sender;
		const opponentName = getDisplayName(opponent.fullName);

		return opponentName.toLowerCase().includes(searchRoom.trim().toLowerCase());
	});

	return (
		<div className="w-full h-full overflow-y-auto p-2">
			<div className="pl-2 mb-[25px] text-[20px] font-semibold text-[#333333]">
				메시지{" "}
				{totalUnread > 0 && (
					<span className="text-[#FD346E] font-bold">{totalUnread}</span>
				)}
			</div>
			<div
				className="mb-4 w-full h-[50px] bg-white rounded-[10px] shadow-md relative group"
				onMouseEnter={() => setHoveredField("search")}
				onMouseLeave={() => setHoveredField(null)}
			>
				<input
					type="text"
					placeholder="검색"
					value={searchRoom}
					onChange={(e) => setSearchRoom(e.target.value)}
					className="w-full h-full pl-11 pr-4 text-[16px] text-[#616161] placeholder-[#616161] bg-transparent focus:outline-none"
				/>
				<div className="absolute left-4 top-1/2 -translate-y-1/2 w-[24px] h-[24px]">
					<Icon
						size="24px"
						position={
							hoveredField === "search" ? "-148px -345px" : "-34px -124px"
						}
					/>
				</div>
			</div>

			{filteredConversations.length === 0 ? (
				<div className="text-[#616161] text-center mt-6">
					검색 결과가 없습니다.
				</div>
			) : (
				filteredConversations.map((conv) => {
					const opponent =
						conv.sender._id === myUserId ? conv.receiver : conv.sender;

					const formattedTime = new Date(conv.createdAt).toLocaleTimeString(
						[],
						{
							hour: "2-digit",
							minute: "2-digit"
						}
					);

					return (
						<div
							key={opponent._id}
							className="w-full h-[80px] bg-[#FFFFFF] rounded-[10px] shadow-md 
							flex items-center px-4 justify-between mt-4 hover:bg-[#CEE6E2] cursor-pointer transition-colors"
							onClick={() => navigate(`/message/${opponent._id}`)}
						>
							<div className="flex items-center gap-4 overflow-hidden">
								<div className="relative w-[56px] h-[56px]">
									<img
										src={opponent.image}
										alt="프로필"
										className="w-[56px] h-[56px] rounded-full object-cover"
									/>

									{conv.receiver._id === myUserId && !conv.seen && (
										<span className="absolute top-0 right-0 w-[8px] h-[8px] bg-red-500 rounded-full"></span>
									)}
								</div>

								<div className="flex flex-col overflow-hidden">
									<div className="text-[18px] font-bold text-[#333333] leading-none">
										{getDisplayName(opponent.fullName)}
									</div>
									<div className="text-[16px] text-[#616161] mt-[9px] truncate max-w-[200px]">
										{conv.message}
									</div>
								</div>
							</div>

							<div className="text-[14px] text-[#7F7F7F] whitespace-nowrap ml-2 relative top-[14px]">
								{formattedTime}
							</div>
						</div>
					);
				})
			)}
		</div>
	);
}

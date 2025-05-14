import { useEffect } from "react";
import { useParams } from "react-router";
import { axiosInstance } from "../../../apis/axios";

interface ChattingComponentProps {
	message: string;
	sender: UserData;
	createdAt: string;
	isMe: boolean;
	seen: boolean;
	showProfileImage: boolean;
	showTime: boolean;
	isFirstOfGroup: boolean;
}

export default function ChattingComponent({
	message,
	sender,
	createdAt,
	isMe,
	seen,
	showProfileImage,
	showTime,
	isFirstOfGroup
}: ChattingComponentProps) {
	const nickname = isMe
		? "나"
		: typeof sender.fullName === "string"
			? JSON.parse(sender.fullName).name
			: (sender.fullName as User).name;
	const time = new Date(createdAt).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});

	const { id: opponentId } = useParams();

	useEffect(() => {
		const markAsSeen = async () => {
			try {
				await axiosInstance.put("/messages/update-seen", {
					sender: opponentId
				});
			} catch (err) {
				console.error("읽음 처리 실패", err);
			}
		};
		markAsSeen();
	}, [opponentId]);

	return (
		<div
			className={`flex ${isFirstOfGroup ? "my-4" : "my-[3px]"} ${isMe ? "justify-end" : ""}`}
		>
			{!isMe && (
				<div className="flex items-start gap-2 ml-3">
					{showProfileImage ? (
						<img
							src={sender.image}
							alt="상대 프로필"
							className="w-[60px] h-[60px] rounded-full object-cover mt-1"
						/>
					) : (
						<div className="w-[60px] h-[60px]" /> // 자리 유지를 위한 빈 박스 (선택)
					)}
					<div>
						{showProfileImage && (
							<p className="text-xs text-[#333] mb-1">{nickname}</p>
						)}
						<div className="flex items-baseline gap-1">
							<div className="p-3 bg-white rounded-md max-w-[300px] break-words">
								<span className="text-base text-[#333]">{message}</span>
							</div>
							{showTime && (
								<div className="text-[14px] text-gray-400 ml-2 self-end">
									{time}
								</div>
							)}
						</div>
					</div>
				</div>
			)}

			{isMe && (
				<div className="flex justify-end items-end gap-2 my-2 mr-3">
					<div className="flex items-center gap-1">
						{isMe && !seen && (
							<span className="text-[16px] text-[#808080] w-[16px] h-[16px] flex items-center justify-center">
								1
							</span>
						)}
						{showTime && (
							<span className="text-[14px] text-gray-400">{time}</span>
						)}
					</div>

					<div className="p-3 bg-[#E0F4F2] rounded-md max-w-[300px] break-words">
						<span className="text-base text-[#333]">{message}</span>
					</div>
				</div>
			)}
		</div>
	);
}

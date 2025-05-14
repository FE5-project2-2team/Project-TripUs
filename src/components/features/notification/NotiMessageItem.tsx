import { useNavigate } from "react-router";
import profileImg from "../../../assets/images/profileImg_circle.svg";
// import { useEffect } from "react";

export default function NotiMessageItem({
	notice,
	onClose,
	setNotiInfo
}: {
	notice: NotiData;
	onClose: () => void;
	setNotiInfo: React.Dispatch<React.SetStateAction<NotiData[]>>;
}) {
	const navigate = useNavigate();
	// const [isSeen, setIsSeen] = useState(notice.seen);
	const formatTime = (time: string): string => {
		if (!time) return "시간정보없음";

		const date = new Date(time);
		let hours = date.getHours();
		const min = date.getMinutes();
		const period = hours >= 12 ? "PM" : "AM";

		hours = hours % 12;
		if (hours === 0) hours = 12;
		return `${String(hours).padStart(2, "0")}:${String(min).padStart(2, "0")} ${period}`;
	};
	const nickname = JSON.parse(notice.author.fullName).nickname;
	const userImage = notice.author.image || profileImg;
	const time = formatTime(notice.createdAt);

	const handleClick = async () => {
		try {
			if (notice.post) {
				setNotiInfo((noti) =>
					noti.map((n) => (n._id === notice._id ? { ...n, seen: true } : n))
				);
				navigate(`/post/detail/${notice.post}`);
				onClose();
			}
		} catch (e) {
			console.error("알람 읽음 처리 실패", e);
		}
	};
	return (
		<div
			className="flex items-center w-full h-[100px] border-b border-[#CDCDCD] cursor-pointer hover:bg-[#F3F4F6] transition-colors duration-150"
			onClick={handleClick}
		>
			<div className="relative flex items-center">
				<img
					className="w-[60px] h-[60px] rounded-full ml-[30px]"
					src={userImage}
					alt="사용자이미지"
				/>
				{!notice.seen && (
					<div className="absolute w-[10px] h-[10px] rounded-full top-[-5px] right-[-5px] bg-[#FD346E]" />
				)}
			</div>

			<div className="flex flex-col ml-[14px] w-[426px]">
				<div className="w-full">
					<div className="flex justify-between items-center w-full">
						<div className="text-[16px]">
							{nickname}님이 메시지를를 보내셨습니다.
						</div>
						<div className="text-[14px] whitespace-nowrap">{time}</div>
					</div>
					<div className="text-[14px]"></div>
				</div>
			</div>
		</div>
	);
}

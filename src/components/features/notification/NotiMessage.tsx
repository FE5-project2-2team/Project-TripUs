import { useEffect, useState } from "react";
import { getNotiList, readNoti } from "../../../apis/notification";
import { getConversations } from "../../../apis/message";

export default function NotiMessage() {
	const [notiInfo, setNotiInfo] = useState<NotiData[] | []>([]);
	const [message, setMessage] = useState<MessageData[]>([]);
	const formatTime = (time: string): string => {
		const date = new Date(time);
		const kstTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);

		let hours = kstTime.getHours();
		const min = kstTime.getMinutes();
		const period = hours >= 12 ? "PM" : "AM";

		hours = hours % 12;
		if (hours === 0) hours = 12;
		return `${String(hours).padStart(2, "0")}:${String(min).padStart(2, "0")} ${period}`;
	};

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const conversations = await getConversations();
				const unread = conversations.filter((msg: MessageData) => !msg.seen);
				setMessage(unread);
			} catch (error) {
				console.error("메시지 불러오기 실패", error);
			}
		};
		fetchMessages();
	}, []);

	useEffect(() => {
		const SeenFunc = async () => {
			try {
				await readNoti();
			} catch (e) {
				console.error("에러처리", e);
			}
		};
		SeenFunc();
	}, []);

	useEffect(() => {
		const NotiFunc = async () => {
			const myNotiInfo: NotiData[] = await getNotiList();
			setNotiInfo(myNotiInfo);
		};
		NotiFunc();
	}, []);

	return (
		<>
			{/* {notiInfo && notiInfo.length > 0 ? (
				//메시지
				notiInfo
					.filter(
						(notice) =>
							notice.notitype === "MESSAGE" &&
							message.some((msg) => msg.sender._id === notice.author._id)
					)
					.map((notice) => (
						<div
							key={notice._id}
							className="relative flex flex-col items-center w-full h-[100px]"
						>
							<img
								className="w-[60px] h-[60px] rounded-full ml-[30px]"
								src={notice.author.image}
								alt="사용자이미지"
							/>
							{!notice.seen && (
								<div className="absolute w-[10px] h-[10px] rounded-full top-[5px] right-[30px] bg-[#FD346E] "></div>
							)}
							<div className="flex flex-col justify-between">
								<div className="flex items-center w-[426px] h-[49px] ml-[14px]">
									<div className="text-[16px]">
										{JSON.parse(notice.author.fullName).name}님이 메시지를
										보내셨습니다.
									</div>

									<div className="text-[14px]">{notice.message}</div>
								</div>

								<div className="mt-[30px] text-[14px]">
									{formatTime(notice.createdAt)}
								</div>
							</div>
						</div>
					))
			) : (
				<div className="flex items-center justify-center w-full h-[500px]">
					표시할 알림이 없습니다
				</div>
			)} */}
			<h1>message component</h1>
		</>
	);
}

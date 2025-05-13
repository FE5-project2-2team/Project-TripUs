import profileImg from "../../../assets/images/profileImg_circle.svg";

export default function NotiItem({ notice }: { notice: NotiData }) {
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

	// console.log("user:", notice.user);
	// console.log("author:", notice.author);
	const nickname = JSON.parse(notice.author.fullName).nickname;
	const userImage = notice.author.image || profileImg;
	const time = formatTime(notice.createdAt);

	return (
		<div className="flex items-center w-full h-[100px]">
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
				{notice.like && (
					<div className="flex justify-between items-center w-full">
						<div className="text-[16px]">
							{nickname}님이 게시글에 좋아요를 남기셨습니다.
						</div>
						<div className="text-[14px]">{time}</div>
					</div>
				)}

				{notice.comment && (
					<div className="w-full">
						<div className="flex justify-between items-center w-full">
							<div className="text-[16px]">
								{nickname}님이 게시글에 댓글을 남기셨습니다.
							</div>
							<div className="text-[14px] whitespace-nowrap">{time}</div>
						</div>
						<div className="text-[14px]">
							{JSON.parse(notice.comment?.comment).value}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

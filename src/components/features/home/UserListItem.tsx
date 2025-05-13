import defaultProfileImage from "../../../assets/images/profileImg_circle.svg";

interface UserListItemProps {
	user: UserHomeData;
	onClick: () => void;
}

export default function UserListItem({ user, onClick }: UserListItemProps) {
	const { name, gender, age } = user.fullName as User;
	const ageGroup = Math.floor(age / 10) * 10;
	const isOnline = user.isOnline;

	// 이미지가 없으면 기본 이미지 사용
	const profileImage = user.image?.trim() ? user.image : defaultProfileImage;

	return (
		<div
			className="flex items-center gap-3 p-[10px] cursor-pointer mb-[5px] rounded-[8px] hover:bg-[#F6FAF9]"
			onClick={onClick}
		>
			<div className="relative w-[50px] h-[50px]">
				<img
					src={profileImage}
					alt="사용자"
					className="w-full h-full rounded-full object-cover"
				/>
				{/* isOnline 상태 표시 뱃지 */}
				<span
					className={`absolute bottom-0 right-0 w-[12px] h-[12px] rounded-full border-[2px] border-white ${
						isOnline ? "bg-[#06B796]" : "bg-gray-400"
					}`}
					title={isOnline ? "온라인" : "오프라인"}
				/>
			</div>
			<div>
				<div className="text-[16px] font-medium">{name}</div>
				<ul className="text-[14px] text-gray-500 flex gap-[12px]">
					<li>{ageGroup}대</li>
					<li>{gender}</li>
				</ul>
			</div>
		</div>
	);
}

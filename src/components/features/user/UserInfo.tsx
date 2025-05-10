import ProfileImage from "../../commons/ProfileImage";
export default function UserInfo({
	isRecruitChannel,
	image,
	authorInfo,
	userId
}: {
	isRecruitChannel: boolean;
	image: string;
	authorInfo: {
		nickname: string;
		age: number;
		gender: string;
	};
	userId: string;
}) {
	const { nickname, age, gender } = authorInfo;
	return (
		<div>
			<span className="post-sub-title">{isRecruitChannel && "캡틴"}</span>
			<div className="flex gap-[10px]">
				<ProfileImage userId={userId} image={image} />
				<div>
					<span className="block font-medium">{nickname}</span>
					<div className="flex gap-2 text-[#616161]">
						<span>{Math.floor(age / 10) * 10}대</span>
						<span>{gender}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

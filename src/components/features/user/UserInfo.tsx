import { Link } from "react-router";
import profileCircle from "../../../assets/images/profileImg_circle.svg";
export default function UserInfo({
	authorInfo,
	userId
}: {
	authorInfo: {
		image: string;
		nickname: string;
		age: number;
		gender: string;
	};
	userId: string;
}) {
	const { image, nickname, age, gender } = authorInfo;
	return (
		<Link to={`profile/${userId}`}>
			<span className="post-sub-title">캡틴</span>
			<div className="flex gap-[10px]">
				<img
					className="w-[50px] h-[50px] rounded-full"
					src={image || profileCircle}
					alt="프로필 이미지"
				/>
				<div>
					<span className="block font-medium">{nickname}</span>
					<div className="flex gap-2 text-[#616161]">
						<span>{Math.floor(age / 10) * 10}대</span>
						<span>{gender}</span>
					</div>
				</div>
			</div>
		</Link>
	);
}

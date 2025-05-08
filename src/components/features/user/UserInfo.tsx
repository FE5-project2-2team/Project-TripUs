import { Link } from "react-router";
import profileCircle from "../../../assets/images/profileImg_circle.svg";
export default function UserInfo({
	image,
	authorInfo,
	userId
}: {
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
			<span className="post-sub-title">캡틴</span>
			<div className="flex gap-[10px]">
				<Link to={`profile/${userId}`}>
					<img
						className="w-[50px] h-[50px] rounded-full"
						src={image || profileCircle}
						alt="프로필 이미지"
					/>
				</Link>
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

import spriteImage from "../../../assets/images/spriteImages.png";
import { useNavigate } from "react-router";
// import Button from "./Button";

// 상단 "마이페이지 & 리뷰" 및 "회원정보 수정" 버튼
export default function ProfileHeader({
	onEditClick
}: {
	onEditClick: () => void;
}) {
	const navigate = useNavigate();

	return (
		<div className="flex items-center justify-between mb-[50px]">
			<div className="flex">
				<button
					className="mr-[8px] w-[30px] h-[30px] cursor-pointer"
					style={{
						backgroundImage: `url(${spriteImage})`,
						backgroundPosition: "-135px -147px",
						backgroundSize: "367.5px 570px",
						backgroundRepeat: "no-repeat"
					}}
					aria-label="Go Back"
					onClick={() => navigate("/")}
				/>
				<h2 className="font-medium text-[20px] text-[#333333]">
					마이페이지 & 리뷰
				</h2>
			</div>
			<button
				onClick={onEditClick}
				className="inline-flex items-center justify-center w-[160px] h-[40px] font-medium text-[18px] text-white bg-[#06b796] px-[27px] py-[7px] rounded-[8px] cursor-pointer"
			>
				회원정보 수정
			</button>
		</div>
	);
}

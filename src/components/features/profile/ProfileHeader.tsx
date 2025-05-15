// import spriteImage from "../../../assets/images/spriteImages.png";
import { useNavigate } from "react-router";
import { useThemeStore } from "../../../store/themeStore";
import Icon from "../../commons/Icon";

interface ProfileHeaderProps {
	onEditClick: () => void;
	isMyPage: boolean;
	userId: string | null;
}

export default function ProfileHeader({ onEditClick, isMyPage, userId }: ProfileHeaderProps) {
	const navigate = useNavigate();

	// darkmode
	const isDark = useThemeStore((state) => state.isDark);
	const backIconPosition = isDark ? "50.218% 27.747%" : "39.301% 27.747%";
	const buttonText = isMyPage ? "회원정보 수정" : "채팅 보내기";
	const buttonColor = isMyPage ? "bg-[#06b796]" : "bg-[#1C274C]";
	const handleButtonClick = () => {
		if (isMyPage) {
			onEditClick();
		} else {
			navigate(`/message/${userId}`);
		}
	};

	return (
		<div className="flex items-center justify-between mb-[50px]">
			<div className="flex">
				<button
					className="mr-[12px] mt-[3px] cursor-pointer"
					className="mr-[8px] w-[30px] h-[30px] cursor-pointer bg-no-repeat"
					style={{
						backgroundImage: `url(${spriteImage})`,
						backgroundPosition: "-135px -147px",
						backgroundSize: "367.5px 570px",
						// backgroundRepeat: "no-repeat"
					}}
					aria-label="Go Back"
					onClick={() => navigate("/")}
				>
					<Icon position={backIconPosition} size="16px" />
				</button>
				<h2 className="font-medium text-[20px] text-[#333333] dark:text-[#dadada]">
					마이페이지 & 리뷰
				</h2>
			</div>
			
			<button
				onClick={handleButtonClick}
				className={`inline-flex items-center justify-center w-[160px] h-[40px] font-medium text-[18px] text-white px-[27px] py-[7px] rounded-[8px] cursor-pointer ${buttonColor}`}
			>
				{buttonText}
			</button>
		</div>
	);
}

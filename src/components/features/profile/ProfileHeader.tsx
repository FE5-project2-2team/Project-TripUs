import { useNavigate } from "react-router";
import { useThemeStore } from "../../../store/themeStore";
import Icon from "../../commons/Icon";

export default function ProfileHeader({
	onEditClick,
	isMyPage,
	userId
}: {
	userId: string | null;
	isMyPage: boolean;
	onEditClick: () => void;
}) {
	const navigate = useNavigate();

	// darkmode
	const isDark = useThemeStore((state) => state.isDark);
	const backIconPosition = isDark ? "50.218% 27.747%" : "39.301% 27.747%";

	return (
		<div className="flex items-center justify-between mb-[50px]">
			<div className="flex">
				<button
					className="mr-[12px] mt-[3px] cursor-pointer"
					aria-label="Go Back"
					onClick={() => navigate("/")}
				>
					<Icon position={backIconPosition} size="16px" />
				</button>
				<h2 className="font-medium text-[20px] text-[#333333] dark:text-[#dadada]">
					마이페이지 & 리뷰
				</h2>
			</div>
			{isMyPage ? (
				<button
					onClick={onEditClick}
					className="select-none inline-flex items-center justify-center w-[160px] h-[40px] font-medium text-[18px] text-white bg-[#06b796] px-[27px] py-[7px] rounded-[8px] cursor-pointer"
				>
					회원정보 수정
				</button>
			) : (
				<button
					onClick={() => navigate(`/message/${userId}`)}
					className="inline-flex items-center justify-center w-[160px] h-[40px] font-medium text-[18px] text-white bg-[#1C274C] px-[27px] py-[7px] rounded-[8px] cursor-pointer"
				>
					채팅 보내기
				</button>
			)}
		</div>
	);
}
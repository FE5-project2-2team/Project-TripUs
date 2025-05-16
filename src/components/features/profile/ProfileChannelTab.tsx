import { useState } from "react";
// import Button from "../../commons/Button";
import ReviewTab from "./ReviewTab";
import CrewTab from "./CrewTab";

export default function ProfileChannelTab({
	userId,
	isMyPage
}: {
	userId: string;
	isMyPage: boolean;
}) {
	const [activeTab, setActiveTab] = useState<"review" | "crews">("review");

	return (
		<div className="sm:w-[1100px] mx-auto sm:mt-[30px] mt-[28px]">
			{/* 탭 버튼 */}
			<div className="flex bg-[#ffffff] sm:bg-[#F3F4F6] rounded-[10px] dark:bg-[#2e2e2e] font-regular sm:font-medium">
				<button
					onClick={() => setActiveTab("review")}
					className={`h-[43px] sm:h-[50px] flex-1 py-2 text-center select-none ${
						activeTab === "review"
							? "text-[#06B796] m-[5px] text-[16px] sm:text-[18px] border-b-[1px] border-[#06B796] sm:border sm:rounded-[10px] sm:bg-[#06B796] sm:text-[#FFFFFF]"
							: "text-[#333333] m-[5px] text-[16px] sm:text-[18px] border-b-[1px] border-[#F5F5F6] dark:text-[#dadada]"
					}`}
				>
					후기 게시글
				</button>
				<button
					onClick={() => setActiveTab("crews")}
					className={`h-[43px] sm:h-[50px] flex-1 py-2 text-center select-none ${
						activeTab === "crews"
							? "text-[#06B796] m-[5px] text-[16px] sm:text-[18px] border-b-[1px] border-[#06B796] sm:border sm:rounded-[10px] sm:bg-[#06B796] sm:text-[#FFFFFF]"
							: "text-[#333333] m-[5px] text-[16px] sm:text-[18px] border-b-[1px] border-[#F5F5F6] dark:text-[#dadada]"
					}`}
				>
					동행 게시글
				</button>
			</div>
			{/* 탭 내용 */}
			<div className="h-full flex pb-[30px]">
				<div className={activeTab === "review" ? "block" : "hidden"}>
					<ReviewTab authorId={userId} isMyPage={isMyPage} />
				</div>

				<div className={activeTab === "crews" ? "block" : "hidden"}>
					<CrewTab authorId={userId} isMyPage={isMyPage} />
				</div>
			</div>
		</div>
	);
}

import { useState } from "react";
import Icon from "../../commons/Icon";
import NotiWhole from "./NotiWhole";
import NotiPosts from "./NotiPosts";
import NotiMessage from "./NotiMessage";
import NotiRequest from "./NotiRequest";

export default function NotificationList({
	notiOpen,
	setNotiOpen
}: {
	notiOpen: boolean;
	setNotiOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const bannerArr = ["전체", "게시글", "메시지", "동행요청"];
	const [notiContents, setNotiContents] = useState("전체");
	const handleClose = () => {
		setNotiOpen(false);
	};
	return (
		<>
			<div className="w-[560px] min-h-[664px] rounded-[10px] bg-[#fff] border border-[#D9D9D9] shadow-xl">
				{/* 상단-알림,x버튼*/}
				<div className="w-[500px] h-[29px] flex items-center justify-between mt-5 mx-6">
					<div className="mt-5 text-[24px] font-bold">알림</div>
					{notiOpen && (
						<button
							onClick={() => setNotiOpen(!notiOpen)}
							className="cursor-pointer"
						>
							<Icon position="28.571% 25.869%" size="24px" />
						</button>
					)}
				</div>

				{/* 배너 */}
				<div className="w-full h-[37px] border-b-[1px] border-b-[#7F7F7F]">
					<div className="flex flex-row w-[416px] h-[37px] ml-[30px] mt-5 gap-[6px]">
						{bannerArr.map((banner) => (
							<button
								key={banner}
								className={
									"relative w-[100px] h-[37px] flex items-center justify-center cursor-pointer"
								}
								onClick={() => {
									setNotiContents(banner);
								}}
							>
								<span
									className={`z-10 ${notiContents === banner ? "text-[#06B796]" : "text-[#333333]"}`}
								>
									{banner}
								</span>
								{banner === notiContents && (
									<div className="absolute bottom-0 w-[90px] border-b-[3px] border-[#06B796]" />
								)}
							</button>
						))}
					</div>
				</div>

				{/* 알림 내용들 */}
				<div className="w-full h-[500px] overflow-y-auto">
					{notiContents === "전체" && <NotiWhole onClose={handleClose} />}
					{notiContents === "게시글" && <NotiPosts onClose={handleClose} />}
					{notiContents === "메시지" && <NotiMessage onClose={handleClose} />}
					{notiContents === "동행요청" && <NotiRequest onClose={handleClose} />}
				</div>
				{/* 모두읽음 */}
				<div className="flex justify-end items-center border-t border-t-[#CDCDCD]">
					<button className="flex items-center h-[22px] text-[18px] mt-[18px] mr-[30px] text-[#333333] cursor-pointer">
						모두 읽음
					</button>
				</div>
			</div>
		</>
	);
}

import { useEffect, useState } from "react";
import Icon from "../../commons/Icon";
import NotiWhole from "./NotiWhole";
import NotiPosts from "./NotiPosts";
import NotiMessage from "./NotiMessage";
import NotiRequest from "./NotiRequest";
import { readNoti } from "../../../apis/notification";
import { useNoti } from "../../../context/useNoti";

export default function NotiList({
	notiOpen,
	setNotiOpen
	// notiInfo,
	// setNotiInfo
}: {
	notiOpen: boolean;
	setNotiOpen: React.Dispatch<React.SetStateAction<boolean>>;
	// notiInfo: NotiData[];
	// setNotiInfo: React.Dispatch<React.SetStateAction<NotiData[]>>;
}) {
	const bannerArr = ["전체", "게시글", "메시지", "동행요청"];
	const [notiContents, setNotiContents] = useState("전체");
	const { notiInfo, setNotiInfo } = useNoti();
	// useEffect(() => {
	// 	//알림
	// 	const NotiFunc = async () => {
	// 		try {
	// 			const myNotiInfo: NotiData[] = await getNotiList();
	// 			console.log("서버 알림 응답:", myNotiInfo);
	// 			setNotiInfo((prev) => {
	// 				const prevById = new Map(prev.map((n) => [n._id, n]));
	// 				const merged = myNotiInfo.map((n) => {
	// 					const existing = prevById.get(n._id);
	// 					return existing ? { ...n, seen: existing.seen } : n;
	// 				});
	// 				return merged;
	// 			});
	// 		} catch (e) {
	// 			console.error("알림 가져오기 에러:", e);
	// 		}
	// 	};
	// 	NotiFunc();
	// 	//
	// }, [setNotiInfo]);
	//모든 알림 읽었다면 readNoti보내기
	// useEffect(() => {

	// 	if(notiOpen&&notiInfo.length>0){
	// 		const hasUnread=notiInfo.some((n)=>!n.seen);
	// 		if(hasUnread){
	// 			handleRead();
	// 		}
	// 	const markNoti = async () => {
	// 		if (notiInfo.every((n) => n.seen)) {
	// 			try {
	// 				await readNoti();
	// 			} catch (e) {
	// 				console.error("읽음 처리 실패", e);
	// 			}
	// 		}
	// 	};
	// if(notiOpen){
	// 	markNoti();
	// }
	// },[notiOpen,notiInfo]);
	useEffect(() => {
		setNotiInfo((notice) => {
			let updated = false;

			const updatedNotice = notice.map((n) => {
				const isEmpty =
					("like" in n && !n.like) ||
					("comment" in n && !n.comment) ||
					("message" in n && !n.message);
				if (isEmpty && !n.seen) {
					updated = true;
					return { ...n, seen: true };
				}
				return n;
			});
			return updated ? updatedNotice : notice;
		});
	}, [setNotiInfo]);
	const handleClose = () => {
		setNotiOpen(false);
	};
	const handleRead = async () => {
		try {
			// const hasUnread = notiInfo.some((n) => !n.seen);
			// if (!hasUnread) return;
			await readNoti();
			setNotiInfo((notice) => notice.map((n) => ({ ...n, seen: true })));
		} catch (e) {
			console.error("모두 읽음처리 실패", e);
		}
	};
	const filtered = () => {
		switch (notiContents) {
			case "게시글":
				return notiInfo.filter(
					(notice) => "like" in notice || "comment" in notice
				);
			case "메시지":
				return notiInfo.filter((notice) => "message" in notice);
			case "동행요청":
				return notiInfo.filter(
					(notice) =>
						!("comment" in notice) &&
						!("like" in notice) &&
						!("message" in notice)
				);
			default:
				return notiInfo;
		}
	};

	const filteredBannerNoti = () => {
		const filterNoti = filtered();
		switch (notiContents) {
			case "전체":
				return (
					<NotiWhole
						noti={filterNoti}
						onClose={handleClose}
						// setNotiInfo={setNotiInfo}
					/>
				);
			case "게시글":
				return (
					<NotiPosts
						noti={filterNoti}
						onClose={handleClose}
						// setNotiInfo={setNotiInfo}
					/>
				);
			case "메시지":
				return (
					<NotiMessage
						noti={filterNoti}
						onClose={handleClose}
						// setNotiInfo={setNotiInfo}
					/>
				);
			case "동행요청":
				return (
					<NotiRequest
						noti={filterNoti}
						onClose={handleClose}
						// setNotiInfo={setNotiInfo}
					/>
				);
			default:
				return null;
		}
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
					{filteredBannerNoti()}
				</div>
				{/* 모두읽음 */}
				<div className="flex justify-end items-center border-t border-t-[#CDCDCD]">
					<button
						className="flex items-center h-[22px] text-[18px] mt-[18px] mr-[30px] text-[#333333] cursor-pointer"
						onClick={handleRead}
					>
						모두 읽음
					</button>
				</div>
			</div>
		</>
	);
}

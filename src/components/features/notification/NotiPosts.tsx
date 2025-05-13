import { useEffect, useState } from "react";
import { getNotiList, readNoti } from "../../../apis/notification";
import { useAuthStore } from "../../../store/authStore";
import NotiPostItem from "./NotiPostItem";

export default function NotiPosts({ onClose }: { onClose: () => void }) {
	const [notiInfo, setNotiInfo] = useState<NotiData[] | []>([]);
	const userId = useAuthStore((state) => state.userId)!;

	useEffect(() => {
		const NotiFunc = async () => {
			try {
				const myNotiInfo: NotiData[] = await getNotiList();
				// console.log("알림 목록:", myNotiInfo);
				// myNotiInfo.map((noti) => console.log(noti.comment));
				setNotiInfo(myNotiInfo);
				await readNoti();
			} catch (e) {
				console.error(e);
			}
		};
		NotiFunc();
	}, []);
	return (
		<>
			{
				//댓글,좋아요
				notiInfo.filter(
					(notice) =>
						(notice.like || notice.comment) &&
						(notice.user as UserData)._id === userId
				).length > 0 ? (
					notiInfo
						.filter(
							(notice) =>
								(notice.like || notice.comment) &&
								(notice.user as UserData)._id === userId
						)
						.map((notice) => (
							<NotiPostItem
								key={notice._id}
								notice={notice}
								onClose={onClose}
							/>
						))
				) : (
					<div className="flex items-center justify-center w-full h-[500px]">
						표시할 알림이 없습니다
					</div>
				)
			}
		</>
	);
}

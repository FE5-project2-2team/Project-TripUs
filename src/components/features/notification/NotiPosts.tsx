import { useEffect, useState } from "react";
import { getNotiList, readNoti } from "../../../apis/notification";
import { useAuthStore } from "../../../store/authStore";
import NotiItem from "./NotiItem";

export default function NotiPosts() {
	const [notiInfo, setNotiInfo] = useState<NotiData[] | []>([]);
	const userId = useAuthStore((state) => state.userId)!;

	useEffect(() => {
		const NotiFunc = async () => {
			try {
				const myNotiInfo: NotiData[] = await getNotiList();
				console.log("알림 목록:", myNotiInfo);
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
			{notiInfo.length > 0 ? (
				//댓글,좋아요
				notiInfo
					.filter(
						(notice) =>
							(notice.like || notice.comment) &&
							(notice.user as UserData)._id === userId
					)
					.map((notice) => <NotiItem key={notice._id} notice={notice} />)
			) : (
				<div className="flex items-center justify-center w-full h-[500px]">
					표시할 알림이 없습니다
				</div>
			)}
		</>
	);
}

import { useEffect, useState } from "react";
import { getNotiList, readNoti } from "../../../apis/notification";
import { useAuthStore } from "../../../store/authStore";
import NotiRequestItem from "./NotiRequestItem";
// import profileImg from "../../../assets/images/profileImg_circle.svg";
export default function NotiRequest() {
	const [notiInfo, setNotiInfo] = useState<NotiData[] | []>([]);
	const userId = useAuthStore((state) => state.userId)!;

	useEffect(() => {
		const NotiFunc = async () => {
			try {
				// console.log("알림요청시작");
				const myNotiInfo: NotiData[] = await getNotiList();
				// console.log("알림 목록:", myNotiInfo);
				// myNotiInfo.map((noti) => console.log(noti.comment));
				setNotiInfo(myNotiInfo);
				await readNoti();
			} catch (e) {
				console.error("알림요청실패", e);
			}
		};
		NotiFunc();
	}, []);
	return (
		<>
			{notiInfo.length > 0 ? (
				//동행신청
				notiInfo
					.filter(
						(notice) =>
							!notice.comment && (notice.user as UserData)._id === userId
					)
					.map((notice) => <NotiRequestItem key={notice._id} notice={notice} />)
			) : (
				<div className="flex items-center justify-center w-full h-[500px]">
					표시할 알림이 없습니다
				</div>
			)}
		</>
	);
}

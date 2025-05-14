import NotiMessageItem from "./NotiMessageItem";
import NotiPostItem from "./NotiPostItem";
import NotiRequestItem from "./NotiRequestItem";
import { useAuthStore } from "../../../store/authStore";

export default function NotiWhole({
	noti,
	onClose,
	setNotiInfo
}: {
	noti: NotiData[];
	onClose: () => void;
	setNotiInfo: React.Dispatch<React.SetStateAction<NotiData[]>>;
}) {
	const userId = useAuthStore((state) => state.userId)!;

	const sortNoti = [...noti]
		.filter((notice) => (notice.user as UserData)._id === userId)
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		);
	return (
		<>
			{sortNoti.length > 0 ? (
				//동행신청
				sortNoti.map((notice) =>
					notice.like || notice.comment ? (
						<NotiPostItem
							key={notice._id}
							notice={notice}
							onClose={onClose}
							setNotiInfo={setNotiInfo}
						/>
					) : notice.message ? (
						<NotiMessageItem
							key={notice._id}
							notice={notice}
							onClose={onClose}
							setNotiInfo={setNotiInfo}
						/>
					) : (
						<NotiRequestItem
							key={notice._id}
							notice={notice}
							onClose={onClose}
							setNotiInfo={setNotiInfo}
						/>
					)
				)
			) : (
				<div className="flex items-center justify-center w-full h-[500px]">
					표시할 알림이 없습니다
				</div>
			)}
		</>
	);
}

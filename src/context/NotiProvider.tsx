import { useCallback, useEffect, useState } from "react";
import { getNotiList, readNoti } from "../apis/notification";
import { NotiContext } from "./NotiContext";

export function NotiProvider({ children }: { children: React.ReactNode }) {
	const [notiInfo, setNotiInfo] = useState<NotiData[]>([]);

	const refetchNotiList = useCallback(async () => {
		try {
			const res: NotiData[] = await getNotiList();
			console.log("알림목록res:", res);
			// setNotiInfo(res);
			setNotiInfo((prev) => {
				if (prev.length === 0) return res;
				const prevIdSet = new Set(prev.map((noti) => noti._id));
				const newNotis = res.filter((noti) => !prevIdSet.has(noti._id));
				const combined = [...newNotis, ...prev];
				console.log("중복처리전:", combined);
				const mergedMap = new Map<string, NotiData>();

				for (const noti of combined) {
					const existing = mergedMap.get(noti._id);
					if (existing) {
						mergedMap.set(noti._id, {
							...noti,
							seen: noti.seen || existing.seen
						});
					} else {
						mergedMap.set(noti._id, noti);
					}
				}
				const after = Array.from(mergedMap.values());
				console.log("중복처리후:", after);
				return after;
			});
		} catch (err) {
			console.error("알림 목록 가져오기 실패:", err);
		}
	}, []);

	useEffect(() => {
		if (notiInfo.length > 0 && notiInfo.every((noti) => noti.seen)) {
			readNoti(); // 모든 알림이 seen === true일 때만 실행
		}
	}, [notiInfo]);
	return (
		<NotiContext.Provider value={{ notiInfo, setNotiInfo, refetchNotiList }}>
			{children}
		</NotiContext.Provider>
	);
}

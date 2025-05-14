import { useEffect, useRef, useState } from "react";
import { getUsers, searchUsers } from "../../../apis/user";
import { useNavigate } from "react-router";
import Icon from "../../commons/Icon";
import UserListItem from "./UserListItem";
import { useClickAway } from "react-use";
import defaultProfileImage from "../../../assets/images/profileImg_circle.svg";

function normalizeUsers(raw: UserHomeData[]): UserHomeData[] {
	return raw.map((u) => {
		// fullName 파싱
		let parsed: Partial<User> = {};

		if (typeof u.fullName === "string") {
			try {
				parsed = JSON.parse(u.fullName);
			} catch {
				// 파싱 자체가 실패했을 때
				parsed = { name: u.fullName };
			}
		} else {
			parsed = u.fullName;
		}

		// 누락된 필드를 기본값으로 채우는 코드
		const fullNameObj: User = {
			name: parsed.name || "알 수 없음",
			tel: parsed.tel || "",
			gender: parsed.gender || "남자",
			age: typeof parsed.age === "number" && parsed.age > 0 ? parsed.age : 20,
			nickname:
				parsed.nickname || `크루${Math.floor(Math.random() * 900) + 100}`
		};

		// image fallback
		const profileImage = u.image?.trim() ? u.image : defaultProfileImage;

		return {
			...u,
			fullName: fullNameObj,
			image: profileImage
		};
	});
}

export default function UserListModal({ onClose }: { onClose: () => void }) {
	const [userList, setUserList] = useState<UserHomeData[]>([]);
	const [filteredUser, setFilteredUser] = useState<UserHomeData[]>([]);
	const [search, setSearch] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const navigate = useNavigate();
	const [isFocused, setIsFocused] = useState(false);

	// 바깥 클릭 감지
	const modalRef = useRef<HTMLDivElement>(null);
	useClickAway(modalRef, onClose);

	// 사용자 fetch
	useEffect(() => {
		(async () => {
			try {
				const all = await getUsers(); // raw array
				const parsed = normalizeUsers(all); // 파싱 + image fallback
				setUserList(parsed);
				setFilteredUser(parsed);
			} catch (e) {
				console.error("전체 유저 불러오기 실패", e);
			}
		})();
	}, []);

	// 사용자 검색 → API 호출
	useEffect(() => {
		if (!search.trim()) {
			setFilteredUser(userList);
			return;
		}

		let cancelled = false;
		(async () => {
			setIsSearching(true);
			try {
				const rawResults = await searchUsers(search);
				if (!cancelled) {
					const parsed = normalizeUsers(rawResults);
					setFilteredUser(parsed);
				}
			} catch (e) {
				console.error("검색 API 호출 실패", e);
			} finally {
				if (!cancelled) setIsSearching(false);
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [search, userList]);

	return (
		<div
			ref={modalRef}
			className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[400px] h-[580px] bg-white z-50 shadow-[0px_2px_8px_rgba(0,0,0,0.20)] px-[30px] py-[40px] rounded-[10px]"
		>
			<div className="flex justify-between items-center mb-[20px]">
				<h2 className="text-[20px] font-semibold">사용자 리스트</h2>
				<button onClick={onClose} className="text-2xl cursor-pointer">
					<Icon size="15px" position="-66px -102px" />
				</button>
			</div>

			<div className="relative mb-[15px]">
				<input
					value={search}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					onChange={(e) => setSearch(e.target.value)}
					type="text"
					placeholder="사용자를 검색해보세요"
					className="w-full border border-[#e4e4e4] rounded-[10px] px-[16px] py-[16px] pr-10 text-sm placeholder-[#616161] focus:outline-none focus:border-[#06b796]"
				/>
				<div className="absolute right-[16px] top-[15px] cursor-pointer">
					<Icon
						size="16px"
						position={isFocused ? "-148px -349px" : "-34px -128px"}
					/>
				</div>
			</div>

			{/* 결과 리스트 */}
			<div
				className="h-[382px] overflow-y-auto p-[5px]
                      border border-[#e4e4e4] rounded-[8px]"
			>
				{isSearching ? (
					<p className="text-center text-sm text-gray-500">검색 중…</p>
				) : (
					filteredUser.map((user) => (
						<UserListItem
							key={user._id}
							user={user}
							onClick={() => {
								navigate(`/profile/${user._id}`);
								onClose();
							}}
						/>
					))
				)}
			</div>
		</div>
	);
}

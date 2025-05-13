import { useCallback, useEffect, useRef, useState } from "react";
import { getUsers } from "../../../apis/user";
import { useNavigate } from "react-router";
import Icon from "../../commons/Icon";
import UserListItem from "./UserListItem";
import { useClickAway } from "react-use";

export default function UserListModal({ onClose }: { onClose: () => void }) {
	const [userList, setUserList] = useState<UserHomeData[]>([]);
	const [filteredUser, setFilteredUser] = useState<UserHomeData[]>([]);
	const [search, setSearch] = useState("");
	const navigate = useNavigate();
	const [isFocused, setIsFocused] = useState(false);

	// 1. 검색 필터 함수
	// const searchUsers = useCallback((word: string, list: UserHomeData[]) => {
	// 	if (!word.trim()) return list;
	// 	return list.filter((user) => {
	// 		let name = "";
	// 		const fullName = user.fullName;
	// 		if (typeof fullName === "object" && fullName !== null) {
	// 			name = fullName.name;
	// 		} else if (typeof fullName === "string") {
	// 			name = fullName;
	// 		}
	// 		return name.toLowerCase().includes(word.toLowerCase());
	// 	});
	// }, []);

	// // 2. 사용자 목록 불러오기
	// useEffect(() => {
	// 	const fetchUsers = async () => {
	// 		try {
	// 			const rawUsers = await getUsers();
	// 			const parsed = rawUsers.map((user: UserHomeData) => {
	// 				if (typeof user.fullName === "string") {
	// 					try {
	// 						return { ...user, fullName: JSON.parse(user.fullName) };
	// 					} catch {
	// 						return {
	// 							...user,
	// 							fullName: {
	// 								name: user.fullName,
	// 								tel: "",
	// 								gender: "남자",
	// 								age: 0,
	// 								nickname: ""
	// 							}
	// 						};
	// 					}
	// 				}
	// 				return user;
	// 			});
	// 			setUserList(parsed);
	// 			setFilteredUser(parsed);
	// 		} catch (err) {
	// 			console.error("유저 불러오기 실패", err);
	// 		}
	// 	};
	// 	fetchUsers();
	// }, []);

	// // 3. 검색어가 바뀔 때 필터링
	// useEffect(() => {
	// 	if (userList.length === 0) return;
	// 	const result = searchUsers(search, userList);
	// 	setFilteredUser(result);
	// }, [search, searchUsers, userList]);

	// 바깥 클릭 감지
	const modalRef = useRef<HTMLDivElement>(null);
	useClickAway(modalRef, onClose);

	// 사용자 fetch
	useEffect(() => {
		(async () => {
			try {
				const raw = await getUsers();
				const parsed = raw.map((u: UserHomeData) => {
					if (typeof u.fullName === "string") {
						try {
							return { ...u, fullName: JSON.parse(u.fullName) };
						} catch {
							/* fallback */
						}
					}
					return u;
				});
				setUserList(parsed);
				setFilteredUser(parsed);
			} catch {
				console.error("유저 불러오기 실패");
			}
		})();
	}, []);

	// 검색 필터
	const searchUsers = useCallback((word: string, list: UserHomeData[]) => {
		if (!word.trim()) return list;
		return list.filter((u) => {
			const fn = typeof u.fullName === "object" ? u.fullName.name : u.fullName;
			return fn.toLowerCase().includes(word.toLowerCase());
		});
	}, []);
	useEffect(() => {
		setFilteredUser(searchUsers(search, userList));
	}, [search, searchUsers, userList]);

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

			<div className="h-[382px] overflow-y-auto p-[5px] border-1 border-[#e4e4e4] rounded-[8px]">
				{filteredUser.map((user) => (
					<UserListItem
						key={user._id}
						user={user}
						onClick={() => navigate(`/profile/${user._id}`)}
					/>
				))}
			</div>
		</div>
	);
}

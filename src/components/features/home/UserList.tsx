import { useCallback, useEffect, useState } from "react";
import { getUsers } from "../../../apis/user";

export default function UserList({ userSearch }: { userSearch: string }) {
	const [userList, setUserList] = useState<UserHomeData[]>([]);
	const [filteredUser, setFilteredUser] = useState<UserHomeData[]>([]);
	const SearchFunc = useCallback((word: string, list: UserHomeData[]) => {
		let userName = "";
		if (!word.trim()) return list;
		return list.filter((user) => {
			const temp = user.fullName;
			if (typeof temp === "object" && temp != null) {
				userName = temp.name;
			} else if (typeof temp === "string") {
				userName = temp;
			}
			return userName.toLowerCase().includes(word.toLowerCase());
		});
	}, []);
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const userUpdate = await getUsers();
				const parsedUser = userUpdate.map((user: UserHomeData) => {
					let parsedFullName: User;
					if (typeof user.fullName === "string") {
						try {
							parsedFullName = JSON.parse(user.fullName);
						} catch (e) {
							console.log("풀네임 파싱 실패", e);
							parsedFullName = {
								name: user.fullName,
								tel: "",
								gender: "남성",
								age: 0,
								nickname: ""
							};
							console.log("파싱완료");
						}
					} else {
						parsedFullName = user.fullName;
					}
					return { ...user, fullName: parsedFullName };
				});
				// console.log(parsedUser);
				setUserList(parsedUser);
				setFilteredUser(parsedUser);
			} catch (err) {
				console.error("사용자 목록 불러오기 오류:", err);
			}
		};
		fetchUsers();
	}, []);
	useEffect(() => {
		if (userList.length === 0) return;
		const searched = SearchFunc(userSearch, userList);
		setFilteredUser(searched);
	}, [SearchFunc, userList, userSearch]);
	return (
		<>
			<div className="w-[268px] h-[1166px] overflow-y-auto overflow-x-hidden">
				{filteredUser.map((user) => (
					<div
						key={user._id}
						className=" w-[268px] h-[100px] flex items-center"
					>
						<div className="w-[149px] h-[50px] my-[25px] flex flex-row">
							<img
								src={user.image}
								alt="사용자이미지"
								className="w-[50px] h-[50px] rounded-full"
							/>
							<div className="flex flex-col w-[87px] h-[44px] ml-[12px]">
								<div className="text-[16px] w-[87px] h-[19px]">
									{(user.fullName as User).name}
								</div>
								<div className="text-[14px] w-full h-[17px] mt-[8px]">
									{(user.fullName as User).gender}{" "}
									{Math.floor((user.fullName as User).age / 10) * 10}대
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

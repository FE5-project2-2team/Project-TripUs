import { useEffect, useState } from "react";
import { getUsers } from "../../../apis/user";

export default function UserList() {
	const [userList, setUserList] = useState<User[]>([]);
	interface Like {
		id: string;
		user: string;
		post: string;
		createdAt: string;
		updatedAt: string;
		__v: number;
	}
	interface Comment {
		_id: string;
		comment: string;
		author: User;
		post: string;
		createdAt: string;
		updatedAt: string;
		__v: number;
	}
	interface Channel {
		_id: string;
		name: string;
		description: string;
		authRequired: boolean;
		posts: string[];
		createdAt: string;
		updatedAt: string;
		__v: number;
	}
	interface User {
		role: string;
		emailVerified: boolean;
		banned: boolean;
		isOnline: boolean;
		posts: Post[];
		likes: Like[];
		comments: string[];
		followers: string[]; //
		following: string[]; //
		notifications: Notification[];
		messages: [];
		_id: string;
		fullName: string | FullName;
		email: string;
		createdAt: string;
		updatedAt: string;
		__v: number;
		username: string | null;
		image: string;
		imagePublicId: string;
	}
	interface FullName {
		name: string;
		tel: string;
		gender: "여자" | "남자";
		age: number;
		nickname: string;
	}
	interface PostData {
		title: string;
		memberLimit: number;
		memberList: string[];
		location: string;
		dateRange: Date[];
		isRecruiting: boolean;
		recruitCondition: string[];
		contents: string;
	}
	interface Post {
		likes: Like[];
		comments: Comment[];
		_id: string;
		image: string; //optional
		imagePublicId: string;
		title: PostData;
		channel: Channel;
		author: User;
		createdAt: string;
		updatedAt: string;
		__v: number;
	}
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const userUpdate = await getUsers();
				const parsedUser = userUpdate.map((user: User) => {
					let parsedFullName: FullName;
					if (typeof user.fullName === "string") {
						try {
							parsedFullName = JSON.parse(user.fullName);
						} catch (e) {
							console.log("풀네임 파싱 실패", e);
							parsedFullName = {
								name: user.fullName,
								tel: "",
								gender: "남자",
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
				console.log(parsedUser);
				setUserList(parsedUser);
			} catch (err) {
				console.error("사용자 목록 불러오기 오류:", err);
			}
		};
		fetchUsers();
	}, []);
	return (
		<>
			<div className="w-[268px] h-[1166px] overflow-y-auto overflow-x-hidden">
				{userList.map((user) => (
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
									{(user.fullName as FullName).name}
								</div>
								<div className="text-[14px] w-full h-[17px] mt-[8px]">
									{(user.fullName as FullName).gender}{" "}
									{Math.floor((user.fullName as FullName).age / 10) * 10}대
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

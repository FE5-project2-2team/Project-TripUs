import { useCallback, useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import { getChannelInfo } from "../apis/channel";
import { getPosts } from "../apis/post";

//채널 정보 가져오기
//채널별 게시글 보여주기
type ContextType = {
	sort: string;
	selectFilter: string[];
};
export default function Channel() {
	const { sort, selectFilter } = useOutletContext<ContextType>();
	const { channelName } = useParams();
	const decodedChannelName = decodeURIComponent(channelName || "");
	const [posts, setPosts] = useState<Post[]>([]);
	const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
	const SortPosts = useCallback((sort: string, targetPosts: Post[]) => {
		if (sort === "최신순") {
			return [...targetPosts].sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			);
		} else {
			return [...targetPosts].sort((a, b) => b.likes.length - a.likes.length);
		}
	}, []);
	const FilterPosts = useCallback(
		(filterArr: string[]) => {
			if (!filterArr?.length) return posts;
			return posts.filter((post) => {
				const condition = post.title.recruitCondition;
				if (!condition) return false;
				return filterArr.every(
					(filt) =>
						condition.gender === filt ||
						(condition.ageRange && condition.ageRange.includes(filt))
				);
			});
		},
		[posts]
	);
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
		coverImage: string;
		image: string;
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
		fullName: string;
		email: string;
		createdAt: string;
		updatedAt: string;
		__v: number;
		username: string | null;
	}
	// interface FullName {
	//   name: string;
	//   tel: string;
	//   gender: "여자" | "남자";
	//   age: number;
	//   nickname: string;
	// }
	interface RecruitCondition {
		gender: string;
		ageRange: string[];
	}
	interface PostData {
		title: string;
		memberLimit: number;
		memberList: string[];
		location: string;
		dateRange: Date[];
		isRecruiting: boolean;
		recruitCondition: RecruitCondition;
		description: string;
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
		if (channelName) {
			const fetchPostInfo = async () => {
				try {
					const channelData = await getChannelInfo(decodedChannelName); //url에 나와있는 채널이름가지고 데이터 불러오기(URL속 채널이름 바뀔때마다)
					// console.log(data);
					const channelId = channelData._id;
					// console.log(channelId);
					const postData = await getPosts(channelId);
					const parsedPosts = postData.map((post: Post) => {
						let parsedTitle = post.title;
						if (typeof post.title === "string") {
							try {
								parsedTitle = JSON.parse(post.title);
							} catch (e) {
								console.log("title 파싱 실패:", e, parsedTitle);
							}
						}
						return {
							...post,
							title: parsedTitle
						};
					});

					setPosts(parsedPosts);
				} catch (err) {
					console.error("게시글 불러오기 오류:", err);
				}
			};

			fetchPostInfo();
		}
	}, [channelName, decodedChannelName]);
	//
	useEffect(() => {
		if (posts.length === 0) return;
		console.log("selectFilter:", selectFilter);
		const filtered = FilterPosts(selectFilter);
		console.log("Filtered posts:", filtered);
		const sorted = SortPosts(sort, filtered);
		console.log("Sorted posts:", sorted);

		setFilteredPosts(sorted);
	}, [posts, selectFilter, sort, FilterPosts, SortPosts]);

	return (
		<div className="w-full max-w-[1000px] grid grid-cols-3 mx-auto gap-[50px] mt-[20px] relative">
			{filteredPosts.map((post) => (
				//포스트 카드
				<div
					key={post._id}
					className="w-[328px] min-h-[450px] rounded-[15px] border border-[#D9D9D9] flex flex-col overflow-hidden"
				>
					<div className="relative">
						<img
							src={post.image}
							className="w-full h-[200px] rounded-t-[15px] object-cover z-10"
						/>
						{channelName === "crews" ? (
							post.title.isRecruiting === true ? (
								<div className="absolute flex items-center justify-center top-[8px] right-[8px] w-[56px] h-[26px] rounded-[8px] bg-[#FD346E] text-[#fff] z-20">
									모집중
								</div>
							) : (
								<div className="absolute flex items-center justify-center top-[8px] right-[8px] w-[56px] h-[26px] rounded-[8px] bg-[#1C274C] text-[#fff] z-20">
									모집완료
								</div>
							)
						) : (
							channelName === "review" && (
								<div className="absolute flex items-center justify-center top-[8px] right-[8px] w-[56px] h-[26px] rounded-[8px] bg-[#06B796] text-[#fff] z-20">
									후기
								</div>
							)
						)}
					</div>
					<div className="flex flex-col justify-between flex-grow p-[16px]">
						<div className="space-y-4">
							{/* 사용자 이미지,이름,닉네임 */}
							<div className="flex flex-row items-center w-[115px] h-[36px]">
								<img
									src={post.author.image}
									alt="사용자이미지"
									className="w-[36px] h-[36px] rounded-full"
								/>
								<div className="text-[16px] ml-[8px]">
									<p className="font-bold">
										{JSON.parse(post.author.fullName).nickname}
									</p>
									<p>{JSON.parse(post.author.fullName).name}</p>
								</div>
							</div>
							{/* 게시글 제목, 내용 */}
							<div className="w-[270px] h-[64px] flex flex-col">
								<p className="text-[16px] font-bold">
									게시글 제목: {post.title.title}
								</p>
								<p className="mt-[7px] text-[14px] overflow-hidden text-ellipsis whitespace-nowrap">
									{post.title.description}
								</p>
							</div>
							{/* 여행지, 크루원수,날짜*/}
							<div className="w-[142px] h-[70px] text-[14px]">
								<p>여행지:{post.title.location}</p>
								<p>
									크루원수: {post.title.memberList.length} /{" "}
									{post.title.memberLimit}
								</p>
								<p>
									{`${new Date(post.title.dateRange[0])
										.getFullYear()
										.toString()
										.slice(2)}.${(
										new Date(post.title.dateRange[0]).getMonth() + 1
									)
										.toString()
										.padStart(2, "0")}.${new Date(post.title.dateRange[0])
										.getDate()
										.toString()
										.padStart(2, "0")}`}{" "}
									~
									{`${new Date(post.title.dateRange[1])
										.getFullYear()
										.toString()
										.slice(2)}.${(
										new Date(post.title.dateRange[1]).getMonth() + 1
									)
										.toString()
										.padStart(2, "0")}.${new Date(post.title.dateRange[1])
										.getDate()
										.toString()
										.padStart(2, "0")}`}
								</p>
							</div>
						</div>
						{/* 나이,성별 */}
						<p className="text-[14px] mt-4">
							#{post.title.recruitCondition.gender}
							{post.title.recruitCondition.ageRange.map((age) => (
								<span key={age}>#{age}</span>
							))}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

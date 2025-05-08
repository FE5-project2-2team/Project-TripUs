import { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { getChannelInfo } from "../apis/channel";
import { getPosts } from "../apis/post";
import Icon from "../components/commons/Icon";

//채널 정보 가져오기
//채널별 게시글 보여주기
type ContextType = {
	sort: string;
	selectFilter: string[];
	isChecked: boolean;
	search: string;
};
export default function Channel() {
	const { sort, selectFilter, isChecked, search } =
		useOutletContext<ContextType>();
	const { channelName } = useParams();
	const decodedChannelName = decodeURIComponent(channelName || "");
	const [posts, setPosts] = useState<PostHomeData[]>([]);
	const [filteredPosts, setFilteredPosts] = useState<PostHomeData[]>(posts);
	const navigate = useNavigate();

	const SortPosts = useCallback((sort: string, targetPosts: PostHomeData[]) => {
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
			let filtered = posts;

			if (filterArr?.length) {
				filtered = filtered.filter((post) => {
					const condition = (post.title as PostTitleData).recruitCondition;
					if (!condition) return false;
					return filterArr.every(
						(filt) =>
							condition.gender === filt ||
							(condition.ageRange && condition.ageRange.includes(filt))
					);
				});
			}

			if (isChecked) {
				filtered = filtered.filter(
					(post) => (post.title as PostTitleData).isRecruiting
				);
			}
			return filtered;
		},
		[posts, isChecked]
	);

	const SearchPosts = useCallback((word: string, posts: PostHomeData[]) => {
		if (!word.trim()) return posts; //검색어 없는경우
		return posts.filter((post) => {
			const title = post.title.title;
			const content = post.title.description;
			const auth = post.author.fullName;
			let author = "";
			if (typeof auth === "object" && auth !== null) {
				author = auth.name;
			} else if (typeof auth === "string") {
				author = auth;
			}
			const location = post.title.location;
			return (
				title.toLowerCase().includes(word.toLowerCase()) ||
				content.toLowerCase().includes(word.toLowerCase()) ||
				author.toLowerCase().includes(word.toLowerCase()) ||
				location.toLowerCase().includes(word.toLowerCase())
			);
		});
	}, []);

	useEffect(() => {
		if (channelName) {
			const fetchPostInfo = async () => {
				try {
					const channelData = await getChannelInfo(decodedChannelName); //url에 나와있는 채널이름가지고 데이터 불러오기(URL속 채널이름 바뀔때마다)
					console.log(channelData);
					const channelId = channelData._id;
					//console.log(channelId);
					const postData = await getPosts(channelId);
					const parsedPosts = postData.map((post: PostData) => {
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
		const filtered = FilterPosts(selectFilter);
		const searched = SearchPosts(search, filtered);
		const sorted = SortPosts(sort, searched);
		setFilteredPosts(sorted);
	}, [posts, selectFilter, sort, search, FilterPosts, SortPosts, SearchPosts]);

	return (
		<div className="w-full grid grid-cols-3 gap-[20px] mt-[20px] relative">
			{filteredPosts.map((post) => (
				//포스트 카드

				<div
					key={post._id}
					className="w-[328px] min-h-[450px] rounded-[15px] border border-[#D9D9D9] flex flex-col overflow-hidden cursor-pointer"
					onClick={() => navigate(`/post/detail/${post._id}`)}
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
										{JSON.parse(post.author.fullName as string).nickname}
									</p>
									<p>{JSON.parse(post.author.fullName as string).name}</p>
								</div>
							</div>
							{/* 게시글 제목, 내용 */}
							<div className="w-[296px] h-[65px] flex flex-col">
								<p className="text-[16px] font-bold">
									게시글 제목: {post.title.title}
								</p>
								<p className="mt-[7px] min-h-[38px] text-[14px] overflow-hidden text-ellipsis whitespace-nowrap">
									{post.title.description}
								</p>
							</div>
							{/* 여행지, 크루원수,날짜*/}
							<div className="w-[142px] h-[70px] text-[14px]">
								<p className="flex gap-1">
									<Icon position="5.447% 19.352%" size="18px" />
									{post.title.location}
								</p>
								<p className="flex gap-[4px]">
									<Icon position="15.52% 19.671%" size="18px" />
									{post.title.memberList.length} / {post.title.memberLimit}
								</p>
								<p className="flex gap-1">
									<Icon position="25.835% 20.058%" size="18px" />
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
						<p className="text-[14px] flex mt-4 gap-4">
							#{post.title.recruitCondition.gender}
							{post.title.recruitCondition.ageRange.map((age) => (
								<span key={age} className="min-w-[35px] h-[19px]">
									#{age}
								</span>
							))}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

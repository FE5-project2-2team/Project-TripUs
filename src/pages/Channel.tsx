import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { getChannelInfo } from "../apis/channel";
import { getPosts } from "../apis/post";
import Icon from "../components/commons/Icon";
import defaultImage from "../assets/images/primaryImage.png";
import profileImg from "../assets/images/profileImg_circle.svg";
import { useThemeStore } from "../store/themeStore";
import { getDiffInDays } from "../utils/date";
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
	const [posts, setPosts] = useState<PostHomeData[]>([]); //19번 라인 삭제
	const [filteredPosts, setFilteredPosts] = useState<PostHomeData[]>(posts);
	const navigate = useNavigate();
	const SortPosts = useCallback((sort: string, targetPosts: PostHomeData[]) => {
		if (sort === "최신순") {
			return [...targetPosts].sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			);
		} else if (sort === "인기순") {
			return [...targetPosts].sort((a, b) => b.likes.length - a.likes.length);
		} else {
			return [...targetPosts].sort(
				(a, b) =>
					new Date(a.title.dateRange[0]).getTime() -
					new Date(b.title.dateRange[0]).getTime()
			);
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
					(post) =>
						(post.title as PostTitleData).isRecruiting &&
						post.channel.name !== "review"
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
					let postData: PostHomeData[] = [];
					if (channelName === "전체글") {
						const [channel1, channel2] = await Promise.all([
							getChannelInfo("crews"),
							getChannelInfo("review")
						]);

						const postData1 = await getPosts(channel1._id);
						const postData2 = await getPosts(channel2._id);
						postData = [...postData1, ...postData2];
					} else if (channelName === "긴급 모집") {
						const channelCrews = await getChannelInfo("crews");
						postData = await getPosts(channelCrews._id);
					} else {
						const channelData = await getChannelInfo(channelName); //url에 나와있는 채널이름가지고 데이터 불러오기(URL속 채널이름 바뀔때마다)
						const channelId = channelData._id;
						postData = await getPosts(channelId);
					}
					let parsedPosts = postData.map((post: PostHomeData) => {
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

					if (channelName === "긴급 모집") {
						parsedPosts = parsedPosts.filter((post) => {
							const startDate = new Date(post.title.dateRange[0]).getTime();
							const now = new Date().getTime();
							const diff = (startDate - now) / (1000 * 60 * 60);
							return diff <= 72 && diff >= 0;
						});
					}

					setPosts(parsedPosts);
				} catch (err) {
					console.error("게시글 불러오기 오류:", err);
				}
			};

			fetchPostInfo();
		}
	}, [channelName]);
	//
	const filtered = useMemo(
		() => FilterPosts(selectFilter),
		[selectFilter, FilterPosts]
	);
	const searched = useMemo(
		() => SearchPosts(search, filtered),
		[search, filtered, SearchPosts]
	);
	const sorted = useMemo(
		() => SortPosts(sort, searched),
		[sort, searched, SortPosts]
	);
	useEffect(() => {
		setFilteredPosts(sorted);
	}, [sorted]);
	const formatDate = (date: Date) => {
		const parsedDate = new Date(date);
		return `${parsedDate.getFullYear().toString().slice(2)}.${(parsedDate.getMonth() + 1).toString().padStart(2, "0")}.${parsedDate.getDate().toString().padStart(2, "0")}`;
	};
	// darkmode
	const isDark = useThemeStore((state) => state.isDark);
	const locationIconPosition = isDark ? "56.034% 20.708%" : "6.466% 20.708%";
	const memberIconPosition = isDark ? "66.079% 20.765%" : "15.419% 20.765%";
	const calendarIconPosition = isDark ? "75.983% 20.604%" : "25.764% 20.604%";
	const likesIconPosition = isDark ? "83.5% 96.15%" : "74.3% 96.15%";

	return (
		<div className="w-full grid sm:grid-cols-3 grid-cols-2 sm:gap-[40px] gap-[18px] sm:mt-[20px] mt-[26px] items-center relative">
			{filteredPosts.map((post: PostHomeData) => (
				//포스트 카드

				<div
					key={post._id}
					className="group sm:w-[340px] w-[200px] sm:h-[434px] h-[263px] sm:rounded-[15px] rounded-[8px] flex flex-col overflow-hidden cursor-pointer sm:shadow-[0px_2px_4px_rgba(0,0,0,0.16) shadow-[0px_1px_4px_rgba(0,0,0,0.16)]] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.3)] transition duration-300 dark:bg-transparent dark:border dark:border-[#616161] dark:hover:shadow-[0px_4px_10px_rgba(100,100,100,0.3)]"
					onClick={() => navigate(`/post/detail/${post._id}`)}
				>
					<div className="relative">
						<img
							src={post.title.images[0] ? post.title.images[0] : defaultImage}
							alt="Post Thumbnail"
							className="w-full h-[180px] rounded-t-[15px] object-cover z-10 transition-transform duration-300 ease-in-out group-hover:scale-105"
						/>
						{(() => {
							if (channelName === "crews" || channelName === "전체글") {
								return post.channel.name === "crews" ? (
									getDiffInDays(new Date(), post.title.dateRange[0]) < 0 ? (
										<div className="absolute flex items-center justify-center top-[8px] right-[8px] w-[60px] h-[26px] rounded-[8px] bg-[#808080] text-[#fff] text-[14px] z-20">
											여정완료
										</div>
									) : post.title.isRecruiting === true ? (
										<div className="absolute flex items-center justify-center top-[8px] right-[8px] w-[60px] h-[26px] rounded-[8px] bg-[#FD346E] text-[#fff] text-[14px] z-20">
											모집중
										</div>
									) : (
										<div className="absolute flex items-center justify-center top-[8px] right-[8px] w-[60px] h-[26px] rounded-[8px] bg-[#1C274C] text-[#fff] text-[14px] z-20">
											모집완료
										</div>
									)
								) : (
									<div className="absolute flex items-center justify-center top-[8px] right-[8px] w-[60px] h-[26px] rounded-[8px] bg-[#06B796] text-[#fff] text-[14px] z-20">
										후기
									</div>
								);
							}

							if (channelName === "review") {
								return (
									<div className="absolute flex items-center justify-center top-[8px] right-[8px] w-[60px] h-[26px] rounded-[8px] bg-[#06B796] text-[#fff] text-[14px] z-20">
										후기
									</div>
								);
							}

							if (channelName === "긴급 모집") {
								return (
									<div className="absolute flex items-center justify-center top-[8px] right-[8px] w-[60px] h-[26px] rounded-[8px] bg-[#FF2929] text-[#fff] text-[14px] z-20">
										긴급
									</div>
								);
							}

							return null;
						})()}
					</div>
					<div className="p-4">
						<div>
							{/* 사용자 이미지,이름,닉네임 */}
							<div className="flex flex-row items-center min-w-[115px] h-[36px]">
								<img
									src={post.author.image ? post.author.image : profileImg}
									alt="사용자이미지"
									className="w-[36px] h-[36px] rounded-full"
								/>
								<div className="ml-[8px]">
									<p className="font-normal text-[16px]">
										{JSON.parse(post.author.fullName as string).nickname}
									</p>
									<p className="text-[14px]">
										{JSON.parse(post.author.fullName as string).name}
									</p>
								</div>
							</div>
							{/* 게시글 제목, 내용 */}
							<div className="w-[308px] h-[65px] mt-[16px]">
								<p className="text-[16px] font-bold line-clamp-2">
									{post.title.title}
								</p>
								<p className="mt-[8px] min-h-[38px] text-[14px] line-clamp-2">
									{post.title.description}
								</p>
							</div>
							{/* 여행지, 크루원수,날짜*/}
							<div
								className={`text-[14px] h-[70px] mt-4 flex flex-col ${post.channel.name === "review" ? "justify-center" : null}`}
							>
								{/* 비행기 */}
								{post.title.location && (
									<div className="flex items-center gap-1.5">
										<Icon position={locationIconPosition} size="18px" />
										<h3 className="text-[14px]">{post.title.location}</h3>
									</div>
								)}
								{/* 인원 */}
								{post.channel.name !== "review" && (
									<div className="flex items-center gap-1.5">
										<Icon position={memberIconPosition} size="18px" />
										<h3 className="text-[14px]">
											{(() => {
												const applyComments = post.comments.filter((com) => {
													return JSON.parse(com.comment).type === "apply";
												});

												const memberCount = post.title.memberList.filter(
													(mem) =>
														applyComments.some(
															(comment) => comment.author._id === mem
														)
												).length;

												return `${memberCount + 1} / ${post.title.memberLimit}`;
											})()}
										</h3>
									</div>
								)}
								{/* 달력 */}
								<div className="flex items-center gap-1.5">
									<Icon position={calendarIconPosition} size="18px" />
									<h3 className="text-[14px]">
										{`${formatDate(post.title.dateRange[0])}`}
										{post.title.dateRange[1] &&
											` - 
									${formatDate(post.title.dateRange[1])}`}
									</h3>
								</div>
							</div>
						</div>

						<div className="flex justify-between text-[14px] mt-[2px]">
							{/* 나이,성별 */}
							<div className="flex gap-4">
								{post.title.recruitCondition.gender &&
									`#${post.title.recruitCondition.gender}`}
								{post.title.recruitCondition.ageRange &&
									post.title.recruitCondition.ageRange.map((age) => (
										<span key={age} className="min-w-[35px] h-[19px]">
											#{age}
										</span>
									))}
							</div>
							{/* 좋아요 */}
							<div className="flex items-center gap-[5px]">
								<h3 className="text-[#808080] dark:text-[#cdcdcd]">
									{post.likes.length}
								</h3>
								<Icon position={likesIconPosition} size="18px" />
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

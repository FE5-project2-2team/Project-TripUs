import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPostsByAuthor } from "../../../apis/post";
import postThumbnail from "../../../assets/images/primaryImage2.png";
import { formatDateRange } from "../../../utils/date";
import { Link } from "react-router";

const ReviewTab = ({
	authorId,
	isMyPage
}: {
	authorId: string;
	isMyPage: boolean;
}) => {
	const [posts, setPosts] = useState<ProfilePost[]>([]);
	const reviewPosts = posts.filter((post) => post.channel.name === "review");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getPostsByAuthor(authorId);
				// console.log('서버 응답 결과:', result);
				setPosts(result);
			} catch (error) {
				console.error("포스트 불러오기 실패:", error);
			}
		};
		fetchData();
	}, [authorId]);

	return (
		<div>
			<div className="flex my-[30px] text-[18px] font-medium gap-x-[8px]">
				<h1>후기 게시글</h1>
				<p className="text-[#06B796]">{reviewPosts.length}</p>
			</div>
			<div className="grid grid-cols-3 gap-x-[40px] gap-y-[30px]">
				{isMyPage && (
					<Link to={"/postCreate"}>
						<div
							className="flex flex-col items-center justify-center w-[328px] h-[398px] border border-[#06B796] rounded-[15px]"
							style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.16)" }}
						>
							<button>
								<div className="w-[80px] h-[80px] rounded-full flex items-center justify-center cursor-pointer bg-[#06b796] hover:bg-[#038383]">
									<div
										className="w-[35px] h-[35px] bg-no-repeat"
										style={{
											backgroundImage:
												"url('/src/assets/images/spriteImages.png')",
											backgroundSize: "245px 380px",
											backgroundPosition: "-24.3px -171.3px"
										}}
										aria-label="Add Post Button"
									/>
								</div>
							</button>
							<p className="font-bold text-[16px] text-[#06B796] mt-[34px]">
								새 후기를 남겨주세요.
							</p>
						</div>
					</Link>
				)}
				{posts
					.filter((post) => post.channel.name === "review")
					.map((post) => {
						const parsedTitle = JSON.parse(post.title);
						return (
							<div
								key={post._id}
								className="relative z-10 w-[328px] h-[398px] rounded-[10px] bg-white cursor-pointer"
								style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.16)" }}
								onClick={() => navigate(`/post/detail/${post._id}`)}
							>
								{/* 상단 영역 */}
								<div className="relative block">
									<p className="absolute top-0 right-0 flex items-center justify-center w-[56px] h-[26px] px-[8px] py-[3px] m-[8px] rounded-[8px] text-white text-[14px] bg-[#06B796]">
										후기
									</p>
									<img
										src={post.image ? post.image : postThumbnail}
										alt="Post Thumbnail"
										className="rounded-t-[10px] h-[180px] w-full object-cover]"
									/>
								</div>
								{/* 하단 영역 */}
								<div className="p-[16px]">
									{/* 하단 영역 -1 */}
									<div className="flex flex-col gap-y-[8px]">
										<h1 className="font-bold text-[16px]">
											{parsedTitle.title}
										</h1>
										<h2 className="text-[14px]">{parsedTitle.description}</h2>
									</div>

									{/* 하단 영역 -2 */}
									<div className="flex flex-col my-[16px]">
										{/* 비행기 */}
										<div className="flex items-center">
											<div
												className="w-[18px] h-[18px] mr-[4px] bg-no-repeat"
												style={{
													backgroundImage:
														"url('/src/assets/images/spriteImages.png')",
													backgroundSize: "245px 380px",
													backgroundPosition: "-12px -74px"
												}}
												aria-label="Plane"
											/>
											<h3 className="text-[14px]">{parsedTitle.location}</h3>
										</div>

										{/* 인원 */}
										<div className="flex items-center">
											<div
												className="w-[18px] h-[18px] mr-[4px] bg-no-repeat"
												style={{
													backgroundImage:
														"url('/src/assets/images/spriteImages.png')",
													backgroundSize: "245px 380px",
													backgroundPosition: "-35px -74px"
												}}
												aria-label="People"
											/>
											<h3 className="text-[14px]">
												{parsedTitle.memberList.length}/
												{parsedTitle.memberLimit}
											</h3>
										</div>

										{/* 달력 */}
										<div className="flex items-center">
											<div
												className="w-[18px] h-[18px] mr-[4px] bg-no-repeat"
												style={{
													backgroundImage:
														"url('/src/assets/images/spriteImages.png')",
													backgroundSize: "245px 380px",
													backgroundPosition: "-58px -74px"
												}}
												aria-label="Calander"
											/>
											<h3 className="text-[14px]">
												{formatDateRange(parsedTitle.dateRange)}
											</h3>
										</div>
									</div>

									{/* 하단영역 -3 */}
									<div className="flex gap-[16px]">
										<p className="text-[14px]">
											#{parsedTitle.recruitCondition.ageRange}
										</p>
										<p className="text-[14px]">
											#{parsedTitle.recruitCondition.gender}
										</p>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default ReviewTab;

import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPostById } from "../apis/post";
import profileCircle from "../assets/images/profileImg_circle.svg";

export default function PostDetail() {
	const { id } = useParams();
	const [postData, setPostData] = useState<Post | null>(null);
	let postInfo: PostData | null = null;
	let authorInfo: User | null = null;

	const getData = useCallback(async () => {
		const postData = await getPostById(id!);
		setPostData(postData);
	}, [id]);

	const formatData = (date: Date) => {
		const month = date.getMonth().toString();
		const day = date.getDate().toString();
		return `${date.getFullYear()}-${month.length === 1 ? `0${month}` : month}-${
			day.length === 1 ? `0${day}` : day
		}`;
	};

	useEffect(() => {
		if (!id) return;
		getData();
	}, [id, getData]);

	if (postData) {
		authorInfo = JSON.parse(postData.author.fullName);
		postInfo = JSON.parse(postData.title);

		return (
			<main className="flex flex-col justify-center items-center mt-[49px]">
				<div className="mb-9">
					<h2 className="flex justify-center items-center mb-[14px]">
						<span className="mr-4 text-xl text-[#06B796] px-3 bg-[#F3F4F6] py-[5.5px] rounded-lg">
							{postInfo?.isRecruiting ? "모집중" : "모집완료"}
						</span>
						<span className="text-[28px] font-medium">{postInfo?.title}</span>
					</h2>
					<img src={postData.image ?? undefined} alt="" />
				</div>
				<div className="flex flex-col gap-[30px] w-266 ">
					<div>
						<span className="post-sub-title">여행 소개</span>
						<span>{postInfo?.contents}</span>
					</div>
					<div>
						<span className="post-sub-title">여행 일정</span>
						<div className="py-5 px-4 bg-[#F9F9F9] rounded-[15px] text-[#616161]">
							<span className="block">
								{postInfo?.dateRange
									.map((date) => formatData(new Date(date)))
									.join(" - ")}
							</span>
							<span>{postInfo?.location}</span>
						</div>
					</div>
					<div>
						<span className="post-sub-title">캡틴</span>
						<div className="flex gap-[10px]">
							<img
								className="w-[50px] h-[50px] rounded-full"
								src={postData.author.image || profileCircle}
								alt="프로필 이미지"
							/>
							<div>
								<span className="block font-medium">
									{authorInfo?.nickname}
								</span>
								<div className="flex gap-2 text-[#616161]">
									<span>{Math.floor(authorInfo!.age / 10) * 10}대</span>
									<span>{authorInfo?.gender}</span>
								</div>
							</div>
						</div>
					</div>
					<div>
						<span className="post-sub-title">참여 멤버</span>
					</div>
					<div>
						<span className="post-sub-title">동행 조건 사항</span>
						<div>
							<span className="text-[#616161] mr-[10px]">성별</span>
							<span>{postInfo?.recruitCondition.gender}</span>
						</div>
						<div>
							<span className="text-[#616161] mr-[10px]">나이</span>
							{postInfo?.recruitCondition.ageRange.join(", ")}
						</div>
					</div>
					<div>
						<span className="post-sub-title">댓글</span>
					</div>
				</div>
			</main>
		);
	} else {
		return <div></div>;
	}
}

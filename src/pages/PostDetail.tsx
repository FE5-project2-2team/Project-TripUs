import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPostById } from "../apis/post";
import Button from "../components/commons/Button";
import CommentsList from "../components/features/postDetail/CommentsList";
import Likes from "../components/features/postDetail/Likes";
import PostTitle from "../components/features/postDetail/PostTitle";
import TravelInfo from "../components/features/postDetail/TravelInfo";
import UserInfo from "../components/features/user/UserInfo";
import { useAuthStore } from "../store/authStore";

export default function PostDetail() {
	const { id } = useParams();
	const userId = useAuthStore((state) => state.userId);
	const [postData, setPostData] = useState<PostData | null>(null);

	const getData = useCallback(async () => {
		const postData: PostData = await getPostById(id!);
		setPostData(postData);
	}, [id]);

	useEffect(() => {
		if (!id) return;
		getData();
	}, [id, getData]);

	if (postData) {
		const authorInfo: Profile = JSON.parse(postData.author.fullName);
		const postInfo: PostDetail = JSON.parse(postData.title);
		const isAuthor = userId === postData.author._id;
		return (
			<main className="flex flex-col justify-center items-center mt-[49px]">
				<PostTitle isRecruiting={postInfo.isRecruiting} title={postInfo.title}>
					<img src={postData.image ?? undefined} alt="" />
				</PostTitle>
				<div className="flex flex-col gap-[30px] w-266 ">
					<TravelInfo
						contents={postInfo.contents}
						dateRange={postInfo.dateRange}
						location={postInfo.location}
					/>
					<UserInfo authorInfo={authorInfo} userId={postData.author._id} />
					<div>
						<span className="post-sub-title">참여 멤버</span>
					</div>
					<div>
						<span className="post-sub-title">동행 조건 사항</span>
						<div>
							<span className="text-[#616161] mr-[10px]">성별</span>
							<span>{postInfo.recruitCondition.gender}</span>
						</div>
						<div>
							<span className="text-[#616161] mr-[10px]">나이</span>
							{postInfo.recruitCondition.ageRange.join(", ")}
						</div>
					</div>
					<Likes likesList={postData.likes} postId={postData._id} />
					<CommentsList
						commentsList={postData.comments}
						postId={id as string}
						authorId={postData.author._id}
					/>
					{!isAuthor && (
						<Button className="w-full mt-4 mb-8">동행 신청하기</Button>
					)}
				</div>
			</main>
		);
	} else {
		return <div></div>;
	}
}

import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPostById } from "../apis/post";
import CommentsList from "../components/features/postDetail/CommentsList";
import PostTitle from "../components/features/postDetail/PostTitle";
import TravelInfo from "../components/features/postDetail/TravelInfo";
import UserInfo from "../components/features/user/UserInfo";

export default function PostDetail() {
	const { id } = useParams();
	const [postData, setPostData] = useState<Post | null>(null);

	const getData = useCallback(async () => {
		const postData = await getPostById(id!);
		setPostData(postData);
	}, [id]);

	useEffect(() => {
		if (!id) return;
		getData();
	}, [id, getData]);

	if (postData) {
		const authorInfo: Profile = JSON.parse(postData.author.fullName);
		const postInfo: PostData = JSON.parse(postData.title);
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
					<div className="self-center px-[30px] py-[10px] border-[1px] border-[#CDCDCD] rounded-[15px]">
						{postData.likes.length}
					</div>
					<CommentsList
						commentsList={postData.comments}
						postId={id as string}
						authorId={postData.author._id}
					/>
				</div>
			</main>
		);
	} else {
		return <div></div>;
	}
}

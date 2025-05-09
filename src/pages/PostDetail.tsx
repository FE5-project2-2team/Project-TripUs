import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPostById, updatePost } from "../apis/post";
import Button from "../components/commons/Button";
import ApplyMembers from "../components/features/postDetail/ApplyMembers";
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
	const [isApplied, setIsApplied] = useState(false);

	const applyAccompany = async () => {
		if (!postData) return;
		const postInfo: PostDetail = JSON.parse(postData.title);
		const updateData = {
			title: JSON.stringify({
				...postInfo,
				applicantList: postInfo.applicantList.push(userId!)
			}),
			postId: id
		};

		try {
			const data = await updatePost(updateData);
			console.log(data);
			setIsApplied(true);
		} catch (error) {
			console.error(error);
		}
	};

	const getData = useCallback(async () => {
		try {
			const postData: PostData = await getPostById(id!);
			setPostData(postData);
		} catch (error) {
			console.error(error);
		}
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
				<div className="flex flex-col gap-[30px] w-266 ">
					<PostTitle
						isAuthor={isAuthor}
						isRecruiting={postInfo.isRecruiting}
						title={postInfo.title}
						postId={postData._id}
						postData={postData}
					/>
					<TravelInfo
						contents={postInfo.contents}
						dateRange={postInfo.dateRange}
						location={postInfo.location}
					/>
					<UserInfo
						authorInfo={authorInfo}
						image={postData.author.image}
						userId={postData.author._id}
					/>
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
					<ApplyMembers />
					<Likes likesList={postData.likes} postId={postData._id} />
					<CommentsList
						commentsList={postData.comments}
						postId={id as string}
						authorId={postData.author._id}
					/>
					{!isAuthor && userId && (
						<Button
							onClick={applyAccompany}
							className="w-full mb-8 disabled:cursor-auto disabled:bg-[#808080]"
							disabled={isApplied}
						>
							동행 신청하기
						</Button>
					)}
				</div>
			</main>
		);
	} else {
		return <div></div>;
	}
}

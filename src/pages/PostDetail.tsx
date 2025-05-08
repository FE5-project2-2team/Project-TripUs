import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { createComment, deleteComment } from "../apis/comment";
import { getPostById } from "../apis/post";
import Button from "../components/commons/Button";
import ApplyMembers from "../components/features/postDetail/ApplyMembers";
import CommentsList from "../components/features/postDetail/CommentsList";
import Likes from "../components/features/postDetail/Likes";
import MemberList from "../components/features/postDetail/MemberList";
import PostTitle from "../components/features/postDetail/PostTitle";
import TravelInfo from "../components/features/postDetail/TravelInfo";
import UserInfo from "../components/features/user/UserInfo";
import { useAuthStore } from "../store/authStore";

export default function PostDetail() {
	const { id } = useParams();
	const userId = useAuthStore((state) => state.userId)!;
	const [postData, setPostData] = useState<PostData | null>(null);
	const [applicants, setApplicants] = useState<CommentData[]>([]);
	const [comments, setComments] = useState<CommentData[]>([]);
	const [members, setMembers] = useState<UserData[]>([]);

	const getData = useCallback(async () => {
		try {
			const postData: PostData = await getPostById(id!);
			const postInfo: PostDetail = JSON.parse(postData.title);
			setPostData(postData);
			setMembers(postInfo.memberList);

			const applyList = postData.comments.filter((commentData) => {
				const parsed: CommentType = JSON.parse(commentData.comment);
				return (
					parsed.type === "apply" &&
					postInfo.applicantList.every(
						(applicant) => applicant !== commentData.author._id
					)
				);
			});
			setApplicants(applyList);

			const commentList = postData.comments.filter((commentData) => {
				const parsed: CommentType = JSON.parse(commentData.comment);
				return parsed.type === "comment";
			});
			setComments(commentList);
		} catch (error) {
			console.error(error);
		}
	}, [id]);

	const submitHandler = async (
		e: React.FormEvent<HTMLFormElement>,
		value: string
	) => {
		e.preventDefault();
		try {
			if (!postData) return;
			const data: CommentType = { type: "comment", value };
			const newComment = await createComment(
				postData?._id,
				JSON.stringify(data)
			);
			setComments((list) => [...list, newComment]);
		} catch (error) {
			console.error(error);
		}
	};

	const addMember = (newMember: UserData) => {
		setMembers((members) => [...members, newMember]);
	};

	const deleteCommentHandler = async (commentId: string) => {
		try {
			await deleteComment(commentId);
			setComments((list) => list.filter((item) => item._id !== commentId));
		} catch (error) {
			console.error(error);
		}
	};

	const applyBtnHandler = async () => {
		if (!postData) return;
		const data: CommentType = { type: "apply" };
		const newApplicant = await createComment(
			postData?._id,
			JSON.stringify(data)
		);
		setApplicants((applicants) => [...applicants, newApplicant]);
	};

	const deleteApplicant = (userId: string) => {
		setApplicants((applicants) =>
			applicants.filter((applicant) => applicant.author._id !== userId)
		);
	};

	useEffect(() => {
		if (!id) return;
		getData();
	}, [id, getData]);

	if (postData) {
		const authorInfo: Profile = JSON.parse(postData.author.fullName);
		const postInfo: PostDetail = JSON.parse(postData.title);
		const isAuthor = userId === postData.author._id;
		const isApplied =
			applicants.some((applicant) => applicant.author._id === userId) ||
			postInfo.applicantList.includes(userId);
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
					<MemberList members={members} />
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
					{isAuthor && (
						<ApplyMembers
							postInfo={postInfo}
							postData={postData}
							applicants={applicants}
							deleteApplicant={deleteApplicant}
							addMember={addMember}
						/>
					)}
					<Likes postData={postData} likesList={postData.likes} />
					<CommentsList
						commentsList={comments}
						authorId={postData.author._id}
						submitHandler={submitHandler}
						deleteCommentHandler={deleteCommentHandler}
					/>
					{!isAuthor && userId && (
						<Button
							onClick={applyBtnHandler}
							className="w-full mb-8 disabled:cursor-auto disabled:bg-[#808080]"
							disabled={isApplied}
						>
							{members.length === postInfo.memberLimit
								? "모집이 마감되었습니다"
								: "동행 신청하기"}
						</Button>
					)}
				</div>
			</main>
		);
	} else {
		return <div></div>;
	}
}

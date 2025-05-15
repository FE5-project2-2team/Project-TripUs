import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { createComment, deleteComment } from "../apis/comment";
import { createNoti } from "../apis/notification"; //알림
import { getPostById, updatePost } from "../apis/post";
import Button from "../components/commons/Button";
import ApplyMembers from "../components/features/postDetail/ApplyMembers";
import CommentsList from "../components/features/postDetail/CommentsList";
import Likes from "../components/features/postDetail/Likes";
import MemberList from "../components/features/postDetail/MemberList";
import PostHeader from "../components/features/postDetail/PostHeader";
import { CHANNELS } from "../constants/posts";
import { useAuthStore } from "../store/authStore";

export default function PostDetail() {
	const { id } = useParams();
	const userId = useAuthStore((state) => state.userId)!;
	const [postData, setPostData] = useState<PostData | null>(null);
	const [applicants, setApplicants] = useState<CommentData[]>([]);
	const [comments, setComments] = useState<CommentData[]>([]);
	const [members, setMembers] = useState<string[]>([]);
	const [isRecruiting, setIsRecruiting] = useState(false);
	const [isApplying, setIsApplying] = useState(false);
	const getData = useCallback(async () => {
		try {
			const postData: PostData = await getPostById(id!);
			const postInfo: PostDetail = JSON.parse(postData.title);
			const applyList = postData.comments.filter((commentData) => {
				const parsed: CommentType = JSON.parse(commentData.comment);
				return (
					parsed.type === "apply" &&
					postInfo.memberList.every(
						(member) => member !== commentData.author._id
					) &&
					postInfo.rejectList.every(
						(applicant) => applicant !== commentData.author._id
					)
				);
			});
			const isMember = postInfo.memberList.includes(userId);
			const isRejected = postInfo.rejectList.includes(userId);
			const isApplying =
				applyList.some((applicant) => applicant.author._id === userId) &&
				!isMember &&
				!isRejected;
			const commentList = postData.comments.filter((commentData) => {
				const parsed: CommentType = JSON.parse(commentData.comment);
				return parsed.type === "comment";
			});

			setPostData(postData);
			setIsApplying(isApplying);
			setMembers(postInfo.memberList);
			setIsRecruiting(postInfo.isRecruiting);
			setApplicants(applyList);
			setComments(commentList);
		} catch (error) {
			console.error(error);
		}
	}, [id, userId]);

	const toggleRecruit = async () => {
		try {
			if (!postData) return;
			const postInfo = JSON.parse(postData.title);
			const newData: PostDetail = { ...postInfo };
			newData.isRecruiting = !newData.isRecruiting;
			setIsRecruiting((state) => !state);
			const formData = new FormData();
			formData.append("title", JSON.stringify(newData));
			formData.append("channelId", postData.channel._id);
			formData.append("postId", postData._id);
			await updatePost(formData);
		} catch (error) {
			console.error(error);
		}
	};

	const submitHandler = async (
		e: React.FormEvent<HTMLFormElement>,
		value: string
	) => {
		e.preventDefault();
		if (!postData) return;

		try {
			const data: CommentType = { type: "comment", value };
			const newComment: CommentData = await createComment(
				postData?._id,
				JSON.stringify(data)
			);
			setComments((list) => [...list, newComment]);

			//알림
			// console.log("newComment:", newComment);
			const post: PostData = await getPostById(newComment.post);
			//console.log("post작성자(알림받을사람):", post.author._id);
			await createNoti({
				notificationType: "COMMENT",
				notificationTypeId: newComment._id,
				userId: post.author._id,
				postId: newComment.post
			});
			// console.log("댓글 알림생성:", commentNoti);
		} catch (error) {
			console.error(error);
		}
	};

	const addMember = (newMember: string) => {
		setMembers((members) => [...members, newMember]);
	};

	const deleteCommentHandler = async (commentId: string) => {
		try {
			setComments((list) => list.filter((item) => item._id !== commentId));
			await deleteComment(commentId);
		} catch (error) {
			console.error(error);
		}
	};

	const applyBtnHandler = async () => {
		if (!postData) return;
		setIsApplying(true);
		const data: CommentType = { type: "apply" };
		const newApplicant = await createComment(
			postData?._id,
			JSON.stringify(data)
		);
		setApplicants((applicants) => [...applicants, newApplicant]);

		//알림
		// console.log("newApplicant", newApplicant);
		const post: PostData = await getPostById(newApplicant.post);
		await createNoti({
			notificationType: "APPLY",
			notificationTypeId: newApplicant._id,
			userId: post.author._id,
			postId: newApplicant.post
		});
		// console.log("동행요청reqNoti:", reqNoti);
	};

	const cancelBtnHandler = async () => {
		setIsApplying(false);
		const myApply = applicants.filter(
			(applicant) => applicant.author._id === userId
		);
		setApplicants((applicants) =>
			applicants.filter((applicant) => applicant.author._id !== userId)
		);
		myApply.forEach(async (apply) => {
			await deleteComment(apply._id);
		});
	};

	const deleteApplicant = (userId: string) => {
		setApplicants((applicants) =>
			applicants.filter((applicant) => applicant.author._id !== userId)
		);
	};

	const cancelAccompanyHandler = () => {
		if (!postData) return;
		setMembers((members) => members.filter((member) => member === userId));
	};

	useEffect(() => {
		if (!id) return;
		getData();
	}, [id, getData]);

	if (postData) {
		const authorInfo: Profile = JSON.parse(postData.author.fullName);
		const postInfo: PostDetail = JSON.parse(postData.title);

		const isAuthor = userId === postData.author._id;
		const isMember = postInfo.memberList.includes(userId);
		const isRejected = postInfo.rejectList.includes(userId);
		const isRecruitChannel = postData.channel._id === CHANNELS.RECRUITMENT;
		return (
			<main className="flex flex-col justify-center items-center mt-[49px] mb-20">
				<div className="flex flex-col gap-[30px] w-275 ">
					<PostHeader
						postData={postData}
						postInfo={postInfo}
						authorInfo={authorInfo}
						isRecruitChannel={isRecruitChannel}
						toggleRecruit={toggleRecruit}
						isRecruiting={isRecruiting}
					/>
					{isRecruitChannel && (
						<>
							<MemberList members={members} />
							<div>
								<span className="post-sub-title">동행 조건 사항</span>
								<div>
									<span className="text-[#616161] mr-[10px] dark:text-[#dadada]">
										성별
									</span>
									<span>{postInfo.recruitCondition.gender}</span>
								</div>
								<div>
									<span className="text-[#616161] mr-[10px] dark:text-[#dadada]">
										나이
									</span>
									{postInfo.recruitCondition.ageRange.join(", ")}
								</div>
							</div>
						</>
					)}
					{isAuthor && isRecruiting ? (
						<ApplyMembers
							postInfo={postInfo}
							postData={postData}
							applicants={applicants}
							deleteApplicant={deleteApplicant}
							addMember={addMember}
						/>
					) : (
						<div></div>
					)}
					<Likes postData={postData} likesList={postData.likes} />
					<CommentsList
						commentsList={comments}
						authorId={postData.author._id}
						submitHandler={submitHandler}
						deleteCommentHandler={deleteCommentHandler}
					/>
					{!isAuthor && userId && isRecruitChannel && !isMember && (
						<Button
							reverse={isApplying}
							onClick={isApplying ? cancelBtnHandler : applyBtnHandler}
							className="w-full mb-8 disabled:cursor-auto disabled:bg-[#808080]"
							disabled={!postInfo.isRecruiting || isRejected}
						>
							{postInfo.isRecruiting
								? isRejected
									? "거절 되었습니다"
									: isApplying
										? "동행 신청 취소"
										: "동행 신청하기"
								: "모집이 마감되었습니다"}
						</Button>
					)}
					{!isAuthor && isMember && (
						<Button
							onClick={cancelAccompanyHandler}
							reverse
							className="w-full mb-8 disabled:cursor-auto disabled:bg-[#808080]"
						>
							동행 철회
						</Button>
					)}
				</div>
			</main>
		);
	} else {
		return <div></div>;
	}
}

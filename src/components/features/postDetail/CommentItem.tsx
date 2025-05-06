import { Link } from "react-router";
import { useAuthStore } from "../../../store/authStore";
import { formatDate, formatTime } from "../../../utils/date";

export default function CommentItem({
	comment,
	authorId,
	deleteCommentHandler
}: {
	comment: CommentData;
	authorId: string;
	deleteCommentHandler: (commentId: string) => void;
}) {
	const userId = useAuthStore((state) => state.userId);
	const userInfo: Profile = JSON.parse(comment.author.fullName);
	const date = new Date(comment.createdAt);

	return (
		<li className="flex items-center gap-[10px] py-6 border-b border-[#d9d9d9]">
			<Link to={`/profile/${comment.author._id}`}>
				<img
					className="w-[50px] h-[50px] rounded-full object-cover"
					src={comment.author.image}
					alt="프로필 이미지"
				/>
			</Link>
			<div className="flex flex-col">
				<div className="flex items-center gap-1">
					<span className="font-medium">{userInfo.nickname}</span>
					{comment.author._id === authorId && (
						<span className="text-[9px] text-white bg-[#06b796] rounded-[10px] py-[1px] px-1">
							작성자
						</span>
					)}
				</div>
				<span className="text-[#616161] text-sm mb-[2px]">
					{comment.comment}
				</span>
				<div>
					<span className="text-[#616161] text-[10px]">
						{`${formatDate(date)} ${formatTime(date)}`}
					</span>
					{userId === comment.author._id && (
						<span
							onClick={() => deleteCommentHandler(comment._id)}
							className="text-[12px] text-[#616161] hover:text-black ml-3 cursor-pointer self-end"
						>
							삭제
						</span>
					)}
				</div>
			</div>
		</li>
	);
}

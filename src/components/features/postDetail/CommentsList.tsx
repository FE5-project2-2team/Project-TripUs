import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAuthStore } from "../../../store/authStore";
import CommentItem from "./CommentItem";

export default function CommentsList({
	commentsList,
	authorId,
	submitHandler,
	deleteCommentHandler
}: {
	commentsList: CommentData[];
	authorId: string;
	submitHandler: (e: React.FormEvent<HTMLFormElement>, value: string) => void;
	deleteCommentHandler: (commentId: string) => void;
}) {
	const [value, setValue] = useState("");
	const userId = useAuthStore((state) => state.userId);
	return (
		<div className="mb-10">
			<span className="post-sub-title inline">댓글</span>
			<span className="sub_title_number">{commentsList.length}</span>
			<ul className="border-t border-[#CDCDCD] mt-4 dark:border-[#616161]">
				{commentsList
					.filter((commentData) => {
						const parsed: CommentType = JSON.parse(commentData.comment);
						return parsed.type === "comment";
					})
					.map((commentData) => {
						return (
							<CommentItem
								key={commentData._id}
								comment={commentData}
								authorId={authorId}
								deleteCommentHandler={deleteCommentHandler}
							/>
						);
					})}
			</ul>
			{userId && (
				<form
					className="relative"
					onSubmit={(e) => {
						submitHandler(e, value);
						setValue("");
					}}
				>
					<input
						className={twMerge(
							"w-full h-15 mt-[35px] px-4 border border-[#CDCDCD] rounded-[10px] text-sm placeholder:text-[#CDCDCD] text-blac focus:outline-0",
							"dark:border-[#616161] dark:placeholder:text-[#616161] dark:text-[#dadada]"
						)}
						type="text"
						placeholder="댓글을 입력해주세요"
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
					<button
						type="submit"
						className={twMerge(
							"absolute top-[42px] right-2 w-20 h-[46px] bg-[#f3f4f6] text-[#06b796] font-medium rounded-lg hover:bg-[#06b796]",
							"hover:text-white cursor-pointer",
							"dark:bg-[#333] dark:border dark:border-[#06b796]"
						)}
					>
						등록
					</button>
				</form>
			)}
		</div>
	);
}

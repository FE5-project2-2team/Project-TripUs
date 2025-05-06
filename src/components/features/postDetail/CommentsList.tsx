import React, { useState } from "react";
import { createComment, deleteComment } from "../../../apis/comment";
import CommentItem from "./CommentItem";

export default function CommentsList({
	commentsList,
	postId,
	authorId
}: {
	commentsList: CommentData[];
	postId: string;
	authorId: string;
}) {
	const [value, setValue] = useState("");
	const [list, setList] = useState([...commentsList]);
	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newComment = await createComment(postId, value);
		setList((list) => [...list, newComment]);
		setValue("");
	};
	const deleteCommentHandler = async (commentId: string) => {
		await deleteComment(commentId);
		setList((list) => list.filter((item) => item._id !== commentId));
	};
	return (
		<div className="mb-10">
			<span className="post-sub-title inline">댓글</span>
			<span className="text-lg font-medium text-[#06b796] ml-2">
				{list.length}
			</span>
			<ul className="border-t border-[#CDCDCD] mt-4">
				{list.map((comment) => (
					<CommentItem
						key={comment._id}
						comment={comment}
						authorId={authorId}
						deleteCommentHandler={deleteCommentHandler}
					/>
				))}
			</ul>
			<form className="relative" onSubmit={submitHandler}>
				<input
					className="w-full h-15 mt-[35px] px-4 border border-[#CDCDCD] 
					rounded-[10px] text-sm placeholder:text-[#CDCDCD] text-black
					focus: outline-0"
					type="text"
					placeholder="댓글을 입력해주세요"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<button
					type="submit"
					className="absolute top-[42px] right-2 w-20 h-[46px] 
					bg-[#f3f4f6] text-[#06b796] font-medium rounded-lg hover:bg-[#06b796]
					 hover:text-white cursor-pointer"
				>
					등록
				</button>
			</form>
		</div>
	);
}

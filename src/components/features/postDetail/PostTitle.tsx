import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useClickAway } from "react-use";
import { deletePost } from "../../../apis/post";
import Icon from "../../commons/Icon";
import Modal from "../../commons/Modal";
import ModalItem from "../../commons/ModalItem";

export default function PostTitle({
	isRecruiting,
	title,
	isAuthor,
	postId,
	postData
}: {
	isRecruiting: boolean | undefined;
	title: string | undefined;
	isAuthor: boolean;
	postId: string;
	postData: PostData;
}) {
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);
	const modalRef = useRef<HTMLDivElement | null>(null);

	const modifyPostHandler = async () => {
		navigate(`/post/edit/${postId}`, {
			state: {
				postData
			}
		});
	};

	const deletePostHandler = async () => {
		await deletePost(postId);
		navigate("/");
	};

	useClickAway(modalRef, () => {
		setModalOpen(false);
	});
	return (
		<div className="mb-9 flex justify-between items-center relative">
			<Link className="cursor-pointer" to={"/"}>
				<Icon position="39.301% 27.747%" size="16px" />
			</Link>
			<h2 className="items-center mb-[14px] inline-block">
				<span className="mr-4 text-xl text-[#06B796] px-3 bg-[#F3F4F6] py-[5.5px] rounded-lg">
					{isRecruiting ? "모집중" : "모집완료"}
				</span>
				<span className="text-[28px] font-medium">{title}</span>
			</h2>
			{isAuthor ? (
				<button
					className="cursor-pointer"
					onClick={() => {
						if (!modalOpen) setModalOpen(true);
					}}
				>
					<Icon position="36.444% 35.561%" size="20px" />
				</button>
			) : (
				<div />
			)}
			{modalOpen && (
				<Modal ref={modalRef}>
					<ModalItem noIcon clickHandler={modifyPostHandler}>
						<span className="inline-block w-full text-center">수정</span>
					</ModalItem>
					<ModalItem noIcon clickHandler={deletePostHandler}>
						<span className="inline-block w-full text-center">삭제</span>
					</ModalItem>
				</Modal>
			)}
		</div>
	);
}

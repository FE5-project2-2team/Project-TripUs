import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useClickAway } from "react-use";
import { twMerge } from "tailwind-merge";
import { deletePost } from "../../../apis/post";
import Icon from "../../commons/Icon";
import Modal from "../../commons/Modal";
import ModalItem from "../../commons/ModalItem";

export default function PostTitle({
	isRecruitChannel,
	isRecruiting,
	toggleRecruit,
	title,
	isAuthor,
	postId
}: {
	isRecruitChannel: boolean;
	isRecruiting: boolean | undefined;
	toggleRecruit: () => void;
	title: string | undefined;
	isAuthor: boolean;
	postId: string;
}) {
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);
	const modalRef = useRef<HTMLDivElement | null>(null);

	const modifyPostHandler = () => {
		navigate(`/post/edit/${postId}`, {
			state: {
				postId
			}
		});
	};

	const deletePostHandler = async () => {
		const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
		if (isConfirmed) {
			try {
				await deletePost(postId);
				navigate("/");
			} catch (error) {
				console.error(error);
			}
		}
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
				<span
					onClick={() => {
						if (!isAuthor || !isRecruitChannel) return;
						toggleRecruit();
					}}
					className={twMerge(
						"mr-4 text-xl px-3 py-[5.5px] rounded-lg",
						isRecruitChannel
							? "cursor-pointer text-[#06B796] bg-[#F3F4F6] hover:"
							: "cursor-default bg-[#06b796] text-white"
					)}
				>
					{isRecruitChannel ? (isRecruiting ? "모집중" : "모집완료") : "후기"}
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

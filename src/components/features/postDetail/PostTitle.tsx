import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useClickAway } from "react-use";
import { twMerge } from "tailwind-merge";
import { deletePost } from "../../../apis/post";
import Confirm from "../../commons/Confirm";
import Icon from "../../commons/Icon";
import Modal from "../../commons/Modal";
import ModalItem from "../../commons/ModalItem";

export default function PostTitle({
	isRecruitChannel,
	isRecruiting,
	toggleRecruit,
	title,
	isAuthor,
	postData
}: {
	isRecruitChannel: boolean;
	isRecruiting: boolean | undefined;
	toggleRecruit: () => void;
	title: string | undefined;
	isAuthor: boolean;
	postData: PostData;
}) {
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);
	const modalRef = useRef<HTMLDivElement | null>(null);
	const [confirmOpen, setConfirmOpen] = useState(false);

	const modifyPostHandler = () => {
		navigate(`/post/edit/${postData._id}`, {
			state: {
				postData
			}
		});
	};

	const deletePostHandler = async () => {
		setConfirmOpen(true);
		try {
			await deletePost(postData._id);
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	const confirmOpenHandler = () => {
		setConfirmOpen((state) => !state);
	};

	useClickAway(modalRef, () => {
		setModalOpen(false);
	});

	return (
		<div className=" flex justify-between items-center relative">
			<div className="cursor-pointer" onClick={() => navigate(-1)}>
				<Icon position="39.301% 27.747%" size="16px" />
			</div>
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
					<ModalItem noIcon clickHandler={confirmOpenHandler}>
						<span className="inline-block w-full text-center">삭제</span>
					</ModalItem>
				</Modal>
			)}
			{confirmOpen && (
				<>
					<div className="fixed inset-0 bg-black opacity-30 z-50" />
					<Confirm
						deletePostHandler={deletePostHandler}
						cancelHandler={confirmOpenHandler}
					/>
				</>
			)}
		</div>
	);
}

import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useClickAway } from "react-use";
import { deletePost, updatePost } from "../../../apis/post";
import Icon from "../../commons/Icon";
import Modal from "../../commons/Modal";
import ModalItem from "../../commons/ModalItem";

export default function PostTitle({
	isRecruiting,
	title,
	isAuthor,
	postData,
	postInfo
}: {
	isRecruiting: boolean | undefined;
	title: string | undefined;
	isAuthor: boolean;
	postData: PostData;
	postInfo: PostDetail;
}) {
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);
	const [recruit, isRecruit] = useState(isRecruiting);
	const modalRef = useRef<HTMLDivElement | null>(null);

	const modifyPostHandler = () => {
		navigate(`/post/edit/${postData._id}`, {
			state: {
				postData
			}
		});
	};

	const deletePostHandler = async () => {
		const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
		if (isConfirmed) {
			try {
				await deletePost(postData._id);
				navigate("/");
			} catch (error) {
				console.error(error);
			}
		}
	};

	const toggleRecruit = async () => {
		try {
			const newData: PostDetail = { ...postInfo };
			newData.isRecruiting = !newData.isRecruiting;
			isRecruit((state) => !state);
			const formData = new FormData();
			formData.append("title", JSON.stringify(newData));
			formData.append("channelId", postData.channel._id);
			formData.append("postId", postData._id);
			await updatePost(formData);
		} catch (error) {
			console.error(error);
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
					onClick={toggleRecruit}
					className="cursor-pointer mr-4 text-xl text-[#06B796] px-3 bg-[#F3F4F6] py-[5.5px] rounded-lg"
				>
					{recruit ? "모집중" : "모집완료"}
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

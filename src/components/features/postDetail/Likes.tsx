import { useState } from "react";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import { createLike, deleteLike } from "../../../apis/like";
import { useAuthStore } from "../../../store/authStore";
import Icon from "../../commons/Icon";

export default function Likes({
	likesList,
	postId
}: {
	likesList: LikeData[];
	postId: string;
}) {
	const navigate = useNavigate();
	const userId = useAuthStore((state) => state.userId);
	const [likes, setLikes] = useState<{
		number: number;
		likeId: string | undefined;
	}>({
		number: likesList.length,
		likeId: likesList.find((like) => like.user === userId)?._id
	});

	const likeBtnHandler = async () => {
		if (!userId) {
			navigate("/login");
			return;
		}
		try {
			if (likes.likeId) {
				await deleteLike(likes.likeId);
				setLikes((likes) => ({
					number: likes.number - 1,
					likeId: ""
				}));
			} else {
				const myLike: LikeData = await createLike(postId);
				setLikes((likes) => ({
					number: likes.number + 1,
					likeId: myLike._id
				}));
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div
			onClick={likeBtnHandler}
			className={twMerge(
				"cursor-pointer flex self-center px-[30px] pt-[10px] pb-[7.5px]  border-[1px] border-[#CDCDCD] rounded-[15px] hover:border-[#06b796]",
				likes.likeId && "bg-[#06b796] text-white"
			)}
		>
			<Icon
				position={likes.likeId ? "70.222% 35.359%" : "59.556% 35.359%"}
				size="22px"
			/>
			<span className="text-lg leading-4 ml-2">{likes.number}</span>
		</div>
	);
}

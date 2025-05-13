import { useState } from "react";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import { createLike, deleteLike } from "../../../apis/like";
import { useAuthStore } from "../../../store/authStore";
import Icon from "../../commons/Icon";
import { createNoti } from "../../../apis/notification";

export default function Likes({
	likesList,
	postData
}: {
	likesList: LikeData[];
	postData: PostData;
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

	const isAuthor = userId === postData.author._id;

	const likeBtnHandler = async () => {
		if (!userId) {
			navigate("/login");
			return;
		}
		if (isAuthor) {
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
				const myLike: LikeData = await createLike(postData._id);
				setLikes((likes) => ({
					number: likes.number + 1,
					likeId: myLike._id
				}));

				//추가
				await createNoti({
					notificationType: "LIKE",
					notificationTypeId: myLike._id,
					userId: postData.author._id,
					postId: postData._id
				});
				// console.log("좋아요 알림생성:", likeNoti);
				// console.log("알림 받을 대상:", postData.author._id);
				// console.log("현재 사용자:", userId);
				//
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div
			onClick={likeBtnHandler}
			className={twMerge(
				"cursor-pointer flex self-center px-[30px] pt-[10px] pb-[7.5px]  border-[1px] border-[#CDCDCD] rounded-[15px]",
				likes.likeId && "bg-[#06b796] text-white",
				isAuthor ? "hover:hover:bg-gray-100" : "hover:border-[#06b796]"
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

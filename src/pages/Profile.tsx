import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../apis/axios";
import { getUserInfo } from "../apis/user";
import { useAuthStore } from "../store/authStore";
import { showToast } from "../components/commons/Toast";
import profileCircle from "../assets/images/profileImg_circle.svg";
import ProfileHeader from "../components/features/profile/ProfileHeader";
import ProfileView from "../components/features/profile/ProfileView";
import ProfileEditModal from "../components/features/profile/ProfileEditModal";
import ProfileChannelTab from "../components/features/profile/ProfileChannelTab";

export default function Profile() {
	const navigate = useNavigate();
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const { id: paramsId } = useParams();
	const myUserId = useAuthStore((state) => state.userId);
	const viewingUserId = useMemo(
		() => paramsId || myUserId,
		[paramsId, myUserId]
	);

	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/login");
		}
	}, [isLoggedIn, navigate]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [image, setImage] = useState(profileCircle);
	const [profile, setProfile] = useState<Profile>({
		name: "",
		tel: "",
		nickname: "",
		gender: "",
		age: 0,
		tagList: []
	});
	const [editProfile, setEditProfile] = useState<Profile>({ ...profile });

	const getUserData = useCallback(async () => {
		try {
			const { image, fullName } = await getUserInfo(viewingUserId!);
			const parsed = JSON.parse(fullName);
			setImage(image || profileCircle);
			setProfile(parsed);
		} catch (err) {
			console.error("유저 정보 가져오기 실패:", err);
		}
	}, [viewingUserId]);

	useEffect(() => {
		if (viewingUserId) getUserData();
	}, [viewingUserId, getUserData]);

	const isMyPage = viewingUserId === myUserId;

	const handleEditClick = () => {
		setEditProfile(profile);
		setIsModalOpen(true);
	};

	const handleUpdate = async () => {
		const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,10}$/;
		if (!nicknameRegex.test(editProfile.nickname)) {
			showToast({
				type: "error",
				message: "닉네임은 2자 이상 10자 이하의 한글, 영문, 숫자만 가능합니다."
			});
			return;
		}

		const updatedFullName = JSON.stringify({
			...profile,
			nickname: editProfile.nickname,
			tagList: editProfile.tagList
		});

		try {
			const response = await axiosInstance.put("/settings/update-user", {
				fullName: updatedFullName
			});
			console.log("업데이트 성공:", response.data);
			setProfile(editProfile);
			setIsModalOpen(false);
			showToast({ type: "success", message: "프로필이 업데이트 되었습니다!" });
		} catch (err) {
			console.error("업데이트 실패:", err);
			showToast({ type: "error", message: "프로필 업데이트 실패" });
		}
	};

	return (
		<div className="flex flex-col items-center min-h-screen py-[24px]">
			<div className="w-[1100px]">
				<div>
					{isMyPage && (
						<ProfileHeader
							onEditClick={handleEditClick}
							isMyPage={true}
							userId={myUserId}
						/>
					)}
					{!isMyPage && (
						<ProfileHeader
							onEditClick={handleEditClick}
							isMyPage={false}
							userId={viewingUserId}
						/>
					)}
					<ProfileView profile={profile} image={image} />
					{isMyPage && isModalOpen && (
						<ProfileEditModal
							image={image}
							setImage={setImage}
							editProfile={editProfile}
							setEditProfile={setEditProfile}
							onUpdate={handleUpdate}
							onClose={() => setIsModalOpen(false)}
						/>
					)}
				</div>
				<div>
					{viewingUserId && (
						<ProfileChannelTab userId={viewingUserId} isMyPage={isMyPage} />
					)}
				</div>
			</div>
		</div>
	);
}

import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../apis/axios";
import { getUserInfo, uploadPhoto } from "../apis/user";
import profileCircle from "../assets/images/profileImg_circle.svg";
import spriteImage from "../assets/images/spriteImages.png";
import { useAuthStore } from "../store/authStore";

export default function Profile() {
	const navigate = useNavigate();
	const userId = useAuthStore((state) => state.userId);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [image, setImage] = useState(profileCircle);
	const [profile, setProfile] = useState<Profile>({
		name: "",
		tel: "",
		nickname: "",
		gender: "",
		age: 0,
		tagList: [],
		image: ""
	});
	const [editProfile, setEditProfile] = useState<Profile>({
		name: "",
		tel: "",
		nickname: "",
		gender: "",
		age: 0,
		tagList: [],
		image: ""
	});

	const getUserData = useCallback(async () => {
		const { image, fullName } = await getUserInfo(userId!);
		const parsed = JSON.parse(fullName);
		if (image) setImage(image || profileCircle);
		setProfile(parsed);
		setEditProfile(parsed);
	}, [userId]);

	useEffect(() => {
		getUserData();
	}, [getUserData]);

	// 태그 삭제
	const handleRemoveTag = (indexToRemove: number) => {
		setEditProfile((prev) => ({
			...prev,
			tagList: prev.tagList.filter((_, i) => i !== indexToRemove)
		}));
	};

	const handleUpdate = async () => {
		const updatedFullName = JSON.stringify({
			...profile,
			nickname: editProfile.nickname,
			tagList: editProfile.tagList
		});

		try {
			const response = await axiosInstance.put("/settings/update-user", {
				fullName: updatedFullName,
				image: editProfile.image
			});
			console.log("업데이트 성공:", response.data);
			setProfile(editProfile);
			setIsModalOpen(false);

			alert("프로필이 업데이트 되었습니다!");
		} catch (err) {
			console.error("업데이트 실패:", err);
			alert("프로필 업데이트 실패");
		}
	};

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			const result = await uploadPhoto(file);
			if (!result || !result.image) {
				throw new Error("서버 응답에 image 필드가 없습니다.");
			}
			const uploadedImageUrl = result.image;
			setImage(uploadedImageUrl);
			setEditProfile((prev) => ({
				...prev,
				image: uploadedImageUrl
			}));
		} catch (err) {
			console.error("사진 업로드 실패:", err);
			alert("프로필 사진 업로드에 실패했습니다.");
		}
	};

	const handleResetToDefaultImage = async () => {
		try {
			const response = await fetch(profileCircle);
			const blob = await response.blob();
			const defaultImageFile = new File([blob], "default-profile.svg", {
				type: blob.type
			});

			const result = await uploadPhoto(defaultImageFile);
			if (!result || !result.image) {
				throw new Error("기본 이미지 업로드 실패: 서버 응답에 image 필드 없음");
			}

			const uploadedImageUrl = result.image;
			setImage(uploadedImageUrl);
			setEditProfile((prev) => ({
				...prev,
				image: uploadedImageUrl
			}));
		} catch (err) {
			console.error("기본 이미지로 변경 실패:", err);
			alert("기본 이미지로 변경하는 데 실패했습니다.");
		}
	};

	const goToHome = () => {
		navigate("/");
	};

	const handleModalOpen = () => setIsModalOpen(true);
	const handleModalClose = () => {
		setEditProfile(profile);
		setIsModalOpen(false);
	};

	return (
		<div className="flex flex-col items-center min-h-screen py-[40px]">
			<div className="w-[1062px]">
				<div className="flex items-center justify-between mb-[50px]">
					<div className="flex">
						<button
							className="mr-[8px] w-[30px] h-[30px] cursor-pointer"
							style={{
								backgroundImage: `url(${spriteImage})`,
								backgroundPosition: "-167px -148px",
								backgroundSize: "367.5px 570px",
								backgroundRepeat: "no-repeat"
							}}
							aria-label="Go Back"
							onClick={goToHome}
						/>
						<h2 className="font-medium text-[20px] text-[#333333]">
							마이페이지 & 리뷰
						</h2>
					</div>
					<button
						onClick={handleModalOpen}
						className="inline-flex items-center justify-center w-[160px] h-[40px] font-medium text-[18px] text-white bg-[#06b796] px-[27px] py-[7px] rounded-[8px] cursor-pointer"
					>
						회원정보 수정
					</button>
				</div>
				{/* 프로필 영역 */}
				<div className="flex flex-col justify-center w-[1062px]">
					<div className="h-[auto] text-center space-y-[14px]">
						<img
							src={image}
							alt="프로필 이미지"
							className="w-[160px] h-[160px] rounded-full mx-auto mb-[20px] object-cover"
						/>
						{/* 유저 프로필 정보 */}
						<p className="text-[18px] font-medium">
							{profile.nickname}({profile.name})님
						</p>
						<div className="flex justify-center gap-x-[3px]">
							<p className="text-[16px]">{profile.age}</p>
							<p className="text-[16px]">{profile.gender}</p>
						</div>
						{/* 태그 뱃지*/}
						<div className="flex flex-wrap justify-center gap-[14px] m-0 px-[50px]">
							{profile.tagList?.map((tag, index) => (
								<span
									key={index}
									className="inline-flex items-center justify-center w-[auto] h-[35px] bg-[#F3F4F6] text-[#06b796] px-[12px] py-[4px] rounded-[8px]"
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* 수정 모달 */}
			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-white/60">
					<div className="w-[524px] rounded-[15px] bg-white pt-[30px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
						<h2 className="flex justify-center text-[24px] font-medium">
							프로필 편집
						</h2>
						<div className="pt-[30px]">
							<img
								src={image}
								alt="프로필 이미지"
								className="w-[160px] h-[160px] rounded-full mx-auto object-cover"
							/>

							<input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
								className="hidden"
							/>
							<div className="flex justify-center gap-2 mt-[15px]">
								<button
									onClick={() => fileInputRef.current?.click()}
									className="bg-white text-[#06B796] border border-[#06B796] rounded-[8px] px-4 py-2"
								>
									프로필 이미지 변경
								</button>
								<button
									onClick={handleResetToDefaultImage}
									className="bg-white text-[#06B796] border border-[#06B796] rounded-[8px] px-4 py-2"
								>
									기본 이미지로 변경
								</button>
							</div>
						</div>
						{/* 닉네임 수정란 */}
						<div className="flex flex-col items-center pt-[20px] pb-[10px]">
							<div id="nickname">
								<label className="block text-[16px] text-[#333333]">
									닉네임
								</label>
								<input
									type="text"
									value={editProfile.nickname}
									onChange={(e) =>
										setEditProfile({ ...editProfile, nickname: e.target.value })
									}
									className="text-[16px] text-[#333333] rounded-[10px] w-[340px] h-[49px] px-[13px] py-[15px] mt-[10px] border border-[#616161]"
								/>
								<p className="text-[#333333] text-[11px] mt-[5px]">
									*2자 이상 10자 이내의 한글, 영문, 숫자 입력 가능합니다.
								</p>
							</div>
							{/* 자기소개 키워드 입력란 */}
							<div id="bio_tag">
								<label className="block text-[16px] text-[#333333]">
									자기소개 키워드
								</label>
								<input
									type="text"
									placeholder="태그 입력 후 Enter"
									onKeyDown={(e) => {
										const value = e.currentTarget.value.trim();
										if (
											e.key === "Enter" &&
											!e.nativeEvent.isComposing &&
											value
										) {
											setEditProfile({
												...editProfile,
												tagList: [...(editProfile.tagList ?? []), value]
											});
											e.currentTarget.value = "";
										}
									}}
									className="text-[16px] text-[#333333] rounded-[10px] w-[340px] h-[49px] px-[13px] py-[15px] mt-[10px] border border-[#616161]"
								/>
							</div>

							<div
								id="tag_badge"
								className="flex flex-wrap justify-center gap-2 px-[40px] py-[20px]"
							>
								{editProfile.tagList?.map((tag, idx) => (
									<span
										key={idx}
										className="w-[auto] h-[30px] bg-[#F3F4F6] text-[#06B796] p-[6px] rounded-[8px] text-[16px] flex items-center"
									>
										{tag}
										<button
											onClick={() => handleRemoveTag(idx)}
											className="ml-[10px] text-[#06B796] hover:text-neutral-700"
										>
											x
										</button>
									</span>
								))}
							</div>
						</div>
						{/* 확인 / 취소 버튼 */}
						<div className="flex justify-center space-x-[20px] mb-[30px]">
							<button
								onClick={handleUpdate}
								className="W-[106px] h-[46px] px-[65px] py-[12px] text-[16px] font-bold bg-[#06B796] text-white rounded-[10px]"
							>
								확인
							</button>
							<button
								onClick={handleModalClose}
								className="W-[106px] h-[46px] px-[65px] py-[12px] text-[16px] font-bold bg-white text-[#06B796] rounded-[10px] border"
							>
								취소
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

import {
	faAngleDown,
	faBell,
	faComments
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useClickAway } from "react-use";
import { getUserInfo } from "../../apis/user";
import headerLogo from "../../assets/images/logo_header.svg";
import { useAuthStore } from "../../store/authStore";
import Button from "./Button";
import Modal from "./Modal";
import ModalItem from "./ModalItem";
import Icon from "./Icon";
import UserListModal from "../features/user/UserListModal";
import NotiList from "../features/notification/NotiList";
import { useNoti } from "../../context/useNoti";

export default function Header() {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const userId = useAuthStore((state) => state.userId);
	const logout = useAuthStore((state) => state.logout);
	const image = useAuthStore((state) => state.image);
	const nickname = useAuthStore((state) => state.nickname);
	const setImage = useAuthStore((state) => state.setImage);
	const setNickname = useAuthStore((state) => state.setNickname);
	const navigate = useNavigate();

	const [modalOpen, setModalOpen] = useState(false);
	const [notiOpen, setNotiOpen] = useState(false);
	const modalRef = useRef<HTMLDivElement | null>(null);

	// const [notiInfo, setNotiInfo] = useState<NotiData[]>([]);
	const { notiInfo } = useNoti();
	const unRead = notiInfo.some((n) => !n.seen);
	const [isUserListOpen, setIsUserListOpen] = useState(false);

	const getUserData = useCallback(async () => {
		if (!userId) return;
		try {
			const { image, fullName } = await getUserInfo(userId);
			const { nickname } = JSON.parse(fullName);
			if (image) setImage(image);
			setNickname(nickname);
		} catch (error) {
			console.error(error);
		}
	}, [userId, setImage, setNickname]); // 변경된 부분

	const signOut = () => {
		navigate("/");
		logout();
		setModalOpen(false);
	};

	const goToMyPage = () => {
		navigate(`/profile/${userId}`);
		setModalOpen(false);
	};

	const setDarkMode = () => {
		setModalOpen(false);
	};

	const toggleNoti = () => {
		setNotiOpen((noti) => !noti);
	};

	useEffect(() => {
		if (isLoggedIn && userId) {
			getUserData();
		}
	}, [isLoggedIn, userId, getUserData]);

	useClickAway(modalRef, () => {
		setModalOpen(false);
	});
	return (
		<div className="w-[1100px] flex justify-between h-[70px] m-auto">
			<Link to={"/"} className="flex items-center">
				<img src={headerLogo} alt="로고" />
			</Link>
			{isLoggedIn ? (
				<div className="flex items-center gap-[40px] relative">
					{/* userList */}
					<div className="relative inline-block">
						<button
							className="mt-[7px] relative cursor-pointer"
							onClick={() => setIsUserListOpen((prev) => !prev)}
						>
							<Icon size="24px" position="-201px -42px" />
						</button>
						{isUserListOpen && (
							<UserListModal onClose={() => setIsUserListOpen(false)} />
						)}
					</div>
					<Link to={"/message"}>
						<FontAwesomeIcon icon={faComments} className="text-xl" />
					</Link>
					{/* 알림 */}
					<button onClick={toggleNoti} className="cursor-pointer relative">
						<FontAwesomeIcon icon={faBell} className="text-xl" />
						{unRead && (
							<div className="absolute w-[10px] h-[10px] rounded-full top-[-5px] right-[-5px] bg-[#FD346E]" />
						)}
					</button>
					{notiOpen && (
						<div className="absolute top-[60px] right-[150px] z-60">
							<NotiList
								notiOpen={notiOpen}
								setNotiOpen={setNotiOpen}
								// notiInfo={notiInfo}
								// setNotiInfo={setNotiInfo}
							/>
						</div>
					)}
					<button
						onClick={() => {
							if (!modalOpen) setModalOpen(true);
						}}
						className="flex items-center cursor-pointer"
					>
						<img
							className="w-[50px] h-[50px] mr-[10px] rounded-full object-cover"
							src={image}
							alt="프로필 이미지"
						/>
						<span>{nickname}</span>
						<FontAwesomeIcon icon={faAngleDown} className="ml-[5px]" />
					</button>

					{modalOpen && (
						<Modal ref={modalRef}>
							<ModalItem
								clickHandler={goToMyPage}
								position="8.969% 81.006%"
								hoverPosition="8.969% 88.268%"
								size="22px"
							>
								마이페이지
							</ModalItem>
							<ModalItem
								clickHandler={setDarkMode}
								position="23.318% 81.006%"
								hoverPosition="23.318% 88.268%"
								size="22px"
							>
								다크모드
							</ModalItem>
							<ModalItem
								clickHandler={signOut}
								position="37.778% 80.833%"
								hoverPosition="37.778% 88.056%"
								size="22px"
							>
								로그아웃
							</ModalItem>
						</Modal>
					)}
				</div>
			) : (
				<div className="flex items-center gap-[10px]">
					{/* userList */}
					<div className="relative inline-block">
						<button
							className="mt-[7px] relative cursor-pointer"
							onClick={() => setIsUserListOpen((prev) => !prev)}
						>
							<Icon size="24px" position="-201px -42px" />
						</button>
						{isUserListOpen && (
							<UserListModal onClose={() => setIsUserListOpen(false)} />
						)}
					</div>
					<Link to={"/login"}>
						<Button
							reverse
							className="w-[120px] h-[45px] text-[18px] border-transparent hover:border-[#06B796] hover:bg-[#E0F4F2] hover:text-[#06b796]"
						>
							로그인
						</Button>
					</Link>
					<Link to={"/signup"}>
						<Button className="w-[120px] h-[45px] text-[18px]">
							회원 가입
						</Button>
					</Link>
				</div>
			)}
		</div>
	);
}

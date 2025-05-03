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
import profileCircle from "../../assets/images/profileImg_circle.svg";
import { useAuthStore } from "../../store/authStore";
import Button from "./Button";
import Icon from "./Icon";
import Modal from "./Modal";
import ModalItem from "./ModalItem";

export default function Header() {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const userId = useAuthStore((state) => state.userId);
	const logout = useAuthStore((state) => state.logout);
	const navigate = useNavigate();

	const [image, setImage] = useState(profileCircle);
	const [nickname, setNickname] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const modalRef = useRef<HTMLDivElement | null>(null);

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
	}, [userId]);
	console.log("rendering");
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

	useEffect(() => {
		if (isLoggedIn && userId) {
			getUserData();
		}
	}, [isLoggedIn, userId, getUserData]);

	useClickAway(modalRef, () => {
		setModalOpen(false);
	});

	return (
		<div className="flex justify-between h-[70px] px-5 border-b border-[#CACACA]">
			<Link to={"/"} className="flex items-center">
				<img src={headerLogo} alt="로고" />
			</Link>
			{isLoggedIn ? (
				<div className="flex items-center gap-[30px] relative">
					<Link to={"/message"}>
						<FontAwesomeIcon icon={faComments} className="text-xl" />
					</Link>
					<button>
						<FontAwesomeIcon icon={faBell} className="text-xl" />
					</button>
					<button
						onClick={() => {
							if (!modalOpen) setModalOpen(true);
						}}
						className="flex items-center cursor-pointer"
					>
						<img
							className="w-[50px] h-[50px] mr-[6px] rounded-full"
							src={image}
							alt="프로필 이미지"
						/>
						<span>{nickname}</span>
						<FontAwesomeIcon icon={faAngleDown} className="ml-[5px]" />
					</button>
					{modalOpen && (
						<Modal ref={modalRef}>
							<ModalItem clickHandler={goToMyPage}>
								<Icon position="bg-[-20px_-290px] group-hover:bg-[-20px_-316px]" />
								마이페이지
							</ModalItem>
							<ModalItem clickHandler={setDarkMode}>
								<Icon position="bg-[-52px_-290px] group-hover:bg-[-52px_-316px]" />
								다크모드
							</ModalItem>
							<ModalItem clickHandler={signOut}>
								<Icon position="bg-[-84px_-290px] group-hover:bg-[-84px_-316px]" />
								로그아웃
							</ModalItem>
						</Modal>
					)}
				</div>
			) : (
				<div className="flex items-center gap-[10px]">
					<Link to={"/login"}>
						<Button
							reverse
							className="w-[78px] h-[45px] text-[18px] border-transparent hover:border-[#06B796]"
						>
							로그인
						</Button>
					</Link>
					<Link to={"/signup"}>
						<Button className="w-25 h-[45px] text-[18px] hover:bg-[#038383]">
							회원 가입
						</Button>
					</Link>
				</div>
			)}
		</div>
	);
}

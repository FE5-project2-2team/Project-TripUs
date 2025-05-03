import {
	faAngleDown,
	faBell,
	faComments
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import { getUserInfo } from "../../apis/user";
import headerLogo from "../../assets/images/logo_header.svg";
import profileCircle from "../../assets/images/profileImg_circle.svg";
import { useAuthStore } from "../../store/authStore";
import Button from "./Button";
import Icon from "./Icon";
import ModalItem from "./ModalItem";

export default function Header() {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const userId = useAuthStore((state) => state.userId);
	const logout = useAuthStore((state) => state.logout);
	const navigate = useNavigate();

	const [image, setImage] = useState(profileCircle);
	const [nickname, setNickname] = useState("");
	const [modalOpen, setModalOpen] = useState(false);

	const getUserData = useCallback(async () => {
		const { image, fullName } = await getUserInfo(userId!);
		const { nickname } = JSON.parse(fullName);
		if (image) setImage(image);
		setNickname(nickname);
	}, [userId]);

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

	useLayoutEffect(() => {
		if (!isLoggedIn) return;
		getUserData();
	}, [isLoggedIn, getUserData]);

	return (
		<>
			{modalOpen && (
				<div
					className="fixed top-0 left-0 right-0 bottom-0"
					onClick={() => setModalOpen(false)}
				/>
			)}
			<div
				className={twMerge(
					"flex justify-between px-5 border-b border-[#CACACA]",
					isLoggedIn ? "py-[15px]" : "py-[10px]"
				)}
			>
				<Link to={"/"} className="flex items-center">
					<img src={headerLogo} alt="로고" />
				</Link>
				<div className="flex items-center gap-[30px]">
					{isLoggedIn ? (
						<>
							<Link to={"/postCreate"}>게시글 작성</Link>
							<Link to={"/message"}>
								<FontAwesomeIcon icon={faComments} className="text-xl" />
							</Link>
							<button className="relative">
								<FontAwesomeIcon icon={faBell} className="text-xl" />
							</button>
							<div className="flex gap-[6px] relative">
								<button
									onClick={() => setModalOpen((state) => !state)}
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
									<div className="z-20 bg-white w-[142px] p-[6px] border border-[#E0F4F2] rounded-[10px] absolute top-10">
										<ul className="flex flex-col gap-[6px]">
											<ModalItem clickHandler={goToMyPage}>
												<Icon position="bg-[-20px_-290px] group-hover:bg-[-20px_-316px]" />
												<span>마이페이지</span>
											</ModalItem>
											<ModalItem clickHandler={setDarkMode}>
												<Icon position="bg-[-52px_-290px] group-hover:bg-[-52px_-316px]" />
												다크모드
											</ModalItem>
											<ModalItem clickHandler={signOut}>
												<Icon position="bg-[-84px_-290px] group-hover:bg-[-84px_-316px]" />
												로그아웃
											</ModalItem>
										</ul>
									</div>
								)}
							</div>
						</>
					) : (
						<>
							<Link to={"/login"}>
								<Button
									reverse
									className="w-40 text-[18px] border-transparent hover:border-[#06B796]"
								>
									로그인
								</Button>
							</Link>
							<Link to={"/signup"}>
								<Button className="w-40 text-[18px] hover:bg-[#038383]">
									회원가입
								</Button>
							</Link>
						</>
					)}
				</div>
			</div>
		</>
	);
}

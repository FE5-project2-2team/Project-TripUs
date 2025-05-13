import React, { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../apis/auth";
import { useAuthStore } from "../store/authStore";
import SignupLogo from "../assets/images/Signup_logo.svg";
import Button from "../components/commons/Button";
import Icon from "../components/commons/Icon";
import { showToast } from "../components/commons/Toast";

export default function Login() {
	const navigate = useNavigate();
	const login = useAuthStore((state) => state.login);
	const [form, setForm] = useState({
		email: "",
		password: ""
	});
	const [errors, setErrors] = useState<{ email?: string }>({});
	const [hoveredField, setHoveredField] = useState<string | null>(null);

	const handleSignupClick = () => {
		navigate("/signup");
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const newErrors: { email?: string } = {};

		if (!emailRegex.test(form.email)) {
			newErrors.email = "*이메일 형식이 올바르지 않습니다.";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const data = await loginUser(form.email, form.password);
			console.log("서버응답", data);

			if (data?.token) {
				login(data.token, data.user._id);
				showToast({ type: "success", message: "로그인에 성공했습니다!" });
				navigate("/");
			} else {
				showToast({
					type: "error",
					message: "이메일 또는 비밀번호가 올바르지 않습니다."
				});
			}
		} catch (error) {
			showToast({ type: "warning", message: "로그인 중 오류가 발생했습니다." });
			console.error(error);
		}
	};
	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="w-[460px] mx-auto flex flex-col gap-[26px] text-[#333333]"
			>
				<img
					src={SignupLogo}
					alt="TripUs 로고"
					className="w-[278px] h-[106px] mx-auto mt-[223px] mb-[26px] cursor-pointer"
					onClick={() => navigate("/")}
				/>
				<div className="flex flex-col">
					<div
						className="relative group"
						onMouseEnter={() => setHoveredField("email")}
						onMouseLeave={() => setHoveredField(null)}
					>
						<div className="absolute left-4 top-1/2 -translate-y-1/2 w-[20px] h-[20px]">
							<Icon
								size="24px"
								position={
									hoveredField === "email" ? "-117px -265px" : "-117px -239px"
								}
							/>
						</div>
						<input
							name="email"
							placeholder="이메일"
							value={form.email}
							onChange={handleChange}
							className="inputProps"
						/>
					</div>
					<p className="text-red-500 text-xs font-bold mt-[1px] h-[1px] leading-tight">
						{errors.email ?? ""}
					</p>
				</div>
				<div
					className="relative group"
					onMouseEnter={() => setHoveredField("password")}
					onMouseLeave={() => setHoveredField(null)}
				>
					<div className="absolute left-4 top-1/2 -translate-y-1/2 w-[20px] h-[20px]">
						<Icon
							size="24px"
							position={
								hoveredField === "password" ? "-150px -264px" : "-150px -238px"
							}
						/>
					</div>
					<input
						name="password"
						type="password"
						placeholder="비밀번호"
						value={form.password}
						onChange={handleChange}
						className="inputProps"
					/>
				</div>

				<Button type="submit" className="w-full">
					로그인
				</Button>
				<Button
					type="button"
					onClick={handleSignupClick}
					reverse
					className="w-full border-[1px]"
				>
					회원가입
				</Button>
			</form>
		</>
	);
}

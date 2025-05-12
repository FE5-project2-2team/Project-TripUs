import { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../apis/auth";
import { toast } from "react-toastify";
import SignupLogo from "../assets/images/Signup_logo.svg";
import Button from "../components/commons/Button";
import Icon from "../components/commons/Icon";

function getGender(ssno: string) {
	const regex = /^(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[1-4]$/;

	if (!regex.test(ssno)) {
		console.log("올바른 주민등록번호 형식이 아닙니다.");
		return "Error";
	}

	const genderNum = ssno.charAt(6);
	const gender = parseInt(genderNum, 10) % 2 === 1 ? "남자" : "여자";

	return gender;
}

function calculateAge(birth: string): number {
	const formatted = `${birth.slice(0, 4)}-${birth.slice(4, 6)}-${birth.slice(
		6,
		8
	)}`;
	const birthDate = new Date(formatted);
	const today = new Date();

	let age = today.getFullYear() - birthDate.getFullYear();
	const month = today.getMonth();
	const day = today.getDate();

	if (
		month < birthDate.getMonth() ||
		(month === birthDate.getMonth() && day < birthDate.getDate())
	) {
		age--;
	}
	return age;
}

export default function Signup() {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		email: "",
		password: "",
		passwordConfirm: "",
		fullName: {
			name: "",
			birth: "",
			gender: "",
			tel: ""
		}
	});

	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const [hoveredField, setHoveredField] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (["name", "gender", "birth", "tel"].includes(name)) {
			setForm((prev) => ({
				...prev,
				fullName: {
					...prev.fullName,
					[name]: value
				}
			}));
		} else {
			setForm((prev) => ({
				...prev,
				[name]: value
			}));
		}

		if (name === "tel") {
			const onlyNums = value.replace(/\D/g, "");
			let formatted = "";

			if (onlyNums.length <= 3) {
				formatted = onlyNums;
			} else if (onlyNums.length <= 7) {
				formatted = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
			} else {
				formatted = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
			}

			setForm((prev) => ({
				...prev,
				fullName: {
					...prev.fullName,
					tel: formatted
				}
			}));

			setErrors((prev) => ({ ...prev, tel: "" })); // 에러 초기화
			return;
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { email, password, passwordConfirm, fullName } = form;

		if (
			!email.trim() ||
			!password.trim() ||
			!passwordConfirm.trim() ||
			!fullName.name.trim() ||
			!fullName.birth.trim() ||
			!fullName.gender.trim() ||
			!fullName.tel.trim()
		) {
			alert("모든 항목을 입력해주세요.");
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const newErrors: { [key: string]: string } = {};

		if (!emailRegex.test(email)) {
			newErrors.email = "*이메일 형식이 올바르지 않습니다.";
		}

		if (fullName.tel.replace(/\D/g, "").length !== 11) {
			newErrors.tel = "*전화번호를 정확히 입력해주세요.";
		}

		if (password !== passwordConfirm) {
			newErrors.passwordConfirm = "*비밀번호가 일치하지 않습니다.";
		}

		try {
			const ssno = fullName.birth + fullName.gender;
			const genderResult = getGender(ssno);

			if (genderResult === "Error") {
				newErrors.birth = "*주민등록번호 형식이 올바르지 않습니다.";
			}

			const gender = genderResult;
			const birthstr = ssno.substring(0, 6);
			const genderCode = ssno.charAt(6);
			const birthFull =
				parseInt(genderCode, 10) <= 2 ? `19${birthstr}` : `20${birthstr}`;
			const age = calculateAge(birthFull);
			const nickname = `크루${Math.floor(Math.random() * 1000 + 1)}`;

			if (Object.keys(newErrors).length > 0) {
				setErrors(newErrors);
				return;
			}

			const userInfo: UserInfo = {
				email,
				password,
				fullName: {
					name: fullName.name,
					tel: fullName.tel,
					gender,
					age,
					nickname
				}
			};

			console.log("회원 가입 요청 데이터", userInfo);

			const user = await registerUser(userInfo);

			if (user) {
				toast.success("회원 가입이 완료되었습니다!");
				navigate("/login");
			} else {
				toast.error("회원가입 실패");
			}
		} catch (error) {
			console.error("회원가입 중 오류 발생:", error);
			toast.warning("회원가입 중 오류가 발생했습니다.");
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="w-[460px] mx-auto flex flex-col text-[#333333]"
			>
				<img
					src={SignupLogo}
					alt="TripUs 로고"
					className="w-[278px] h-[106px] mx-auto mt-[60px] mb-[26px] cursor-pointer"
					onClick={() => navigate("/")}
				/>
				<div className="mb-[26px]">
					<div
						className="relative group"
						onMouseEnter={() => setHoveredField("name")}
						onMouseLeave={() => setHoveredField(null)}
					>
						<div className="absolute left-4 top-1/2 -translate-y-1/2 w-[20px] h-[20px]">
							<Icon
								size="24px"
								position={
									hoveredField === "name" ? "-21px -265px" : "-21px -239px"
								}
							/>
						</div>
						<input
							name="name"
							placeholder="이름"
							value={form.fullName.name}
							onChange={handleChange}
							className="inputProps"
						/>
					</div>
				</div>

				<div className="flex flex-col mb-[11px]">
					<div
						className="relative group"
						onMouseEnter={() => setHoveredField("birth")}
						onMouseLeave={() => setHoveredField(null)}
					>
						<div className="absolute left-4 top-1/2 -translate-y-1/2 w-[20px] h-[20px]">
							<Icon
								size="24px"
								position={
									hoveredField === "birth" ? "-53px -264px" : "-53px -238px"
								}
							/>
						</div>
						<input
							name="birth"
							placeholder="생년월일/성별"
							maxLength={6}
							value={form.fullName.birth}
							onChange={handleChange}
							className="inputBirth"
						/>

						<span className="w-[12px] text-center text-[#616161] text-[20px]">
							-
						</span>
						<input
							name="gender"
							maxLength={1}
							value={form.fullName.gender}
							onChange={handleChange}
							className="inputGender"
						/>
						{Array.from({ length: 6 }).map((_, i) => (
							<span
								key={i}
								className={`w-[16px] h-[16px] bg-[#616161] rounded-full inline-block ${
									i === 0 ? "ml-[10px]" : "ml-[5px]"
								} translate-y-[1px]`}
							/>
						))}
					</div>
					<p className="text-red-500 text-xs font-bold mt-[1px] h-[14px] leading-tight">
						{errors.birth ?? ""}
					</p>
				</div>
				<div className="flex flex-col mb-[11px]">
					<div
						className="relative group"
						onMouseEnter={() => setHoveredField("tel")}
						onMouseLeave={() => setHoveredField(null)}
					>
						<div className="absolute left-4 top-1/2 -translate-y-1/2 w-[20px] h-[20px]">
							<Icon
								size="24px"
								position={
									hoveredField === "tel" ? "-85px -266px" : "-85px -240px"
								}
							/>
						</div>
						<input
							name="tel"
							placeholder="전화번호"
							value={form.fullName.tel}
							onChange={handleChange}
							className="inputProps"
						/>
					</div>
					<p className="text-red-500 text-xs font-bold mt-[1px] h-[14px] leading-tight">
						{errors.tel ?? ""}
					</p>
				</div>
				<div className="flex flex-col mb-[11px]">
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
					<p className="text-red-500 text-xs font-bold mt-[1px] h-[14px] leading-tight">
						{errors.email ?? ""}
					</p>
				</div>
				<div className="mb-[26px]">
					<div
						className="relative group"
						onMouseEnter={() => setHoveredField("password")}
						onMouseLeave={() => setHoveredField(null)}
					>
						<div className="absolute left-4 top-1/2 -translate-y-1/2 w-[20px] h-[20px]">
							<Icon
								size="24px"
								position={
									hoveredField === "password"
										? "-150px -264px"
										: "-150px -238px"
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
				</div>
				<div className="flex flex-col mb-[11px]">
					<div
						className="relative group"
						onMouseEnter={() => setHoveredField("passwordConfirm")}
						onMouseLeave={() => setHoveredField(null)}
					>
						<div className="absolute left-4 top-1/2 -translate-y-1/2 w-[20px] h-[20px]">
							<Icon
								size="24px"
								position={
									hoveredField === "passwordConfirm"
										? "-150px -264px"
										: "-150px -238px"
								}
							/>
						</div>
						<input
							name="passwordConfirm"
							type="password"
							placeholder="비밀번호 확인"
							value={form.passwordConfirm}
							onChange={handleChange}
							className="inputProps"
						/>
					</div>
					<p className="text-red-500 text-xs font-bold mt-[1px] h-[14px] leading-tight">
						{errors.passwordConfirm ?? ""}
					</p>
				</div>
				<div className="mb-[26px]">
					<Button type="submit" className="w-full">
						회원가입
					</Button>
				</div>
				<div>
					<Button
						type="button"
						onClick={() => navigate("/")}
						reverse
						className="w-full border-[1px]"
					>
						취소
					</Button>
				</div>
			</form>
		</>
	);
}

import { useState } from "react";
import { registerUser } from "../apis/auth";
import { useNavigate } from "react-router";
import SignupLogo from "../assets/images/Signup_logo.svg";
import sprite from "../assets/images/sprite.png";

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
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (
			!form.email.trim() ||
			!form.password.trim() ||
			!form.passwordConfirm.trim() ||
			!form.fullName.name.trim() ||
			!form.fullName.birth.trim() ||
			!form.fullName.gender.trim() ||
			!form.fullName.tel.trim()
		) {
			alert("모든 항목을 입력해주세요.");
			return;
		}

		if (form.password !== form.passwordConfirm) {
			alert("비밀번호가 일치하지 않습니다!");
			return;
		}

		const ssno = form.fullName.birth + form.fullName.gender;
		const genderResult = getGender(ssno);

		if (genderResult === "Error") {
			alert("올바른 주민등록번호 형식이 아닙니다.");
			return;
		}

		const gender = genderResult;
		const birthstr = ssno.substring(0, 6);
		const genderCode = ssno.charAt(6);
		const birthFull =
			parseInt(genderCode, 10) <= 2 ? `19${birthstr}` : `20${birthstr}`;
		const age = calculateAge(birthFull);
		const nickname = `크루${Math.floor(Math.random() * 1000 + 1)}`;

		const userInfo: UserInfo = {
			email: form.email,
			password: form.password,
			fullName: {
				name: form.fullName.name,
				tel: form.fullName.tel,
				gender,
				age,
				nickname
			}
		};

		console.log("회원 가입 요청 데이터", userInfo);

		const user = await registerUser(userInfo);

		if (user) {
			alert("회원가입 성공!");
			navigate("/login");
		} else {
			alert("회원가입 실패");
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
					className="w-[278px] h-[106px] mx-auto mt-[60px] mb-[26px]"
				/>
				<div
					className="relative group"
					onMouseEnter={() => setHoveredField("name")}
					onMouseLeave={() => setHoveredField(null)}
				>
					<div
						className="iconProps"
						style={{
							backgroundImage: `url(${sprite})`,
							backgroundPosition:
								hoveredField === "name" ? "-21px -264px " : "-21px -238px"
						}}
					/>
					<input
						name="name"
						placeholder="이름"
						value={form.fullName.name}
						onChange={handleChange}
						className="inputProps"
					/>
				</div>

				<div
					className="relative group"
					onMouseEnter={() => setHoveredField("birth")}
					onMouseLeave={() => setHoveredField(null)}
				>
					<div
						className="iconProps"
						style={{
							backgroundImage: `url(${sprite})`,
							backgroundPosition:
								hoveredField === "birth" ? "-53px -264px " : "-53px -238px"
						}}
					/>
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
				<div
					className="relative group"
					onMouseEnter={() => setHoveredField("tel")}
					onMouseLeave={() => setHoveredField(null)}
				>
					<div
						className="iconProps"
						style={{
							backgroundImage: `url(${sprite})`,
							backgroundPosition:
								hoveredField === "tel" ? "-85px -266px " : "-85px -240px"
						}}
					/>
					<input
						name="tel"
						placeholder="전화번호"
						value={form.fullName.tel}
						onChange={handleChange}
						className="inputProps"
					/>
				</div>
				<div
					className="relative group"
					onMouseEnter={() => setHoveredField("email")}
					onMouseLeave={() => setHoveredField(null)}
				>
					<div
						className="iconProps"
						style={{
							backgroundImage: `url(${sprite})`,
							backgroundPosition:
								hoveredField === "email" ? "-117px -265px " : "-117px -239px"
						}}
					/>
					<input
						name="email"
						placeholder="이메일"
						value={form.email}
						onChange={handleChange}
						className="inputProps"
					/>
				</div>
				<div
					className="relative group"
					onMouseEnter={() => setHoveredField("password")}
					onMouseLeave={() => setHoveredField(null)}
				>
					<div
						className="iconProps"
						style={{
							backgroundImage: `url(${sprite})`,
							backgroundPosition:
								hoveredField === "password" ? "-150px -264px " : "-150px -238px"
						}}
					/>
					<input
						name="password"
						placeholder="비밀번호"
						value={form.password}
						onChange={handleChange}
						className="inputProps"
					/>
				</div>
				<div
					className="relative group"
					onMouseEnter={() => setHoveredField("passwordConfirm")}
					onMouseLeave={() => setHoveredField(null)}
				>
					<div
						className="iconProps"
						style={{
							backgroundImage: `url(${sprite})`,
							backgroundPosition:
								hoveredField === "passwordConfirm"
									? "-150px -264px "
									: "-150px -238px"
						}}
					/>
					<input
						name="passwordConfirm"
						placeholder="비밀번호 확인"
						value={form.passwordConfirm}
						onChange={handleChange}
						className="inputProps"
					/>
				</div>
				<button type="submit" className="firstButton">
					회원가입
				</button>
				<button
					type="button"
					onClick={() => navigate("/")}
					className="secondButton"
				>
					취소
				</button>
			</form>
		</>
	);
}

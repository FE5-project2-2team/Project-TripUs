import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import SignupLogo from "../assets/images/Signup_logo.svg";
import sprite from "../assets/images/sprite.png";
import { loginUser } from "../apis/auth";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
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

    try {
      const data = await loginUser(form.email, form.password);
      console.log("서버응답", data);

      if (data?.token) {
        login(data.token);
        alert("로그인 성공");
        navigate("/");
      } else {
        alert("로그인 실패: 토큰이 없습니다");
      }
    } catch (error) {
      alert("로그인 실패: 서버 오류");
      console.error(error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-[460px] mx-auto mt-10 flex flex-col gap-[26px] text-[#333333]"
      >
        <img
          src={SignupLogo}
          alt="TripUs 로고"
          className="w-[278px] h-[106px] mx-auto mt-[223px] mb-[26px]"
        />
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
                hoveredField === "email" ? "-117px -265px " : "-117px -239px",
            }}
          ></div>
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
                hoveredField === "password"
                  ? "-150px -264px "
                  : "-150px -238px",
            }}
          ></div>
          <input
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            className="inputProps"
          />
        </div>
        <button type="submit" className="firstButton">
          로그인
        </button>
        <button
          type="button"
          onClick={handleSignupClick}
          className="secondButton"
        >
          회원가입
        </button>
      </form>
    </>
  );
}

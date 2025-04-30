import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { loginUser } from "../apis/auth";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">로그인</button>
      </form>
    </>
  );
}

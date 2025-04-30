import { useState } from "react";
import { registerUser } from "../apis/auth";
import { useNavigate } from "react-router";

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
      //gender: "",
      birth: "",
      tel: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (["name", "gender", "birth", "tel"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        fullName: {
          ...prev.fullName,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }

    const ssno = form.fullName.birth;
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
        // birth: birthstr,
        tel: form.fullName.tel,
        gender,
        age,
        nickname,
      },
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
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="이름"
          value={form.fullName.name}
          onChange={handleChange}
        />
        <input
          name="birth"
          placeholder="생년월일 주민번호 첫번째 숫자"
          maxLength={7}
          value={form.fullName.birth}
          onChange={handleChange}
        />
        {/* <input
          name="gender"
          placeholder="성별"
          value={form.fullName.gender}
          onChange={handleChange}
        /> */}
        <input
          name="tel"
          placeholder="전화번호"
          value={form.fullName.tel}
          onChange={handleChange}
        />
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
        <input
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          value={form.passwordConfirm}
          onChange={handleChange}
        />
        <button type="submit">회원가입</button>
        <button type="button">취소</button>
      </form>
    </>
  );
}

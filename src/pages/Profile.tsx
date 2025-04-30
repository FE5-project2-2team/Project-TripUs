import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/axios";

// 닉네임
// 나이
// 성별
// 자기소개

// 버튼) 프로필 이미지 변경
// 버튼) 회원 정보 수정

export default function Profile() {
  const [profile, setProfile] = useState({
    nickname: "",
    gender: "",
    age: 0,
    tagList: "",
  });

  // 임시 기본 이미지
  const fixedImage = "https://i1.daumcdn.net/thumb/C276x260/?fname=https://blog.kakaocdn.net/dn/nvQVV/btrWREfREZ7/Dbo7BWTjM4ZV6lCdkv26lK/img.png" 

  const getUser = async () => {
    const { data } = await axiosInstance.get("/users/680b30b797519341ce9ddfb9");
    const fullNameParsed = JSON.parse(data.fullName);
    setProfile({
      nickname: fullNameParsed.nickname,
      gender: fullNameParsed.gender,
      age: fullNameParsed.age,
      tagList: fullNameParsed.tagList,
    });
    console.log(data);
  };

  const handleUpdate = async () => {
    const updatedFullName = JSON.stringify({
      gender: profile.gender,
      age: profile.age,
      nickname: profile.nickname,
      tagList: profile.tagList,
    });

    try {
      await axiosInstance.put("/settings/update-user", {
        fullName: updatedFullName,
      });
      alert("프로필이 업데이트 되었습니다!");
    } catch (err) {
      console.log(err);
      alert("프로필 업데이트 실패");
    }
  };

  useEffect(() => {
    getUser();
  }, []);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <img
          src={fixedImage}
          alt="프로필 이미지"
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />

        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          프로필 사진 변경
        </button>

        <div className="text-center space-y-2">
          <p>성별: {profile.gender}</p>
          <p>나이: {profile.age}</p>
          <p>닉네임: {profile.nickname}</p>
          <p>태그: {profile.tagList}</p>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium">닉네임</label>
        <input
          type="text"
          value={profile.nickname}
          onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
          className="border rounded w-full px-2 py-1"
        />

        <label className="block text-sm font-medium mt-2">태그</label>
        <input
          type="text"
          value={profile.tagList}
          onChange={(e) => setProfile({ ...profile, tagList: e.target.value })}
          className="border rounded w-full px-2 py-1"
        />

        <button
          onClick={handleUpdate}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          수정하기
        </button>
      </div>
    </div>
  );
}
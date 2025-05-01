import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/axios";
import { useAuthStore } from "../store/authStore";

export default function Profile() {
  // 임시 기본 이미지
  const fixedImage = "https://i1.daumcdn.net/thumb/C276x260/?fname=https://blog.kakaocdn.net/dn/nvQVV/btrWREfREZ7/Dbo7BWTjM4ZV6lCdkv26lK/img.png" 

  const [profile, setProfile] = useState<Profile>({
    nickname: "",
    gender: "",
    age: 0,
    tagList: [],
  });

  const [editProfile, setEditProfile] = useState<Profile>({
    nickname: "",
    gender: "",
    age: 0,
    tagList: [],
  });

  // 태그 삭제
  const handleRemoveTag = (indexToRemove: number) => {
    setEditProfile((prev) => ({
      ...prev,
      tagList: prev.tagList.filter((_, i) => i !== indexToRemove),
    }));
  };

  const getUser = async () => {
    try {
      const { data } = await axiosInstance.get(
        "/users/680b30b797519341ce9ddfb9"
      );
      const fullNameParsed = JSON.parse(data.fullName);

      const newProfile = ({
        nickname: fullNameParsed.nickname,
        gender: fullNameParsed.gender,
        age: fullNameParsed.age,
        tagList: fullNameParsed.tagList,
      });

      setProfile(newProfile);
      setEditProfile(newProfile);
    } catch (error) {
      console.error("유저 정보를 불러오는 데 실패했습니다:", error);
    }
  };

  const handleUpdate = async () => {
    const token = useAuthStore.getState().accessToken;
    console.log("token:", token);

    const updatedFullName = JSON.stringify({
      gender: editProfile.gender,
      age: editProfile.age,
      nickname: editProfile.nickname,
      tagList: editProfile.tagList,
    });

    try {
      const response = await axiosInstance.put("/settings/update-user", {
        fullName: updatedFullName,
      });
      console.log("업데이트 성공:", response.data);
      setProfile(editProfile);
      alert("프로필이 업데이트 되었습니다!");
    } catch (err) {
      console.error("업데이트 실패:", err);
      alert("프로필 업데이트 실패");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
      <button
        className="mt-4 bg-[#06B796] text-white px-4 py-2 rounded mb-10"
      >
        회원정보 수정
      </button>

      {/* 흰칸 내부 */}
      <div className="bg-white p-6 rounded-lg shadow-md w-[1062px]">
        <div className="flex flex-col items-center justify-center">
          <img
            src={fixedImage}
            alt="프로필 이미지"
            className="w-[160px] h-[160px] rounded-full mx-auto object-cover"
          />

          <button
            className="my-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            프로필 사진 변경
          </button>
        </div>

        <div className="text-center space-y-2">
          <p>성별: {profile.gender}</p>
          <p>나이: {profile.age}</p>
          <p>닉네임: {profile.nickname}</p>
          {/* 태그 뱃지*/}
          <div className="flex justify-center gap-2 mb-2">
            {profile.tagList.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 수정 영역 */}
      <div className="mt-4 w-80">
        <label className="block text-sm font-medium">닉네임</label>
        <input
          type="text"
          value={editProfile.nickname}
          onChange={(e) => setEditProfile({ ...editProfile, nickname: e.target.value })}
          className="border rounded w-full px-2 py-1"
        />

        <label className="block text-sm font-medium mt-2">자기소개 키워드</label>
        <input
          type="text"
          placeholder="태그를 입력 후 Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.nativeEvent.isComposing === false && e.currentTarget.value.trim() !== "") {
              e.preventDefault();
              // 태그 리스트 추가 
              setEditProfile({
                ...editProfile,
                tagList: [...editProfile.tagList, e.currentTarget.value.trim()],
              });

              e.currentTarget.value = "";
            }
          }}
          className="border rounded w-full px-2 py-1"
        />

        {/* 뱃지로 보여주기 */}
        <div className="flex gap-2 mb-2">
          {editProfile.tagList.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(index)}
                className="ml-1 text-red-500 hover:text-red-700"
              >
                x
              </button>
            </span>
          ))}
        </div>

        <button
          onClick={handleUpdate}
          className="mt-4 bg-[#06B796] text-white px-4 py-2 rounded"
        >
          확인
        </button>

        <button
          onClick={() => setEditProfile(profile)}
          className="mt-4 ml-4 bg-white text-[#06B796] outline-1 outline-offset-0 outline-[#06B796] px-4 py-2 rounded"
        >
          취소
        </button>
      </div>
    </div>
  );
}

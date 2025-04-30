import React, { useState, useEffect } from "react";
import axios from "axios";

// 사용자 정보 타입 정의
interface UserInfo {
  gender: string;
  age: number;
  nickname: string;
  tagList: string;
}

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // 컴포넌트가 마운트될 때 API 요청
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await axios.get("/users/680b30b797519341ce9ddfb9");
        const profile = JSON.parse(data.fullName);
        setUserInfo(profile);  // 받아온 데이터를 상태에 저장
      } catch (error) {
        console.log("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      {userInfo ? (
        <div>
          <h2>Profile</h2>
          <p>Gender: {userInfo.gender}</p>
          <p>Age: {userInfo.age}</p>
          <p>Nickname: {userInfo.nickname}</p>
          <p>TagList: {userInfo.tagList}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;

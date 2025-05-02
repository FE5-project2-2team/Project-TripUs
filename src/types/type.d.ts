interface UserInfo {
  email: string;
  password: string;
  fullName: User;
}

interface User {
  name: string;
  age: number;
  gender: string;
  tel: string;
  nickname: string;
}

interface UpdatedUserData {
  profile?: Partial<User>;
  tagList?: string[];
}

interface NotiType {
  notificationType: "COMMENT" | "LIKE" | "MESSAGE";
  notificationTypeId: string;
  userId: string;
  postId: string | null;
}

interface Post {
  title: string;
  image: File | null;
  channelId: string;
  postId?: string;
  imageToDeletePublicId?: string;
}

interface PostData {
  title: string;
  memberLimit: number;
  memberList: string[];
  location: string;
  dateRange: Date[];
  isRecruiting: boolean;
  recruitCondition: RecruitCondition;
  contents: string;
}

type RecruitCondition = {
  gender: string;
  ageRange: string[];
};

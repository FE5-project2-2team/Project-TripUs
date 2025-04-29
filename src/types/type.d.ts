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

interface Post {
  title: string;
  image: File | null;
  channelId: string;
  postId?: string;
  imageToDeletePublicId?: string;
}

interface NotiType {
  notificationType: "COMMENT" | "LIKE" | "MESSAGE";
  notificationTypeId: string;
  userId: string;
  postId: string | null;
}

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

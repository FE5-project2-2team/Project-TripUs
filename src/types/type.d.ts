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

interface Profile {
	name: string;
	tel: string;
	nickname: string;
	gender: string;
	age: number;
	tagList: string[];
	image: string;
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

interface PostData {
	title: string;
	memberLimit: number;
	memberList: string[];
	applicantList: string[];
	location: string;
	dateRange: Date[];
	isRecruiting: boolean;
	recruitCondition: RecruitCondition;
	description: string;
	contents: Delta | undefined;
}

interface NotiType {
	notificationType: "COMMENT" | "LIKE" | "MESSAGE";
	notificationTypeId: string;
	userId: string;
	postId: string | null;
}

interface UserInChannel {
	posts: Post[];
	//likes:Like[];
	_id: string;
	fullName: User;
	username: string | null;
	image: string;
	imagePublicId: string;
}
interface PostInChannel {
	_id: string;
	image: string;
	title: PostData;
	channel: Channel; //id필요한거면 channelId로 대체
	author: UserInChannel; //
	createdAt: string; //
}
interface Channel {
	_id: string;
	name: string;
	description: string;
	authRequired: boolean;
	posts: string[];
}

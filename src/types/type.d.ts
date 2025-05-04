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

interface PostUpdateData {
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
	images: string[];
}

type RecruitCondition = {
	gender: string;
	ageRange: string[];
};

interface Post {
	likes: Like[];
	comments: Comment[];
	_id: string;
	image?: string;
	imagePublicId?: string;
	title: string;
	channel: Channel;
	author: UserData;
	createdAt: string;
	updatedAt: string;
}

interface UserData {
	coverImage: string;
	image: string;
	role: string;
	isOnline: boolean;
	posts: Post[];
	likes: Like[];
	comments: string[];
	followers: [];
	following: [];
	notifications: Notification[];
	messages: Message[];
	_id: string;
	fullName: string;
	email: string;
	createdAt: string;
	updatedAt: string;
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
	location: string;
	dateRange: Date[];
	isRecruiting: boolean;
	recruitCondition: string[];
	contents: string;
}

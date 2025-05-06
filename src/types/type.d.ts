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
	age: number;
	gender: string;
	tel: string;
	nickname: string;
	tagList: string[];
	image: string;
}

interface UserUpdateData {
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

interface PostDetail {
	title: string;
	memberLimit: number;
	memberList: string[];
	location: string;
	dateRange: Date[];
	isRecruiting: boolean;
	recruitCondition: {
		gender: string;
		ageRange: string[];
	};
	description: string;
	contents: Delta | undefined;
}

interface NotiType {
	notificationType: "COMMENT" | "LIKE" | "MESSAGE";
	notificationTypeId: string;
	userId: string;
	postId: string | null;
}

//API Response
interface UserData {
	coverImage: string;
	image: string;
	role: string;
	isOnline: boolean;
	posts: PostData[];
	likes: LikeData[];
	comments: string[];
	notifications: Notification[];
	messages: Message[];
	_id: string;
	fullName: string;
	email: string;
	createdAt: string;
	updatedAt: string;
}

interface ChannelData {
	posts: string[];
	_id: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
}

interface PostData {
	likes: Like[];
	comments: CommentData[];
	_id: string;
	image?: string;
	imagePublicId?: string;
	title: string;
	channel: ChannelData;
	author: UserData;
	createdAt: string;
	updatedAt: string;
}

interface LikeData {
	_id: string;
	user: string;
	post: string;
	createdAt: string;
	updatedAt: string;
}

interface CommentData {
	_id: string;
	comment: string;
	author: UserData;
	post: string;
	createdAt: string;
	updatedAt: string;
}

interface NotiData {
	seen: boolean;
	_id: string;
	author: UserData;
	user: UserData | string;
	post: string | null; // 포스트 id
	follow?: string; // 사용자 id
	comment?: CommentData;
	message?: string; // 메시지 id
	createdAt: string;
	updatedAt: string;
}

interface ConversationData {
	_id: string[];
	message: string;
	sender: UserData;
	receiver: UserData;
	seen: boolean;
	createdAt: string;
}

interface MessageData {
	_id: string;
	message: string;
	sender: UserData;
	receiver: UserData;
	seen: boolean;
	createdAt: string;
	updatedAt: string;
}

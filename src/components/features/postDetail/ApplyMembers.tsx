import { updatePost } from "../../../apis/post";
import ProfileImage from "../../commons/ProfileImage";

export default function ApplyMembers({
	applicants,
	postInfo,
	postData,
	deleteApplicant,
	addMember
}: {
	applicants: CommentData[];
	postInfo: PostDetail;
	postData: PostData;
	deleteApplicant: (userId: string) => void;
	addMember: (newMember: string) => void;
}) {
	const approveHandler = async (applicant: UserData) => {
		try {
			const newData: PostDetail = { ...postInfo };
			newData.applicantList.push(applicant._id);
			newData.memberList.push(applicant._id);
			const formData = new FormData();
			formData.append("title", JSON.stringify(newData));
			formData.append("channelId", postData.channel._id);
			formData.append("postId", postData._id);
			await updatePost(formData);
			deleteApplicant(applicant._id);
			addMember(applicant._id);
		} catch (error) {
			console.error(error);
		}
	};

	const rejectHandler = async (userId: string) => {
		try {
			const newData: PostDetail = { ...postInfo };
			newData.applicantList.push(userId);
			const formData = new FormData();
			formData.append("title", JSON.stringify(newData));
			formData.append("channelId", postData.channel._id);
			formData.append("postId", postData._id);
			await updatePost(formData);
			deleteApplicant(userId);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div className="flex flex-col gap-4">
			{applicants.length !== 0 && (
				<div>
					<span className="post-sub-title inline">승인 대기 멤버</span>
					<span className="sub_title_number">{applicants.length}</span>
				</div>
			)}

			{applicants.map((applicant) => {
				const userInfo: Profile = JSON.parse(applicant.author.fullName);
				return (
					<div className="relative text-sm items-center" key={applicant._id}>
						<div className="flex gap-2 mr-[50px]">
							<ProfileImage
								userId={applicant.author._id}
								image={applicant.author.image}
							/>
							<div className="flex flex-col">
								<span>{userInfo.nickname}</span>
								<span>{userInfo.name}</span>
							</div>
						</div>
						<div className="absolute left-60 top-3">
							<button
								onClick={() => approveHandler(applicant.author)}
								className="handleApply bg-[#06b796] hover:bg-[#038383] mr-2"
							>
								승인
							</button>
							<button
								onClick={() => rejectHandler(applicant.author._id)}
								className="handleApply bg-[#FD346E] hover:bg-[#E11D48]"
							>
								거절
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
}

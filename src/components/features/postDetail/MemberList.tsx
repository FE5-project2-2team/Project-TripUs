import ProfileImage from "../../commons/ProfileImage";

export default function MemberList({ members }: { members: UserData[] }) {
	return (
		<div>
			<div className="mb-4">
				<span className="post-sub-title inline">참여 멤버</span>
				<span className="sub_title_number">{members.length}</span>
			</div>
			<ul className="flex gap-[10px]">
				{members.map((member) => {
					const parsed: Profile = JSON.parse(member.fullName);
					return (
						<li key={member._id} className="flex flex-col gap-1 items-center">
							<ProfileImage userId={member._id} image={member.image} />
							<span className="text-sm">{parsed.nickname}</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

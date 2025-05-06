interface ProfileViewProps {
  profile: Profile;
  image: string;
}

export default function ProfileView ({ profile, image }: ProfileViewProps) {
    return (
        <div className="flex flex-col justify-center w-[1062px]">
			<div className="h-[auto] text-center space-y-[14px]">
				<img
					src={image}
					alt="프로필 이미지"
					className="w-[160px] h-[160px] rounded-full mx-auto mb-[20px] object-cover"
				/>
				{/* 유저 프로필 정보 */}
				<p className="text-[18px] font-medium">
					{profile.nickname}({profile.name})님
				</p>
				<div className="flex justify-center gap-x-[3px]">
					<p className="text-[16px]">{profile.age}</p>
					<p className="text-[16px]">{profile.gender}</p>
				</div>
				{/* 태그 뱃지*/}
				<div className="flex flex-wrap justify-center gap-[14px] m-0 px-[50px]">
					{profile.tagList?.map((tag, index) => (
						<span
							key={index}
							className="inline-flex items-center justify-center w-[auto] h-[35px] bg-[#F3F4F6] text-[#06b796] px-[12px] py-[4px] rounded-[8px]"
						>
							{tag}
						</span>
					))}
				</div>
			</div>
		</div>
    );
}
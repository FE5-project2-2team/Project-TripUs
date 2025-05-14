import parse from "html-react-parser";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { formatDate, getDiffInDays } from "../../../utils/date";
import Icon from "../../commons/Icon";

export default function TravelInfo({
	isRecruitChannel,
	postInfo
}: {
	isRecruitChannel: boolean;
	postInfo: PostDetail;
}) {
	const converter = new QuillDeltaToHtmlConverter(postInfo.contents.ops, {});
	const html = converter.convert();
	const days = getDiffInDays(postInfo.dateRange[0], postInfo.dateRange[1]);

	return (
		<>
			<div>
				<span className="post-sub-title">
					여행 {isRecruitChannel ? "소개" : "후기"}
				</span>
				<div className="contents-wrapper">{parse(html)}</div>
			</div>
			<div>
				<span className="post-sub-title">여행 일정</span>
				<div className="flex flex-col gap-4 py-5 px-4 bg-[#F9F9F9] rounded-[15px] text-[#616161]">
					<span className="flex items-center gap-[10px]">
						<Icon position="35.808% 20.604%" size="16px" />
						{postInfo.dateRange
							.map((date) => formatDate(new Date(date)))
							.join(" - ")}
						<span>({days}일)</span>
					</span>
					<span className="flex items-center gap-[10px]">
						<Icon position="45.923% 20.604%" size="16px" />
						<span className="relative bottom-[2px]">{postInfo.location}</span>
					</span>
					{isRecruitChannel && (
						<span className="flex items-center gap-[10px]">
							<Icon position="15.419% 20.765%" size="18px" />
							<span className="relative bottom-[2px]">
								{postInfo.memberLimit} 명
							</span>
						</span>
					)}
				</div>
			</div>
		</>
	);
}

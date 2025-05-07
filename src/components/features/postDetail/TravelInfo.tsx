import parse from "html-react-parser";
import Delta from "quill-delta";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { formatDate } from "../../../utils/date";
import Icon from "../../commons/Icon";

export default function TravelInfo({
	contents,
	dateRange,
	location
}: {
	contents: Delta;
	dateRange: Date[];
	location: string;
}) {
	const converter = new QuillDeltaToHtmlConverter(contents.ops, {});
	const html = converter.convert();
	return (
		<>
			<div>
				<span className="post-sub-title">여행 소개</span>
				<span>{parse(html)}</span>
			</div>
			<div>
				<span className="post-sub-title">여행 일정</span>
				<div className="flex flex-col gap-4 py-5 px-4 bg-[#F9F9F9] rounded-[15px] text-[#616161]">
					<span className="flex items-center gap-[10px]">
						<Icon position="35.808% 20.604%" size="16px" />
						{dateRange.map((date) => formatDate(new Date(date))).join(" - ")}
					</span>
					<span className="flex items-center gap-[10px]">
						<Icon position="45.923% 20.604%" size="16px" />
						{location}
					</span>
				</div>
			</div>
		</>
	);
}

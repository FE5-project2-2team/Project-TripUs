import { formatDate } from "../../../utils/date";

export default function TravelInfo({
	contents,
	dateRange,
	location
}: {
	contents: string;
	dateRange: Date[];
	location: string;
}) {
	return (
		<>
			<div>
				<span className="post-sub-title">여행 소개</span>
				<span>{contents}</span>
			</div>
			<div>
				<span className="post-sub-title">여행 일정</span>
				<div className="py-5 px-4 bg-[#F9F9F9] rounded-[15px] text-[#616161]">
					<span className="block">
						{dateRange.map((date) => formatDate(new Date(date))).join(" - ")}
					</span>
					<span>{location}</span>
				</div>
			</div>
		</>
	);
}

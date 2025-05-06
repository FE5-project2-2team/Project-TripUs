import { Korean } from "flatpickr/dist/l10n/ko.js";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { CHANNELS } from "../../../constants/posts";
import LabelSelect from "./LabelSelect";

interface Props {
	inputs: {
		channel: {
			value: string;
			onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
		};
		member: {
			value: string;
			onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
		};
		location: {
			value: string;
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		};
	};
	onDateChange: (selctedDates: Date[]) => void;
	dateRange: Date[];
}

export default function InfoForm({ inputs, onDateChange, dateRange }: Props) {
	const { channel, member, location } = inputs;
	return (
		<div className="grid grid-cols-2 gap-15">
			<LabelSelect
				name="channel"
				label="게시판 선택"
				id="selectChannel"
				{...channel}
			>
				<option value={CHANNELS.RECRUITMENT}>동행원 모집</option>
				<option value={CHANNELS.REVIEW}>여행 후기글</option>
			</LabelSelect>
			<LabelSelect name="member" label="인원" id="recruitMember" {...member}>
				{Array.from({ length: 9 }, (_, idx) => idx + 2).map((num) => (
					<option key={num} value={num}>
						{num}
					</option>
				))}
			</LabelSelect>
			<div>
				<label htmlFor="location" className="post-input-title">
					지역 입력
				</label>
				<input
					id="location"
					name="location"
					type="text"
					placeholder="지역 입력"
					className="input-style placeholder:text-[#CDCDCD]"
					{...location}
				/>
			</div>
			<div>
				<label htmlFor="date" className="post-input-title">
					일정 선택
				</label>
				<Flatpickr
					id="date"
					className="input-style placeholder:text-[#CDCDCD]"
					options={{
						mode: "range",
						dateFormat: "Y-m-d",
						closeOnSelect: false,
						locale: Korean
					}}
					value={dateRange}
					onChange={onDateChange}
					placeholder="일정 선택"
				/>
			</div>
		</div>
	);
}

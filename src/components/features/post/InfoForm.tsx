import { Korean } from "flatpickr/dist/l10n/ko.js";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { useController, useFormContext } from "react-hook-form";
import { CHANNELS } from "../../../constants/posts";
import LabelSelect from "./LabelSelect";

export default function InfoForm() {
	const { register, control } = useFormContext();
	const { field } = useController({
		name: "dateRange",
		control: control
	});
	return (
		<div className="grid grid-cols-2 gap-15">
			<LabelSelect name="channel" label="게시판 선택">
				<option value={CHANNELS.RECRUITMENT}>동행원 모집</option>
				<option value={CHANNELS.REVIEW}>여행 후기글</option>
			</LabelSelect>
			<LabelSelect name="member" label="인원">
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
					type="text"
					placeholder="지역 입력"
					autoComplete="off"
					className="input-style placeholder:text-[#CDCDCD]"
					{...register("location", {
						required: "지역을 입력해주세요"
					})}
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
					placeholder="일정 선택"
					onChange={(selectedDates) => {
						if (selectedDates.length < 2) {
							document.getElementById("date")?.focus();
						}
						field.onChange(selectedDates);
					}}
					value={field.value}
				/>
			</div>
		</div>
	);
}

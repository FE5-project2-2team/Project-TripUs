import { Korean } from "flatpickr/dist/l10n/ko.js";
import "flatpickr/dist/themes/material_green.css";
import { useState } from "react";
import Flatpickr from "react-flatpickr";
import { useController, useFormContext, useWatch } from "react-hook-form";
import { CHANNELS } from "../../../constants/posts";
import AutoComplete from "./AutoComplete";
import LabelSelect from "./LabelSelect";

export default function InfoForm({ type }: { type: string }) {
	const { register, control } = useFormContext();
	const { field } = useController({
		name: "dateRange",
		control: control,
		rules: { required: "일정을 선택해주세요" }
	});
	const watchedChannel = useWatch({
		control,
		name: "channel"
	});
	const [isFocused, setIsFocused] = useState(false);
	return (
		<div className="grid grid-cols-2 gap-15">
			<LabelSelect type={type} name="channel" label="게시판 선택">
				<option value={CHANNELS.RECRUITMENT}>동행원 모집</option>
				<option value={CHANNELS.REVIEW}>여행 후기글</option>
			</LabelSelect>
			{watchedChannel === CHANNELS.RECRUITMENT ? (
				<LabelSelect name="member" label="인원">
					{Array.from({ length: 9 }, (_, idx) => idx + 2).map((num) => (
						<option key={num} value={num}>
							{num}
						</option>
					))}
				</LabelSelect>
			) : (
				<div />
			)}
			<div className="relative flex flex-col items-start">
				<label htmlFor="location" className="post-input-title">
					지역 입력
				</label>
				<input
					id="location"
					type="text"
					placeholder="지역 입력"
					autoComplete="off"
					className="input-style placeholder:text-[#CDCDCD] focus:outline-0"
					{...register("location", {
						required: "지역을 입력해주세요",
						pattern: {
							value: /[A-Za-z가-힣]/,
							message: "지역은 영문 대소문자 또는 한글만 입력 가능합니다"
						}
					})}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>
				{isFocused && <AutoComplete />}
			</div>
			<div className="flex flex-col items-start">
				<label htmlFor="date" className="post-input-title">
					일정 선택
				</label>
				<Flatpickr
					id="date"
					className="input-style placeholder:text-[#CDCDCD] focus:outline-0"
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

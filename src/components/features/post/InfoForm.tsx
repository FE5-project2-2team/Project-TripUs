import { Korean } from "flatpickr/dist/l10n/ko.js";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { useController, useFormContext, useWatch } from "react-hook-form";
import { CHANNELS } from "../../../constants/posts";
import LabelSelect from "./LabelSelect";

export default function InfoForm() {
	const { register, control } = useFormContext();
	const countries = [
		"일본",
		"프랑스",
		"이탈리아",
		"미국",
		"태국",
		"호주",
		"스페인",
		"영국",
		"캐나다",
		"독일",
		"대한민국",
		"터키",
		"네덜란드",
		"스위스",
		"포르투갈",
		"아랍에미리트",
		"그리스",
		"오스트리아",
		"멕시코",
		"베트남"
	];
	const { field } = useController({
		name: "dateRange",
		control: control
	});
	const watchedChannel = useWatch({
		control,
		name: "channel"
	});
	return (
		<div className="grid grid-cols-2 gap-15">
			<LabelSelect name="channel" label="게시판 선택">
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
					list="locationOption"
				/>
				<datalist id="locationOption">
					{countries.map((country) => (
						<option key={country} value={country} />
					))}
				</datalist>
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

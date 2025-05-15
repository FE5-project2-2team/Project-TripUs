import { Korean } from "flatpickr/dist/l10n/ko.js";
import "flatpickr/dist/themes/material_green.css";
import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import { useController, useFormContext, useWatch } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { CHANNELS } from "../../../constants/posts";
import Confirm from "../../commons/Confirm";
import AutoComplete from "./AutoComplete";
import LabelSelect from "./LabelSelect";

export default function InfoForm({
	type,
	confirmHandler
}: {
	type: string;
	confirmHandler: () => void;
}) {
	const { register, reset, setValue, control } = useFormContext();
	const [modalOpen, setModalOpen] = useState(false);
	const { field } = useController({
		name: "dateRange",
		control: control
	});
	const watchedChannel = useWatch({
		control,
		name: "channel"
	});

	const changeChannelHandler = () => {
		reset({
			channel: watchedChannel,
			member: "2",
			location: "",
			dateRange: [],
			title: "",
			contents: "",
			description: "",
			condition: {
				gender: "",
				ageRange: []
			},
			images: []
		});
		setModalOpen(false);
		confirmHandler();
	};

	const cancelHandler = () => {
		if (watchedChannel === CHANNELS.RECRUITMENT) {
			setValue("channel", CHANNELS.REVIEW);
		} else {
			setValue("channel", CHANNELS.RECRUITMENT);
		}
	};

	const [isFocused, setIsFocused] = useState(false);
	useEffect(() => {
		if (!watchedChannel || type === "edit") return;
		setModalOpen((state) => !state);
	}, [watchedChannel, reset, type]);
	return (
		<>
			{modalOpen && (
				<>
					<div className="fixed inset-0 bg-black opacity-30 z-50" />
					<Confirm
						confirmHandler={changeChannelHandler}
						cancelHandler={cancelHandler}
						title="게시판을 변경하시겠습니까?"
						description="작성 중인 내용이 모두 삭제됩니다."
						confirmBtn="변경"
					/>
				</>
			)}
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
						className={twMerge(
							"input-style placeholder:text-[#CDCDCD] focus:outline-0",
							"dark:placeholder:text-[#616161] dark:border-[#616161]"
						)}
						{...register("location")}
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
						className={twMerge(
							"input-style placeholder:text-[#CDCDCD] focus:outline-0",
							"dark:placeholder:text-[#616161] dark:border-[#616161]"
						)}
						options={{
							mode: "range",
							dateFormat: "Y-m-d",
							closeOnSelect: false,
							locale: Korean,
							position: "below right"
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
		</>
	);
}

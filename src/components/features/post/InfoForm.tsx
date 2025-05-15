import { Korean } from "flatpickr/dist/l10n/ko.js";
import "flatpickr/dist/themes/material_green.css";
import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import { useController, useFormContext, useWatch } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { CHANNELS } from "../../../constants/posts";
import useConfirm from "../../../hooks/useConfirm";
import Confirm from "../../commons/Confirm";
import AutoComplete from "./AutoComplete";
import LabelSelect from "./LabelSelect";

export default function InfoForm({
	isEditing,
	confirmHandler
}: {
	isEditing: boolean;
	confirmHandler: () => void;
}) {
	const { register, reset, setValue, control } = useFormContext();
	const { confirmOpen, toggleConfirm } = useConfirm();

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
		toggleConfirm();
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
		if (!watchedChannel || isEditing) return;
		toggleConfirm();
	}, [watchedChannel, reset, isEditing]);
	return (
		<>
			{confirmOpen && (
				<Confirm
					confirmHandler={changeChannelHandler}
					cancelHandler={cancelHandler}
					title="게시판을 변경하시겠습니까?"
					description="작성 중인 내용이 모두 삭제됩니다."
					confirmBtn="변경"
				/>
			)}
			<div className="grid grid-cols-2 gap-15">
				<LabelSelect isEditing={isEditing} name="channel" label="게시판 선택">
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
					<label
						htmlFor="location"
						className={twMerge(
							"post-input-title",
							isEditing && "text-[#aaaaaa]"
						)}
					>
						지역 입력
					</label>
					<input
						disabled={isEditing}
						id="location"
						type="text"
						placeholder="지역 입력"
						autoComplete="off"
						className={twMerge(
							"input-style placeholder:text-[#CDCDCD] focus:outline-0",
							"dark:placeholder:text-[#616161] dark:border-[#616161]",
							"disabled:text-[#aaaaaa]"
						)}
						{...register("location")}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
					/>
					{isFocused && <AutoComplete />}
				</div>
				<div className="flex flex-col items-start">
					<label
						htmlFor="date"
						className={twMerge(
							"post-input-title",
							isEditing && "text-[#aaaaaa]"
						)}
					>
						일정 선택
					</label>
					<Flatpickr
						disabled={isEditing}
						id="date"
						className={twMerge(
							"input-style placeholder:text-[#CDCDCD] focus:outline-0",
							"dark:placeholder:text-[#616161] dark:border-[#616161]",
							"disabled:cursor-default! disabled:text-[#aaaaaa]"
						)}
						options={{
							mode: "range",
							dateFormat: "Y-m-d",
							closeOnSelect: false,
							locale: Korean,
							position: "below right",
							...(watchedChannel === CHANNELS.RECRUITMENT
								? { minDate: "today" }
								: { maxDate: "today" })
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

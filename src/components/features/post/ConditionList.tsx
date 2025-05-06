import { CONDITIONS } from "../../../constants/posts";
import InputBtn from "./InputBtn";

export default function ConditionList({
	conditionHandler
}: {
	conditionHandler: (
		e: React.ChangeEvent<HTMLInputElement>,
		type: string
	) => void;
}) {
	return (
		<div>
			<span className="post-input-title mb-4">동행조건</span>
			<fieldset className="mb-[30px]">
				<legend className="mb-[10px]">성별 (단일 선택)</legend>
				{CONDITIONS.GENDERS.map((gender) => (
					<InputBtn
						key={gender}
						type="radio"
						onChange={(e) => conditionHandler(e, "radio")}
						value={gender}
						name="gender"
					>
						{gender}
					</InputBtn>
				))}
			</fieldset>
			<fieldset>
				<legend className="mb-[10px]">나이 (다중 선택 가능)</legend>
				{CONDITIONS.AGES.map((age, index) => (
					<InputBtn
						key={index}
						type="checkbox"
						onChange={(e) => conditionHandler(e, "checkbox")}
						value={age}
						name="ageRange"
					>
						{age}
						{index === 4 && "+"}
					</InputBtn>
				))}
			</fieldset>
		</div>
	);
}

import ReactQuill from "react-quill-new";

export const validateForm = ({
	title,
	location,
	dateRange,
	condition,
	contents
}: {
	title: string;
	location: string;
	dateRange: Date[];
	condition: {
		gender: string;
		ageRange: string[];
	};
	contents: React.RefObject<ReactQuill | null>;
}) => {
	if (!location) return "지역을 입력해주세요";
	if (dateRange.length < 2) return "일정을 선택해주세요";
	if (!title) return "제목을 입력해주세요";
	if (contents.current) {
		if (contents.current.getEditor().getText().trim().length < 10) {
			return "내용을 최소 10자 이상 입력해주세요";
		} else if (contents.current.getEditor().getText().trim().length > 1000) {
			return "1000자 이상 입력할 수 없습니다";
		}
	}
	if (!condition.gender) return "성별을 선택해주세요";
	if (!condition.ageRange.length) return "연령을 선택해주세요";
	return null;
};

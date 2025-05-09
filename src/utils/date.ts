export const formatDate = (date: Date) => {
	const month = (date.getMonth() + 1).toString();
	const day = date.getDate().toString();
	return `${date.getFullYear()}-${month.length === 1 ? `0${month}` : month}-${
		day.length === 1 ? `0${day}` : day
	}`;
};

export const formatTime = (date: Date) => {
	const hours = date.getHours().toString();
	const minutes = date.getMinutes().toString();
	return `${hours.length === 1 ? `0${hours}` : hours}-${minutes.length === 1 ? `0${minutes}` : minutes}`;
};

export const getDiffInDays = (date1: string, date2: string) => {
	const oneDayMs = 1000 * 60 * 60 * 24;
	let diff = oneDayMs;
	if (date2) {
		diff = new Date(date2).getTime() - new Date(date1).getTime();
	}
	return Math.floor(diff / oneDayMs);
};

export function formatDateRange(dateRangeInput: unknown): string {
	const dateRange = String(dateRangeInput);
	const matches = dateRange.match(
		/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/g
	);
	if (!matches || matches.length !== 2) return "잘못된 날짜";
	const [start, end] = matches;
	const format = (dateStr: string) => {
		const date = new Date(dateStr);
		const yy = String(date.getFullYear()).slice(2);
		const mm = String(date.getMonth() + 1).padStart(2, "0");
		const dd = String(date.getDate()).padStart(2, "0");
		return `${yy}.${mm}.${dd}`;
	};
	return `${format(start)} - ${format(end)}`;
}

export const formatDate = (date: Date) => {
	const month = date.getMonth().toString();
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

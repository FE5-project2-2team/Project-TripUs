import { twMerge } from "tailwind-merge";
export default function Icon({
	position,
	size
}: {
	position: string;
	size: string;
}) {
	return (
		<div className={twMerge("sprite", position, `w-[${size}] h-[${size}]`)} />
	);
}

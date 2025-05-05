import { twMerge } from "tailwind-merge";
import sprite from "../../assets/images/sprite2.png";
export default function Icon({ position }: { position: string }) {
	return (
		<div
			className={twMerge(
				"bg-size-[245px_380px] inline-block mr-2 w-[24px] h-[24px]",
				position
			)}
			style={{ backgroundImage: `url(${sprite})` }}
		/>
	);
}

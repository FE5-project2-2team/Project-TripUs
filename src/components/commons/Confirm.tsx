import { twMerge } from "tailwind-merge";

export default function Confirm({
	confirmHandler,
	cancelHandler,
	title,
	description,
	confirmBtn
}: {
	confirmHandler: () => void;
	cancelHandler: () => void;
	title: string;
	description: string;
	confirmBtn: string;
}) {
	return (
		<div className="w-120 h-[150px] p-5 border-b-3 border-[#db1f5a] bg-white rounded-lg shadow-lg fixed top-4 left-[calc(50%-240px)] z-51">
			<h3 className="font-medium mb-[13px] text-[#333]">{title}</h3>
			<span className="text-sm text-[#616161]">{description}</span>
			<div className="flex gap-[10px] justify-end mt-4">
				<button
					type="button"
					onClick={confirmHandler}
					className={twMerge(
						"w-[110px] h-[33px] border-1 border-transparent text-[#db1f5a] rounded-[10px]",
						"hover:bg-[#FDF4F3] hover:border-[#db1f5a] cursor-pointer"
					)}
				>
					{confirmBtn}
				</button>
				<button
					type="button"
					onClick={cancelHandler}
					className={twMerge(
						"w-[110px] h-[33px] border border-[#db1f5a] text-white bg-[#db1f5a] rounded-[10px]",
						"hover:bg-white hover:text-[#db1f5a] cursor-pointer"
					)}
				>
					취소
				</button>
			</div>
		</div>
	);
}

import { twMerge } from "tailwind-merge";

export default function Confirm({
	deletePostHandler,
	cancelHandler
}: {
	deletePostHandler: () => void;
	cancelHandler: () => void;
}) {
	return (
		<div className="w-120 h-[150px] p-5 border-b-3 border-[#db1f5a] bg-white rounded-lg shadow-lg fixed top-4 left-[calc(50%-240px)] z-51">
			<h3 className="font-medium mb-[13px]">게시글을 삭제하시겠습니까?</h3>
			<span className="text-sm text-[#616161]">
				삭제된 게시글은 복구할 수 없습니다.
			</span>
			<div className="flex gap-[10px] justify-end mt-4">
				<button
					onClick={deletePostHandler}
					className={twMerge(
						"w-[110px] h-[33px] border-1 border-transparent text-[#db1f5a] rounded-[10px]",
						"hover:bg-[#FDF4F3] hover:border-[#db1f5a] cursor-pointer"
					)}
				>
					삭제
				</button>
				<button
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

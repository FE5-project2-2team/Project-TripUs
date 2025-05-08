import Icon from "../../commons/Icon";

export default function AddPostButt() {
	return (
		<div
			className={
				"fixed bottom-[15px] right-[324px] flex items-center group z-50"
			}
		>
			<span className="mr-4 items-center text-[#06B796] text-xl opacity-0 group-hover:opacity-100">
				게시글 추가
			</span>
			<button>
				<div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#06B796] cursor-pointer">
					<Icon position="11.606% 49.71%" size="35px" />
				</div>
			</button>
		</div>
	);
}

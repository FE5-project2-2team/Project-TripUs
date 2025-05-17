import Icon from "../../commons/Icon";

export default function AddPostButt() {
	return (
		<div className="fixed right-[50px] bottom-[30px] z-40">
			<button
				className="group relative w-[70px] hover:w-[177px] h-[70px]
               rounded-full bg-[#06B796] text-white
               transition-all duration-300 overflow-hidden pl-[20px] pr-[20px] cursor-pointer
               flex items-center"
			>
				<div className="absolute right-[24px] top-[24.5px]">
					<Icon position="-19px -161px" size="21px" />
				</div>
				<span
					className="opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[100px]
                 overflow-hidden whitespace-nowrap transition-all duration-300 text-[20px] font-medium"
				>
					게시글 추가
				</span>
			</button>
		</div>
	);
}

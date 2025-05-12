import { useEffect, useState } from "react";
import Icon from "../../commons/Icon";

export default function AddPostButt() {
	const [isFixed, setIsFixed] = useState(false);

	useEffect(() => {
		const handScroll = () => {
			const targetY = 250;
			setIsFixed(window.scrollY >= targetY);
		};
		window.addEventListener("scroll", handScroll);
		return () => window.removeEventListener("scroll", handScroll);
	}, []);
	return (
		<div
			className={`fixed right-[50px] z-50 transition-all duration-500 ${
				isFixed
					? "bottom-[30px] translate-y-0 opacity-100"
					: "bottom-[-100px] translate-y-[200px] opacity-0"
			}`}
		>
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

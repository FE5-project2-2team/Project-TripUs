import { useEffect, useState } from "react";
import Icon from "../../commons/Icon";

export default function AddPostButt() {
	const [isFixed, setIsFixed] = useState(false);

	useEffect(() => {
		const handScroll = () => {
			const targetY = 380;
			if (window.scrollY >= targetY) {
				setIsFixed(true);
			} else {
				setIsFixed(false);
			}
		};
		window.addEventListener("scroll", handScroll);
		return () => window.removeEventListener("scroll", handScroll);
	}, []);
	return (
		<div
			className={`fixed right-[50px] z-50 flex items-center group transition-all duration-500 ${
				isFixed
					? "bottom-[30px] translate-y-0 opacity-100"
					: "bottom-[-100px] translate-y-[200px] opacity-0"
			}`}
		>
			<span className="mr-4 items-center text-[#06B796] text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				게시글 추가
			</span>
			<button>
				<div className="w-[70px] h-[70px] rounded-full flex items-center justify-center bg-[#06B796] cursor-pointer">
					<Icon position="11.606% 49.71%" size="35px" />
				</div>
			</button>
		</div>
	);
}

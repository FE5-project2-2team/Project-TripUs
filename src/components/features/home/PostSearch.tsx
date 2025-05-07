// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import spriteImage from "../../../assets/images/spriteImages.png";

//게시글 검색창
export default function PostSearch() {
	return (
		<label
			htmlFor="search"
			className="p-[12px] border border-[#CDCDCD] bg-[#F3F4F6] rounded-[12px] flex items-center gap-[80px] focus-within:border-[#06b796]"
		>
			<input
				id="postsearch"
				type="text"
				placeholder="동행 및 후기글을 검색해보세요."
				className="w-full text-[#616161] outline-none"
			/>
			<button
				className="w-5 h-5 cursor-pointer bg-no-repeat"
				style={{
					backgroundImage: `url(${spriteImage})`,
					backgroundPosition: "14.928% 35.16%",
					backgroundSize: "245px 380px"
				}}
			></button>
		</label>
	);
}

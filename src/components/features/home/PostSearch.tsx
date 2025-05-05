import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//게시글 검색창
export default function PostSearch() {
	return (
		<label
			htmlFor="search"
			className="w-[374px] h-[56px] p-[14px] border border-[#A1A7BD] bg-[#F3F4F6] rounded-2xl flex items-center px-3 py-3.5"
		>
			<input
				id="postsearch"
				type="text"
				placeholder="동행 및 후기글을 검색해보세요."
				className="w-full h-[28px] text-[#616161] outline-none"
			/>
			<button className="w-5 h-5 cursor-pointer">
				<FontAwesomeIcon icon={faMagnifyingGlass} />
			</button>
		</label>
	);
}

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//게시글 검색창
export default function PostSearch() {
	return (
		<label
			htmlFor="search"
			className="w-[341px] h-[44px] p-3 border border-[#CDCDCD] bg-[#F3F4F6] rounded-[10px] flex items-center"
		>
			<input
				id="postsearch"
				type="text"
				placeholder="동행 및 후기글을 검색해보세요."
				className="w-[317px] h-[20px] text-[#616161] outline-none"
			/>
			<button className="w-5 h-5 cursor-pointer">
				<FontAwesomeIcon icon={faMagnifyingGlass} />
			</button>
		</label>
	);
}

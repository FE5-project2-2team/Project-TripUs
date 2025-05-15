import { useState } from "react";
import { useThemeStore } from "../../../store/themeStore";
import Icon from "../../commons/Icon";

//게시글 검색창
export default function PostSearch({
	search,
	setSearch
}: {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
	// darkmode
	const [isFocused, setIsFocused] = useState(false);
	const isDark = useThemeStore((state) => state.isDark);
	const searchIconPosition = isDark ? "82.969% 27.747%" : "14.847% 35.165%";

	return (
		<div className=" overflow-hidden">
			<label
				htmlFor="search"
				className="w-[288px] p-[12px] border border-[#CDCDCD] bg-[#F3F4F6] rounded-[12px] flex items-center focus-within:border-[#06b796] dark:bg-[#333]"
			>
				<input
					id="postsearch"
					type="text"
					placeholder="동행 및 후기글을 검색해보세요."
					value={search}
					className="w-full h-[20px] text-[#616161] outline-none dark:text-[#dadada] dark:placeholder:text-[#cdcdcd]"
					onChange={(e) => setSearch(e.target.value)}
					onBlur={() => setIsFocused(false)}
					onFocus={() => setIsFocused(true)}
				/>
				<button
					className="w-5 h-5 cursor-pointer bg-no-repeat"
					onClick={() => setSearch("")}
				>
					<Icon
						size="16px"
						position={isFocused ? "-148px -349px" : searchIconPosition}
					/>
				</button>
			</label>
		</div>
	);
}

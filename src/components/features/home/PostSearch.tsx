import Icon from "../../commons/Icon";

//게시글 검색창
export default function PostSearch({
	search,
	setSearch
}: {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
	return (
		<div className="w-full max-w-[400px] overflow-hidden">
			<label
				htmlFor="search"
				className="w-full p-[12px] border border-[#CDCDCD] bg-[#F3F4F6] rounded-[12px] flex items-center focus-within:border-[#06b796]"
			>
				<input
					id="postsearch"
					type="text"
					placeholder="동행 및 후기글을 검색해보세요."
					value={search}
					className="w-full h-[20px] text-[#616161] outline-none"
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button
					className="w-5 h-5 cursor-pointer bg-no-repeat"
					onClick={() => setSearch("")}
				>
					<Icon position="17.862% 12.155%" size="20px" />
				</button>
			</label>
		</div>
	);
}

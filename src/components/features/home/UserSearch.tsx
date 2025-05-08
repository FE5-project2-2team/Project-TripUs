import Icon from "../../commons/Icon";

export default function UserSearch({
	userSearch,
	setUserSearch
}: {
	userSearch: string;
	setUserSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
	return (
		<label
			htmlFor="search"
			className="w-[272px] h-[40px] p-2 mt-[18px] border-b border-[#CACACA] bg-[#FFF] flex items-center"
		>
			<input
				id="usersearch"
				type="text"
				placeholder="사용자를 검색해보세요"
				value={userSearch}
				onChange={(e) => setUserSearch(e.target.value)}
				className="w-full h-[22px] text-[#616161] outline-none"
			/>
			<button className="w-5 h-5 cursor-pointer">
				<Icon position="18.062% 12.155%" size="20px" />
			</button>
		</label>
	);
}

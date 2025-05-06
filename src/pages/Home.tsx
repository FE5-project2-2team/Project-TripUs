import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link, Outlet } from "react-router";
import AddPostButt from "../components/features/home/AddPostButt";
import ChannelList from "../components/features/home/ChannelList";
import FilterAndSort from "../components/features/home/FilterAndSort";
import PostSearch from "../components/features/home/PostSearch";
import MainVisual from "../components/features/main/MainVisual";
import UserList from "../components/features/home/UserList";
import { useState } from "react";

export default function Home() {
	const [sort, setSort] = useState("최신순");
	const [selectFilter, setSelectFilter] = useState<string[]>([]);
	const [isChecked, setIsChecked] = useState(false);

	return (
		<>
			<div className="flex items-center">
				{/* 본문 */}
				<div className="flex flex-col items-center w-full min-w-[1100px] h-[1166px] px-[20px]">
					{/* 슬라이드 이미지 */}
					<div className="mt-[20px]">
						<MainVisual />
					</div>
					{/* 배너+검색 */}
					<div className="w-full flex justify-between mt-[20px] ">
						{/* 배너 */}
						<ChannelList />
						{/* 동행글 검색창*/}
						<PostSearch />
					</div>
					{/* 필터,정렬 */}
					<FilterAndSort
						sort={sort}
						setSort={setSort}
						selectFilter={selectFilter}
						setSelectFilter={setSelectFilter}
						isChecked={isChecked}
						setIsChecked={setIsChecked}
					/>
					{/* 게시글들 */}
					<div className="overflow-y-auto overflow-x-hidden h-[600px] w-full ">
						<Outlet context={{ sort, selectFilter, isChecked }} />
						<Link to={"/postCreate"}>
							<AddPostButt />
						</Link>
					</div>
				</div>
				{/* 유저사이드바 <div>검색, 사용자 정렬</div>*/}
				<div className="flex flex-col w-[308px] h-[1166px] px-4.5 py-6 border-l border-[#CACACA]">
					<span className="justify-start font-bold text-lg">사용자</span>
					{/* 사용자 검색창*/}
					<label
						htmlFor="search"
						className="w-[272px] h-[40px] p-2 mt-[18px] border-b border-[#CACACA] bg-[#FFF] flex items-center"
					>
						<input
							id="usersearch"
							type="text"
							placeholder="사용자를 검색해보세요"
							className="w-full h-[22px] text-[#616161] outline-none"
						/>
						<button className="w-5 h-5 cursor-pointer">
							<FontAwesomeIcon icon={faMagnifyingGlass} />
						</button>
					</label>
					<div>
						{/* 사용자 목록 */}
						<div className="w-[268px] h-full">
							<UserList />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet } from "react-router";
import MainVisual from "../components/features/main/MainVisual";
import ChannelList from "../components/features/home/ChannelList";
import PostSearch from "../components/features/home/PostSearch";
import FilterAndSort from "../components/features/home/FilterAndSort";
import AddPostButt from "../components/features/home/AddPostButt";

export default function Home() {
	return (
		<>
			<div className="flex items-center">
				{/* 본문 */}
				<div className="flex flex-col items-center w-[1132px] h-[1166px]">
					{/* 슬라이드 이미지 */}
					<div className="mt-[20px]">
						<MainVisual />
					</div>
					{/* 배너+검색 */}
					<div className="w-full max-w-[1000px] flex justify-between mt-8 ">
						{/* 배너 */}
						<ChannelList />
						{/* 동행글 검색창*/}
						<PostSearch />
					</div>
					{/* 필터,정렬 */}
					<FilterAndSort />
					{/* 게시글들 */}
					<div className="overflow-y-auto overflow-x-hidden h-[600px] w-full">
						<Outlet />
					</div>
					{/* 게시글 추가 버튼 */}
					<AddPostButt />
				</div>

				{/* 유저사이드바 <div>검색, 사용자 정렬</div>*/}
				<div className="flex flex-col w-[308px] h-[1166px] px-4.5 py-6 border-l border-[#CACACA]">
					<span className="justify-start font-bold text-lg mt-6">사용자</span>
					{/* 사용자 검색창*/}
					<label
						htmlFor="search"
						className="w-[255px] h-[40px] p-2 mt-4.5 border-b border-[#CACACA] bg-[#FFF] flex items-center"
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
						<div className="w-[270px] h-[70px]"></div>
					</div>
				</div>
			</div>
		</>
	);
}

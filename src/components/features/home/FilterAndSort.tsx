import { useState } from "react";

export default function FilterAndSort() {
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [sort, setSort] = useState("최신순");
	const [sortToggle, setSortToggle] = useState(false);
	return (
		<div className="w-full h-[80px] flex items-center mt-7">
			<div className="w-full h-7 flex items-center justify-between relative">
				{/* 왼쪽: 필터 버튼 */}
				<div className="relative">
					<button
						className="flex items-center text-[20px] cursor-pointer"
						onClick={() => setIsFilterOpen(true)}
					>
						<div
							className="w-[28px] h-[28px] gap-[5px] bg-no-repeat"
							style={{
								backgroundImage: "url('/src/assets/images/sprite-images.png')",
								backgroundSize: "245px 380px",
								backgroundPosition: "-42.3px -43.7px"
							}}
						/>
						필터
					</button>

					{/* 필터모달 */}
					{isFilterOpen && (
						<>
							<div className="fixed inset-0 bg-[#000] opacity-[40%] z-30" />
							<div className="p-[30px] fixed rounded-[15px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[524px] h-[414px] drop-shadow bg-[#fff] border border-[#616161] z-50">
								<div className="w-[464px] h-[29px] flex items-center justify-between">
									<span className="text-[24px] font-bold">필터</span>
									<button
										onClick={() => setIsFilterOpen(false)}
										className="flex cursor-pointer"
									>
										x
									</button>
								</div>
								<span className=" block text-[18px] mt-[20px]">성별</span>
								<div className="w-[178px] h-[46px] mt-[10px] flex items-center gap-[16px]">
									<button className="w-[80px] h-[46px] text-[16px] rounded-[8px] bg-[#F3F4F6]">
										남성
									</button>
									<button className="w-[80px] h-[46px] text-[16px] rounded-[8px] bg-[#F3F4F6]">
										여성
									</button>
								</div>

								<span className=" block text-[18px] mt-[20px]">나이</span>
								<div className="w-[465px] h-[46px] mt-[10px] flex items-center gap-[16px]">
									<button className="w-[80px] h-[46px] text-[16px] rounded-[8px] bg-[#F3F4F6]">
										20대
									</button>
									<button className="w-[80px] h-[46px] text-[16px] rounded-[8px] bg-[#F3F4F6]">
										30대
									</button>
									<button className="w-[80px] h-[46px] text-[16px] rounded-[8px] bg-[#F3F4F6]">
										40대
									</button>
									<button className="w-[80px] h-[46px] text-[16px] rounded-[8px] bg-[#F3F4F6]">
										50대
									</button>
									<button className="w-[80px] h-[46px] text-[16px] rounded-[8px] bg-[#F3F4F6]">
										60대+
									</button>
								</div>
							</div>
						</>
					)}
				</div>

				{/* 오른쪽: 정렬 버튼 */}
				<div className="relative">
					<button
						onClick={() => setSortToggle((sort) => !sort)}
						className="flex items-center gap-[5px] text-[20px]"
					>
						{sort}
						<div
							className="w-[13px] h-[7px] bg-no-repeat"
							style={{
								backgroundImage: "url('/src/assets/images/sprite-images.png')",
								backgroundSize: "245px 380px",
								backgroundPosition: "-64.3px -105.3px"
							}}
						/>
					</button>

					{/* 정렬 툴팁 */}
					{sortToggle && (
						<div className="absolute w-[142px] h-[98px] drop-shadow bg-white rounded-[10px] z-50">
							{["최신순", "인기순"].map((option) => (
								<button
									key={option}
									onClick={() => {
										setSort(option);
										setSortToggle(false);
									}}
									className="w-[130px] h-[40px] m-[6px] px-[42.5px] py-[10.5px] text-[#333333] text-[16px] rounded-[8px] hover:bg-[#E0F4F2] hover:text-[#06B796] cursor-pointer whitespace-nowrap flex items-center justify-center"
								>
									{option}
								</button>
							))}
							{/* {sort} */}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

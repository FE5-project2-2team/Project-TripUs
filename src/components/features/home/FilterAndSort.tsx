import { useState } from "react";
export default function FilterAndSort({
	sort,
	setSort,
	selectFilter,
	setSelectFilter,
	isChecked,
	setIsChecked
}: {
	sort: string;
	setSort: React.Dispatch<React.SetStateAction<string>>;
	selectFilter: string[];
	setSelectFilter: React.Dispatch<React.SetStateAction<string[]>>;
	isChecked: boolean;
	setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	// const [sort, setSort] = useState("최신순");
	const [sortToggle, setSortToggle] = useState(false);
	// const [isChecked, setIsChecked] = useState(false);
	const [tempFilter, setTempFilter] = useState<string[]>([]);
	// const [selectFilter, setSelectFilter] = useState<string[]>([]);
	const genderArr = ["성별 무관", "남성", "여성"];
	const ageArr = ["20대", "30대", "40대", "50대", "60대+"];

	const toggleFilter = (butt: string) => {
		// if (tempFilter.includes(butt)) {
		// 	setTempFilter(tempFilter.filter((value) => value !== butt));
		// } else {
		// 	setTempFilter([...tempFilter, butt]);
		// }
		tempFilterFunc(butt);
	};

	const tempFilterFunc = (filter: string) => {
		if (tempFilter.includes(filter))
			setTempFilter(tempFilter.filter((item) => item !== filter));
		else setTempFilter([...tempFilter, filter]);
	};

	const resetfunc = () => {
		setSelectFilter([]);
		setTempFilter([]);
	};

	return (
		<div className="w-full h-[76px] mt-7">
			<div className="w-full h-[24px] flex items-end justify-between relative">
				{/* 왼쪽: 필터 버튼 */}
				<button
					className="flex items-center gap-[4px] h-[24px] relative cursor-pointer"
					onClick={() => setIsFilterOpen(true)}
				>
					<div
						className="flex w-6 h-6 bg-no-repeat bg-center"
						style={{
							backgroundImage: "url('/src/assets/images/spriteImages.png')",
							backgroundSize: "245px 380px",
							backgroundPosition: "-14px -40px"
						}}
					/>
					<span className="text-[20px] leading-[24px]">필터</span>
				</button>

				{/* 필터모달 */}
				{isFilterOpen && (
					<>
						<div className="fixed inset-0 bg-[#000] opacity-[40%] z-30" />
						<div className="p-[30px] fixed rounded-[15px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[524px] h-[414px] drop-shadow bg-[#fff] border border-[#616161] z-50">
							<div className="w-[464px] h-[29px] flex items-center justify-between">
								<span className="text-[24px] font-bold">필터</span>
								<button
									onClick={() => {
										setIsFilterOpen(false);
										setTempFilter([]);
									}}
									className="w-[24px] h-[24px] flex cursor-pointer"
									style={{
										backgroundImage:
											"url('/src/assets/images/spriteImages.png')",
										backgroundSize: "245px 380px",
										backgroundPosition: "-66px -102px"
									}}
								></button>
							</div>
							<span className=" block text-[18px] mt-[20px]">성별</span>
							<div className="min-w-[178px] h-[46px] mt-[10px] flex items-center gap-[16px]">
								{genderArr.map((butt) => (
									<button
										key={butt}
										onClick={() => toggleFilter(butt)}
										className={`w-[80px] h-[46px] text-[16px] rounded-[8px] bg-[#F3F4F6] cursor-pointer
										transition ${tempFilter.includes(butt) ? "border border-[#06B796] text-[#06B796]" : "text-[#616161]"}
										`}
									>
										{butt}
									</button>
								))}
							</div>

							<span className=" block text-[18px] mt-[20px]">나이</span>
							<div className="w-[465px] h-[46px] mt-[10px] flex items-center gap-[16px]">
								{ageArr.map((butt) => (
									<button
										key={butt}
										onClick={() => {
											// tempFilterFunc(butt);
											toggleFilter(butt);
										}}
										className={`w-[80px] h-[46px] text-[16px] rounded-[8px] bg-[#F3F4F6] cursor-pointer
										${tempFilter.includes(butt) ? "border border-[#06B796] text-[#06B796]" : "text-[#616161]"}
										`}
									>
										{butt}
									</button>
								))}
							</div>
							{/* 모집중만 보기*/}
							<label className="flex items-center cursor-pointer gap-[2px] mt-[30px]">
								<input
									type="checkbox"
									checked={isChecked}
									onChange={() => setIsChecked(!isChecked)}
									className="hidden"
								/>
								<div className="w-6 h-6 flex items-center justify-center border border-[#A1A7BD] bg-[#06B796]">
									{isChecked ? (
										<div
											className="w-4 h-4 bg-no-repeat bg-center"
											style={{
												backgroundImage:
													"url('/src/assets/images/spriteImages.png')",
												backgroundSize: "245px 380px",
												backgroundPosition: "-17px -100px"
											}}
										/>
									) : null}
								</div>
								<span className="ml-[2px] text-[16px]">모집중만 보기</span>
							</label>

							<div className=" mt-[30px] flex justify-between items-center ">
								{/* 초기화 */}
								<button
									className="flex items-center h-[25px] gap-[0.5px] cursor-pointer"
									onClick={() => {
										resetfunc();
										setIsFilterOpen(false);
									}}
								>
									<div
										className="w-6 h-6"
										style={{
											backgroundImage:
												"url('/src/assets/images/spriteImages.png')",
											backgroundSize: "245px 380px",
											backgroundPosition: "-38px -96px"
										}}
									/>
									<span className="text-[18px] font-bold text-[#06B796]">
										초기화
									</span>
								</button>
								{/* 적용하기 */}
								<button
									className="flex items-center justify-center w-[107px] h-[45px] rounded-[10px] bg-[#06B796] text-[#F3F4F6] text-[18px] font-bold cursor-pointer"
									onClick={() => {
										setIsFilterOpen(false);
										setSelectFilter((prev) =>
											Array.from(new Set([...prev, ...tempFilter]))
										);
										setTempFilter([]);
									}}
								>
									적용하기
								</button>
							</div>
						</div>
					</>
				)}

				{/* 오른쪽: 정렬 버튼 */}
				<div className="flex items-center relative">
					<button
						onClick={() => setSortToggle((sort) => !sort)}
						className="flex items-center gap-[4px] h-[24px] cursor-pointer relative"
					>
						<span className="text-[20px] leading-[24px]">{sort}</span>
						<div
							className=" w-[24px] h-[24px] bg-no-repeat bg-center"
							style={{
								backgroundImage: "url('/src/assets/images/spriteImages.png')",
								backgroundSize: "245px 380px",
								backgroundPosition: "-65px -40px"
							}}
						/>
					</button>
					{/* 정렬 툴팁 */}
					{sortToggle && (
						<div className="absolute top-full left-0 w-[142px] h-[98px] drop-shadow bg-white rounded-[10px] z-50">
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
			{/* 필터링 박스들 */}
			<div className="w-full h-[36px] mt-[16px] flex items-center gap-[16px]">
				{selectFilter.map((filt) => (
					<button
						key={filt}
						className="min-w-[100px] h-[36px] bg-[#F3F4F6] border border-[#06B796] rounded-[14px] flex items-center justify-center cursor-pointer"
						onClick={() => {
							setSelectFilter(selectFilter.filter((item) => item !== filt));
						}}
					>
						<span className="h-[36px] text-[18px] text-[#06B796]">{filt}</span>
						<div
							className="w-[22px] h-[22px]"
							style={{
								backgroundImage: "url('/src/assets/images/spriteImages.png')",
								backgroundSize: "245px 380px",
								backgroundPosition: "-53px -127px"
							}}
						/>
					</button>
				))}
			</div>
		</div>
	);
}

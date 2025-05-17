import { useRef, useState } from "react";
import Icon from "../../commons/Icon";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useThemeStore } from "../../../store/themeStore";
import { useClickAway } from "react-use";

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
	const [sortToggle, setSortToggle] = useState(false);
	const [tempFilter, setTempFilter] = useState<string[]>([]);
	const genderArr = ["성별 무관", "남성", "여성"];
	const ageArr = ["20대", "30대", "40대", "50대", "60대+"];
	const filterRef = useRef<HTMLDivElement | null>(null);
	const toggleFilter = (butt: string) => {
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

	// darkmode
	const isDark = useThemeStore((state) => state.isDark);
	const filterIconPosition = isDark ? "40.807% 11.944%" : "5.83% 11.944%";
	const sortIconPosition = isDark ? "52.381% 13.172%" : "29.87% 13.172%";
	const closeIconPosition = isDark ? "72.727% 27.869%" : "28.571% 27.869%";

	useClickAway(filterRef, () => {
		setIsFilterOpen(false);
	});
	return (
		<div className="w-full h-[76px] sm:mt-7 mt-[19px]">
			<div className="w-full h-[24px] flex items-end justify-between relative">
				{/* 왼쪽: 필터 버튼 */}
				<button
					className="flex items-center gap-[4px] sm:h-[24px] h-[19px] relative cursor-pointer"
					onClick={() => setIsFilterOpen(true)}
				>
					<Icon position={filterIconPosition} size="22px" />
					<span className="sm:text-[20px] text-[16px]">필터</span>
				</button>
				{/* 필터모달 */}
				{isFilterOpen && (
					<>
						<div className="fixed inset-0 bg-[#000] opacity-[40%] z-30" />
						<div ref={filterRef}>
							<div className="p-[30px] fixed rounded-[15px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[524px] h-[414px] drop-shadow bg-[#fff] border border-[#616161] z-50 dark:bg-[#313131]">
								<div className="w-[464px] h-[29px] flex items-center justify-between">
									<span className="text-[24px] font-bold">필터</span>
									<button
										onClick={() => {
											setIsFilterOpen(false);
											setTempFilter([]);
										}}
										className="w-[24px] h-[24px] flex cursor-pointer"
									>
										<Icon position={closeIconPosition} size="20px" />
									</button>
								</div>
								<span className=" block text-[18px] mt-[20px]">성별</span>
								<div className="min-w-[178px] h-[46px] mt-[10px] flex items-center gap-[16px]">
									{genderArr.map((butt) => (
										<button
											key={butt}
											onClick={() => toggleFilter(butt)}
											className={`w-[80px] h-[46px] text-[16px] rounded-[8px] bg-[#F3F4F6] cursor-pointer dark:bg-[#434343]
										transition ${tempFilter.includes(butt) ? "border border-[#06B796] text-[#06B796]" : "text-[#616161] dark:text-[#cdcdcd]"}
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
											className={`w-[80px] h-[46px] text-[16px] rounded-[8px] bg-[#F3F4F6] cursor-pointer dark:bg-[#434343]
										${tempFilter.includes(butt) ? "border border-[#06B796] text-[#06B796]" : "text-[#616161] dark:text-[#cdcdcd]"}
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
									<div
										className={`w-6 h-6 flex items-center justify-center border ${
											isChecked
												? "bg-[#06B796] border-[#06B796]"
												: "bg-[#FFFFFF] border-[#A1A7BD] dark:bg-[#434343]"
										}`}
									>
										{isChecked && (
											<FontAwesomeIcon
												icon={faCheck}
												className="w-[16px] h-[16px] text-white"
											/>
										)}
									</div>
									<span className="ml-[8px] text-[16px]">모집중만 보기</span>
								</label>

								<div className=" mt-[30px] flex justify-between items-center ">
									{/* 초기화 */}
									<button
										className="flex items-center h-[25px] gap-[6px] cursor-pointer"
										onClick={() => {
											resetfunc();
											setIsFilterOpen(false);
										}}
									>
										<Icon position="16.74% 27.624%" size="18px" />
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
						</div>
					</>
				)}

				{/* 오른쪽: 정렬 버튼 */}
				<div className="flex items-center relative">
					<button
						onClick={() => setSortToggle((sort) => !sort)}
						className="flex items-center gap-[4px] sm:h-[24px] h-[19px] cursor-pointer relative"
					>
						<span className="sm:text-[20px] text-[16px] sm:leading-[24px] leading-[19px]">
							{sort}
						</span>
						<div className="pt-[4px]">
							<Icon position={sortIconPosition} size="14px" />
						</div>
					</button>
					{/* 정렬 툴팁 */}
					{sortToggle && (
						<div className="absolute top-[30px] sm:left-[-50px] left-[-50px] sm:w-[142px] w-[120px] sm:h-[147px] h-[120px] drop-shadow bg-white rounded-[10px] z-50 dark:bg-[#313131]">
							{["최신순", "인기순", "날짜순"].map((option) => (
								<button
									key={option}
									onClick={() => {
										setSort(option);
										setSortToggle(false);
									}}
									className="sm:w-[130px] w-[114px] sm:h-[40px] h-[30px] m-[6px] px-[42.5px] py-[10.5px] text-[#333333] sm:text-[16px] text-[14px] rounded-[8px] hover:bg-[#E0F4F2] hover:text-[#06B796] cursor-pointer whitespace-nowrap flex items-center justify-center dark:text-[#dadada] dark:hover:bg-[#B8E1E1]"
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
			<div className="w-full sm:h-[36px] h-[31px] mt-[16px] flex items-center gap-[16px]">
				{selectFilter.map((filt) => (
					<button
						key={filt}
						className="sm:px-[16px] px-[12px] py-[5px] bg-[#F3F4F6] border border-[#06B796] sm:rounded-[14px] rounded-[8px] flex items-center justify-center gap-[10px] cursor-pointer dark:bg-[#1B1D22]"
						onClick={() => {
							setSelectFilter(selectFilter.filter((item) => item !== filt));
						}}
					>
						<span className=" flex items-center justify-center sm:text-[18px] text-[16px] text-[#06B796]">
							{filt}
						</span>
						<Icon position="25.751% 35.326%" size="12px" />
					</button>
				))}
			</div>
		</div>
	);
}

import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import countries from "../../../assets/data/world.json";

export default function AutoComplete() {
	const { control, setValue } = useFormContext();
	const watchedLoaction = useWatch({
		control,
		name: "location"
	});
	const [list, setList] = useState<string[]>([]);
	const locationHandler = (location: string) => {
		setValue("location", location);
	};

	useEffect(() => {
		setList(
			countries
				.filter((item) => item.name.includes(watchedLoaction || ""))
				.map((item) => item.name)
				.sort((a, b) => a.indexOf(watchedLoaction) - b.indexOf(watchedLoaction))
		);
	}, [watchedLoaction]);
	return (
		<ul className="absolute top-[97px] w-full max-h-45 overflow-hidden border-1 border-[#d6d6d6] py-2 px-2 bg-white pb-2 rounded-b-[10px]">
			{list.length > 0 ? (
				list.map((location, index) => (
					<li
						key={index}
						className="px-3 py-2 hover:bg-[#E0F4F2] hover:text-[#06b796] cursor-pointer"
						onMouseDown={() => locationHandler(location)}
					>
						{location}
					</li>
				))
			) : (
				<li className="px-3 py-2 text-gray-400">결과 없음</li>
			)}
		</ul>
	);
}

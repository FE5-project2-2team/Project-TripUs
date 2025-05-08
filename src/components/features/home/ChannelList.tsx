import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getChannels } from "../../../apis/channel";

//채널 목록
export default function ChannelList() {
	// type Channel = {
	// 	_id: string;
	// 	name: string;
	// 	description: string;
	// 	authRequired: boolean;
	// 	posts: string[];
	// 	createdAt: string;
	// 	updatedAt: string;
	// 	__v: number;
	// };
	const [channels, setChannels] = useState<ChannelData[]>([]); //채널 목록
	const navigate = useNavigate();
	const { channelName } = useParams();
	const [selected, setSelected] = useState(channelName || "");

	const handleChannelClick = (channelName: string) => {
		navigate(`/channel/${encodeURIComponent(channelName)}`);
	};

	useEffect(() => {
		const fetchChannels = async () => {
			try {
				const data = await getChannels();
				setChannels(data);
			} catch (error) {
				console.error("채널 불러오기 실패", error);
			}
		};
		fetchChannels();
	}, []); //한번만 채널목록 불러오기
	useEffect(() => {
		if (channelName) setSelected(channelName); //
	}, [channelName]);

	return (
		<div className="flex gap-[6px] flex-wrap bg-[#F3F4F6] rounded-[12px]">
			{channels.map((channel) => (
				<button
					key={channel._id}
					onClick={() => handleChannelClick(channel.name)}
					className={`px-6 py-2 rounded-[12px] text-xl font-medium cursor-pointer ${
						selected === channel.name
							? "bg-[#06B796] text-white"
							: "text-[#333333]"
					}`}
				>
					{channel.name}
				</button>
			))}
		</div>
	);
}

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getChannels } from "../../../apis/channel";

//채널 목록
export default function ChannelList() {
	type Channel = {
		_id: string;
		name: string;
		description: string;
		authRequired: boolean;
		posts: string[];
		createdAt: string;
		updatedAt: string;
		__v: number;
	};
	const [channels, setChannels] = useState<Channel[]>([]); //채널 목록
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
		<div className="flex gap-1 max-w-[415px] h-[36px] flex-wrap">
			{channels.map((channel) => (
				<button
					key={channel._id}
					onClick={() => handleChannelClick(channel.name)}
					className={`px-1 py-1.5 rounded-full text-xl font-medium cursor-pointer ${
						selected === channel.name
							? "bg-[#06B796] text-white"
							: "bg-white text-[#1C274C]"
					}`}
				>
					{channel.name}
				</button>
			))}
		</div>
	);
}

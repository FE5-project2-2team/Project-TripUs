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
		<div className="flex max-w-[521px] h-[40px] rounded-[12px] bg-[#F3F4F6] flex-wrap">
			{channels.map((channel) => (
				<button
					key={channel._id}
					onClick={() => handleChannelClick(channel.name)}
					className={`flex items-center h-[40px] px-6 py-2 rounded-[12px] text-xl cursor-pointer ${
						selected === channel.name
							? "bg-[#06B796] text-white"
							: "bg-[#F3F4F6] text-[#1C274C]"
					}`}
				>
					{channel.name}
				</button>
			))}
		</div>
	);
}

import { useEffect } from "react";
import { getChannelInfo } from "../apis/channel";
import { useParams } from "react-router";

//채널 정보 가져오기
//채널별 게시글 보여주기
export default function Channel() {
  // const [channels,setChannels]=useState([]); //채널 목록
  // const navigate=useNavigate();
  const { channelName } = useParams();
  const decodedChannelName = decodeURIComponent(channelName || "");

  useEffect(() => {
    if (channelName) {
      const fetchChannelInfo = async () => {
        const data = await getChannelInfo(decodedChannelName); //url에 나와있는 채널이름가지고 데이터 불러오기(URL속 채널이름 바뀔때마다)
        console.log(data);
      };
      fetchChannelInfo();
    }
  }, [decodedChannelName]);
  return (
    <div>
      <h2>{channelName}</h2>
    </div>
  );
}

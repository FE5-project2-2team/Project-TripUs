import { useEffect, useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, useNavigate, useParams } from "react-router";
import { getChannels } from "../apis/channel";
//import Channel from "./Channel";

//홈 이미지 배너
function Image() {
  const [imgIndex, setImgIndex] = useState(0);
  const homeImage = [
    "/images/HomeImg1.jpg",
    "/images/HomeImg2.jpg",
    "/images/HomeImg3.jpg",
    "/images/HomeImg4.jpg",
    "/images/HomeImg5.jpg",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((index) => (index + 1) % homeImage.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="overflow-hidden w-[1000px] h-[440px] ">
      <div
        className="flex trainsition-transform duration-500"
        style={{ transform: `translateX(-${imgIndex * 100}%)` }}
      >
        {homeImage.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`슬라이드 이미지 ${index}`}
            className="w-[1000px] h-[440px]"
          />
        ))}
      </div>
    </div>
  );
}

//채널 목록
function ChannelList() {
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

//게시글 검색창
function PostSearch() {
  return (
    <label
      htmlFor="search"
      className="w-[374px] h-[56px] p-[14px] border border-[#A1A7BD] bg-[#F3F4F6] rounded-2xl flex items-center px-3 py-3.5"
    >
      <input
        id="postsearch"
        type="text"
        placeholder="동행 및 후기글을 검색해보세요."
        className="w-full h-[28px] text-[#616161] outline-none"
      />
      <button className="w-5 h-5 cursor-pointer">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </label>
  );
}

//필터,정렬
function FilterAndSort() {
  const [filterToolTip, setFilterToolTip] = useState(false);
  const [sort, setSort] = useState("최신순");
  const [sortToggle, setSortToggle] = useState(false);
  return (
    <div className="w-[1000px] h-[80px] flex mt-7">
      <div className="w-[1000px] h-7 flex items-center justify-between relative">
        {/* 왼쪽: 필터 버튼 */}
        <div className="relative">
          <button onClick={() => setFilterToolTip((tooltip) => !tooltip)}>
            <img
              src="/images/filterbutton.jpg"
              alt="전체글 필터버튼"
              className="cursor-pointer w-[70px] h-[28px]"
            />
          </button>

          {/* 필터툴팁 */}
          {/* {filterToolTip && (
                  <div className="absolute top-10 w-[582px] h-[350px] bg-white border border-gray-300">
                    <span>필터</span>
                    {filterArr.map((filter)=>(
                      <button key={filter}
                      onClick={()=>setFilterTab(filter)}
                      className=
                      ></button>
                    ))}

                  </div>
                )} */}
        </div>

        {/* 오른쪽: 정렬 버튼 */}
        <div className="relative">
          <button
            onClick={() => setSortToggle((sort) => !sort)}
            className="flex items-center text-[20px] cursor-pointer"
          >
            {sort}
            <img src="/images/sortbutton.jpg" alt="정렬" />
          </button>

          {/* 정렬 툴팁 */}
          {sortToggle && (
            <div className="absolute w-[142px] h-[98px] drop-shadow bg-white rounded-[10px]">
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

//게시글 추가버튼
function AddPostButt() {
  const [addPost, setAddPost] = useState(false);
  return (
    <div className="fixed bottom-[16px] right-[324px] flex items-center group z-50">
      <span className="mr-4 items-center text-[#06B796] text-xl opacity-0 group-hover:opacity-100">
        게시글 추가
      </span>
      <button onClick={() => setAddPost((post) => !post)}>
        <img
          src="/images/addpostbutton.jpg"
          alt="게시글 추가"
          className="cursor-pointer w-15 h-15"
        />
      </button>
    </div>
  );
}

export default function Home() {
  //const [filterTab, setFilterTab] = useState("");

  return (
    <>
      <div className="flex items-center">
        {/* 본문 */}
        <div className="flex flex-col items-center w-[1132px] h-[1166px]">
          {/* 슬라이드 이미지 */}
          {Image()}

          {/* 배너+검색 */}
          <div className="w-full max-w-[1000px] flex justify-between mt-8 ">
            {/* 배너 */}
            {ChannelList()}
            <Outlet />
            {/* 동행글 검색창*/}
            {PostSearch()}
          </div>
          {/* 필터,정렬 */}
          {FilterAndSort()}
          {/* 게시글들 */}

          {/* 게시글 추가 버튼 */}
          {AddPostButt()}
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

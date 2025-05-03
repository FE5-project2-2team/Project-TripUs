import { useEffect, useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, useNavigate, useParams } from "react-router";
import { getChannels } from "../apis/channel";
//import Channel from "./Channel";

//홈 이미지 배너
function Image() {
  return (
    <div className="object-contain mt-[20px] w-[1000px] h-[440px] ">
      <img
        src="/src/assets/images/willremove/HomeImg1.jpg"
        alt="이미지"
        className="w-[1000px] h-[440px]"
      />
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sort, setSort] = useState("최신순");
  const [sortToggle, setSortToggle] = useState(false);
  return (
    <div className="w-[1000px] h-[80px] flex items-center mt-7">
      <div className="w-[1000px] h-7 flex items-center justify-between relative">
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
                backgroundPosition: "-42.3px -43.7px",
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
                backgroundPosition: "-64.3px -105.3px",
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

//게시글 추가버튼
function AddPostButt() {
  return (
    <div className="fixed bottom-[16px] right-[324px] flex items-center group z-50">
      <span className="mr-4 items-center text-[#06B796] text-xl opacity-0 group-hover:opacity-100">
        게시글 추가
      </span>
      <button>
        <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center bg-[#06B796] cursor-pointer">
          <div
            className="w-[35px] h-[35px] bg-no-repeat"
            style={{
              backgroundImage: "url('/src/assets/images/sprite-images.png')",
              backgroundSize: "245px 380px",
              backgroundPosition: "-24.3px -171.3px",
            }}
          />
        </div>
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
            {/* 동행글 검색창*/}
            {PostSearch()}
          </div>
          {/* 필터,정렬 */}
          {FilterAndSort()}
          {/* 게시글들 */}
          <div className="overflow-y-auto overflow-x-hidden h-[600px] w-full">
            <Outlet />
          </div>
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

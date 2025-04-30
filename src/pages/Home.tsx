import { useEffect, useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function ChannelBanner() {}
export default function Home() {
  const [selected, setSelected] = useState("전체글");
  const [imgIndex, setImgIndex] = useState(0);
  const [filterToolTip, setFilterToolTip] = useState(false);
  const [sort, setSort] = useState("최신순");
  const [sortToggle, setSortToggle] = useState(false);
  const [addPost, setAddPost] = useState(false);
  //const [filterTab, setFilterTab] = useState("");
  const homeImage = [
    "/images/HomeImg1.jpg",
    "/images/HomeImg2.jpg",
    "/images/HomeImg3.jpg",
    "/images/HomeImg4.jpg",
    "/images/HomeImg5.jpg",
  ];
  const channelBanner = ["전체글", "동행원 모집", "여행후기", "긴급 모집"];

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((index) => (index + 1) % homeImage.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex items-center">
        {/* 본문 */}
        <div className="flex flex-col items-center w-[1132px] h-[1166px] relative">
          {/* 슬라이드 이미지 */}
          <div className="overflow-hidden w-[1000px] h-[440px] relative">
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

          {/* 배너+검색 */}
          {/* 배너 폰트 넣어야함! */}
          <div className="w-full max-w-[1000px] flex justify-between mt-8 ">
            <div className="flex gap-1 max-w-[415px] h-[36px] flex-wrap">
              {channelBanner.map((channel) => (
                <button
                  key={channel}
                  onClick={() => setSelected(channel)}
                  className={`px-1 py-1.5 rounded-full text-xl font-medium cursor-pointer ${
                    selected === channel
                      ? "bg-[#06B796] text-white"
                      : "bg-white text-[#1C274C]"
                  }`}
                >
                  {channel}
                </button>
              ))}
            </div>

            {/* 동행글 검색창*/}
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
          </div>

          {/* 필터,정렬 */}
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
                  className="flex items-center text-xl font-semibold cursor-pointer"
                >
                  {sort}
                  <img src="/images/sortbutton.jpg" alt="정렬" />
                </button>

                {/* 정렬 툴팁 */}
                {sortToggle && (
                  <div className="absolute top-10 min-w-[100px] bg-white border border-gray-300">
                    {["최신순", "인기순", "오래된순"].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSort(option);
                          setSortToggle(false);
                        }}
                        className="px-4 py-2 text-left cursor-pointer"
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

          {/* 게시글들 */}

          {/* 게시글 추가 버튼 */}
          <div className="absolute bottom-6 right-4.5 flex items-center group z-50">
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

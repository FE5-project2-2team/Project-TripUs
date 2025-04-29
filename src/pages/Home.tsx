import { useState } from "react";
export default function Home() {
  const [selected, setSelected] = useState("전체글");
  const categories = ["전체글", "동행원 모집", "여행후기", "긴급 모집"];
  return (
    <>
      <div className="p-4">
        {/* 이미지슬라이드 */}

        {/* 배너(전체글, 동행원 모집, 여행 후기, 긴급 모집) */}
        <div className="flex gap-2 mb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelected(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${
                selected === category
                  ? "bg-[#06B796] text-white"
                  : "bg-white text-gray-800 border border-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {/* 동행글 검색창 */}
        <label htmlFor="search" className="block mb-4">
          <input
            id="search"
            type="text"
            placeholder="동행 및 후기글을 검색해보세요."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        {/* 유저사이드바 <div>검색, 사용자 정렬</div>*/}
        <div className="flex justify-between mt-6">
          <div>{/* 키워드 필터 (예: 나이, 성별 등) */}</div>
          <div>{/* 정렬 버튼 (예: 최신순, 인기순 등) */}</div>
        </div>
        {/* 오른쪽 아래에 게시글 추가 버튼 호버시"게시글 추가", 위치 고정(absolute) */}
        {/* 게시글 추가 버튼 (오른쪽 하단 고정) */}
        <button className="fixed bottom-6 right-6 bg-[#06B796] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#05a07f] transition">
          게시글 추가
        </button>
        {/* 포스트 한줄에 3개씩 정렬+ 스크롤바로 헤더 제외하고 내려가도록*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 overflow-y-auto h-[calc(100vh-200px)]">
          {/* 예시 포스트 카드 */}
          <div className="p-4 border rounded shadow">게시글 1</div>
          <div className="p-4 border rounded shadow">게시글 2</div>
          <div className="p-4 border rounded shadow">게시글 3</div>
          {/* 실제 데이터 맵으로 처리하면 됨 */}
        </div>
      </div>
    </>
  );
}

// 헤더도 건드려야하나?

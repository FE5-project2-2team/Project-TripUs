import { Korean } from "flatpickr/dist/l10n/ko.js";
import "flatpickr/dist/themes/material_blue.css";
import { useState } from "react";
import Flatpickr from "react-flatpickr";
import { Link } from "react-router";

export default function PostCreate() {
  const [channel, setChannel] = useState("crews");
  const [member, setMember] = useState("");
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  return (
    <div className="flex justify-center items-center">
      <main className="font-[Noto-Sans]">
        <form action="">
          <div className="grid grid-cols-2 gap-15">
            <div>
              <label htmlFor="selectChannel" className="input-label-style">
                게시판 선택
              </label>
              <select
                onChange={(e) => setChannel(e.target.value)}
                value={channel}
                name="channels"
                id="selectChannel"
                className="input-style"
              >
                <option value="crews">동행원 모집</option>
                <option value="reviews">여행 후기글</option>
              </select>
            </div>
            <div>
              <label htmlFor="recruitMember" className="input-label-style">
                모집 인원
              </label>
              <select
                onChange={(e) => setMember(e.target.value)}
                value={member}
                name="channels"
                id="selectChannel"
                className="input-style"
              >
                {Array.from({ length: 9 }, (_, idx) => idx + 2).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="location" className="input-label-style">
                지역 입력
              </label>
              <input
                value={location}
                type="text"
                placeholder="지역 입력"
                onChange={(e) => setLocation(e.target.value)}
                className="input-style"
              />
            </div>
            <div>
              <label htmlFor="date" className="input-label-style">
                일정 선택
              </label>
              <Flatpickr
                id="date"
                className="input-style"
                options={{
                  mode: "range",
                  dateFormat: "Y-m-d",
                  closeOnSelect: false,
                  locale: Korean,
                }}
                value={dateRange}
                onChange={(selctedDates: Date[]) => {
                  if (selctedDates.length === 2) setDateRange(selctedDates);
                }}
                placeholder="일정 선택"
              />
            </div>
          </div>

          <div className="flex flex-col gap-10 my-13">
            <div>
              <label htmlFor="title" className="input-label-style">
                제목
              </label>
              <input
                id="title"
                type="text"
                placeholder="제목을 입력해 주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#F9F9F9] w-full p-5 rounded-[10px]"
              />
            </div>
            <div>
              <label htmlFor="contents" className="input-label-style">
                내용
              </label>
              <input
                id="contents"
                type="text"
                placeholder="내용을 입력해 주세요 (1000자 이내)"
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                className="bg-[#F9F9F9] w-full h-100 p-5 rounded-[10px]"
              />
            </div>
            <div>
              <label htmlFor="image" className="input-label-style">
                사진
              </label>
              <input
                type="text"
                id="image"
                className="bg-[#F9F9F9] w-full p-5 rounded-[10px]"
              />
            </div>
            <fieldset>
              <legend className="font-bold mb-5">
                동행조건(다중 선택 가능)
              </legend>
              <label className="input-label-style" htmlFor="gender">
                성별
              </label>
              <ul className="flex gap-5 text-base">
                {["남성", "여성"].map((item) => (
                  <li>
                    <button className="condition-button-style">{item}</button>
                  </li>
                ))}
              </ul>
              <label className="input-label-style mt-7" htmlFor="gender">
                나이
              </label>
              <ul className="flex gap-5 text-base">
                {[20, 30, 40, 50, 60].map((item) => (
                  <li>
                    <button className="condition-button-style">
                      {item === 60 ? `${item}대+` : `${item}대`}
                    </button>
                  </li>
                ))}
              </ul>
            </fieldset>
          </div>
          <div className="flex items-center justify-between">
            <Link to={"/"}>나가기</Link>
            <button className="bg-[#06b796] text-white px-[50px] py-[18px] rounded-[10px] text-xl hover:bg-[#4b834e] hover:cursor-pointer">
              등록하기
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

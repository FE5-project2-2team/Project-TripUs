import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Korean } from "flatpickr/dist/l10n/ko.js";
import "flatpickr/dist/themes/material_blue.css";
import { useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import { Link } from "react-router";
import CondList from "./CondList";
import Contents from "./Contents";
import LabelSelect from "./LabelSelect";
import UploadImage from "./UploadImage";

export default function PostForm() {
  const [channel, setChannel] = useState("681034285e1cfa1c37000059");
  const [member, setMember] = useState("2");
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [title, setTitle] = useState("");
  const [condLIst, setCondList] = useState<string[]>([]);
  const contents = useRef<HTMLDivElement>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const detailData = {
      title,
      member,
      location,
      dateRange,
      isRecruiting: true,
      recruitCondition: condLIst,
      contents: contents.current?.innerHTML,
    };
    const postData = {
      title: detailData,
      image: null,
      channelId: channel,
    };
    console.log(postData);
  };

  const conditionBtnHandler = (item: string) => {
    setCondList((list) =>
      list.find((cond) => cond === item)
        ? list.filter((cond) => cond !== item)
        : [...list, item]
    );
  };

  const selectChangeHandler = (value: string, id: string) => {
    if (id === "selectChannel") {
      setChannel(value);
    } else {
      setMember(value);
    }
  };

  return (
    <form onSubmit={(e) => submitHandler(e)} action="">
      <div className="grid grid-cols-2 gap-15">
        <LabelSelect
          value={channel}
          name="게시판 선택"
          id="selectChannel"
          handler={selectChangeHandler}
        >
          <option value="cre681034285e1cfa1c37000059">동행원 모집</option>
          <option value="reviews">여행 후기글</option>
        </LabelSelect>
        <LabelSelect
          value={member}
          name="모집 인원"
          id="recruitMember"
          handler={selectChangeHandler}
        >
          {Array.from({ length: 9 }, (_, idx) => idx + 2).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </LabelSelect>
        <div>
          <label htmlFor="location" className="input-label-style">
            지역 입력
          </label>
          <input
            value={location}
            id="location"
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
        <Contents ref={contents} />
        <UploadImage />
        <fieldset>
          <legend className="input-label-style">
            동행조건(다중 선택 가능)
          </legend>
          <CondList
            name="성별"
            list={["남성", "여성"]}
            handler={conditionBtnHandler}
          />
          <CondList
            name="나이"
            list={["20", "30", "40", "50", "60"]}
            handler={conditionBtnHandler}
          />
        </fieldset>
      </div>
      <div className="flex items-center justify-between mb-10">
        <Link to={"/"}>
          <div className="flex justify-center items-center gap-4">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="text-xl">나가기</span>
          </div>
        </Link>
        <button
          type="submit"
          className="bg-[#06b796] text-white px-[50px] py-[18px] rounded-[10px] text-xl hover:bg-[#038383] hover:cursor-pointer"
        >
          등록하기
        </button>
      </div>
    </form>
  );
}

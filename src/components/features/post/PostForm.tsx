import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Korean } from "flatpickr/dist/l10n/ko.js";
import "flatpickr/dist/themes/material_blue.css";
import { useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import { Link, useNavigate } from "react-router";
import { createPost } from "../../../apis/post";
import { CHANNELS } from "../../../constants/channels";
import { useAuthStore } from "../../../store/authStore";
import Contents from "./Contents";
import InputBtn from "./InputBtn";
import LabelSelect from "./LabelSelect";
import UploadImage from "./UploadImage";

export default function PostForm() {
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.userId);

  const [channel, setChannel] = useState(CHANNELS.RECRUITMENT);
  const [member, setMember] = useState("2");
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [title, setTitle] = useState("");
  const [showImages, setShowImages] = useState<string[]>([]);
  const [condition, setCondition] = useState<{
    gender: string;
    ageRange: string[];
  }>({
    gender: "",
    ageRange: [],
  });
  const contents = useRef<HTMLDivElement>(null);
  const ImageListRef = useRef<File[]>([]);

  const selectChangeHandler = (value: string, id: string) => {
    if (id === "selectChannel") {
      setChannel(value);
    } else {
      setMember(value);
    }
  };

  const addImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFiles = e.target.files!;
    ImageListRef.current = [...ImageListRef.current, ...imageFiles];
    const imageUrlList = [...imageFiles]
      .filter((file) => file.type.startsWith("image/"))
      .map((imageFile) => URL.createObjectURL(imageFile));
    if (showImages.length <= 10) {
      setShowImages((list) => {
        const result = [...list, ...imageUrlList];
        return result.slice(0, 10);
      });
    }
  };

  const encodeImages = (
    images: File[]
  ): Promise<(string | ArrayBuffer | null)[]> => {
    const promises = images.map((image) => {
      return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(image);
      });
    });
    return Promise.all(promises);
  };

  const removeImageHandler = (image: string) => {
    setShowImages((images) => images.filter((img) => image !== img));
  };

  const radioBtnHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCondition((cond) => ({ ...cond, gender: e.target.value }));
  };
  const checkBoxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCondition((cond) => ({
      ...cond,
      ageRange: cond.ageRange.find((age) => age === e.target.value)
        ? cond.ageRange.filter((age) => age !== e.target.value)
        : [...cond.ageRange, e.target.value],
    }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encodedImages = await encodeImages(ImageListRef.current);
    if (
      title === "" ||
      location === "" ||
      dateRange.length === 0 ||
      condition.gender === "" ||
      condition.ageRange.length === 0 ||
      contents.current!.innerText.trim() === ""
    ) {
      alert("입력 정보가 부족합니다");
      return;
    }
    const detailData: PostData = {
      title,
      memberLimit: Number(member),
      memberList: [userId!],
      applicantList: [],
      location,
      dateRange,
      isRecruiting: true,
      images: encodedImages,
      recruitCondition: condition,
      contents: contents.current!.innerHTML,
    };
    const postData = {
      title: JSON.stringify(detailData),
      image: ImageListRef.current[0] || null,
      channelId: channel,
    };
    console.log(postData.title);
    const postId = await createPost(postData);
    navigate(`/post/detail/${postId}`);
  };

  return (
    <form className="mt-10" onSubmit={(e) => submitHandler(e)} action="">
      <div className="grid grid-cols-2 gap-15">
        <LabelSelect
          value={channel}
          name="게시판 선택"
          id="selectChannel"
          handler={selectChangeHandler}
        >
          <option value={CHANNELS.RECRUITMENT}>동행원 모집</option>
          <option value={CHANNELS.REVIEW}>여행 후기글</option>
        </LabelSelect>
        <LabelSelect
          value={member}
          name="인원"
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
          <label htmlFor="location" className="post-input-title">
            지역 입력
          </label>
          <input
            value={location}
            id="location"
            type="text"
            placeholder="지역 입력"
            onChange={(e) => setLocation(e.target.value)}
            className="input-style placeholder:text-[#CDCDCD]"
          />
        </div>
        <div>
          <label htmlFor="date" className="post-input-title">
            일정 선택
          </label>
          <Flatpickr
            id="date"
            className="input-style placeholder:text-[#CDCDCD]"
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
          <label htmlFor="title" className="post-input-title">
            제목
          </label>
          <input
            id="title"
            type="text"
            placeholder="제목을 입력해 주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#F9F9F9] w-full p-5 rounded-[10px] placeholder:text-[#CDCDCD]"
          />
        </div>
        <Contents ref={contents} />
        <UploadImage
          removeImageHandler={removeImageHandler}
          addImageHandler={addImageHandler}
          showImages={showImages}
        />
        <div>
          <span className="post-input-title mb-4">동행조건</span>
          <fieldset className="mb-[30px]">
            <legend className="mb-[10px]">성별 (단일 선택)</legend>
            <InputBtn
              type="radio"
              onChange={radioBtnHandler}
              value="성별무관"
              name="gender"
            >
              성별무관
            </InputBtn>
            <InputBtn
              type="radio"
              onChange={radioBtnHandler}
              value="남성"
              name="gender"
            >
              남성
            </InputBtn>
            <InputBtn
              type="radio"
              onChange={radioBtnHandler}
              value="여성"
              name="gender"
            >
              여성
            </InputBtn>
          </fieldset>
          <fieldset>
            <legend className="mb-[10px]">나이 (다중 선택 가능)</legend>
            {["20대", "30대", "40대", "50대", "60대"].map((age, index) => (
              <InputBtn
                type="checkbox"
                onChange={checkBoxHandler}
                value={age}
                name="ageRange"
              >
                {age}
                {index === 4 && "+"}
              </InputBtn>
            ))}
          </fieldset>
        </div>
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

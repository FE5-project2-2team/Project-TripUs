import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Contents({
  ref,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  const [contentsLength, setContentsLength] = useState(0);
  const changeHandler = (e: React.ChangeEvent<HTMLDivElement>) => {
    setContentsLength(e.target.textContent!.length);
  };
  return (
    <div>
      <label htmlFor="contents" className="post-input-title">
        내용
      </label>
      <div className="relative bg-[#F9F9F9] max-w-[1084px] h-100 p-5 rounded-[10px] overflow-y-scroll">
        <div
          onInput={changeHandler}
          ref={ref}
          contentEditable
          className={
            "cursor-text focus:outline-0 empty:before:content-['내용을\\00a0입력해\\00a0주세요\\00a0(1000자\\00a0이내)'] empty:before:text-[#CDCDCD]"
          }
        ></div>
        <span
          className={twMerge(
            "absolute bottom-3 right-3 text-[#CDCDCD]",
            contentsLength >= 1000 && "text-[#fa5204]"
          )}
        >
          {contentsLength} / 1000
        </span>
      </div>
    </div>
  );
}

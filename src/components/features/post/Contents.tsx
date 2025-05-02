export default function Contents({
  ref,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div>
      <label htmlFor="contents" className="post-input-title">
        내용
      </label>
      <div className="bg-[#F9F9F9] w-full h-100 p-5 rounded-[10px] overflow-scroll">
        <div
          ref={ref}
          contentEditable
          className={
            "cursor-text focus:outline-0 empty:before:content-['내용을\\00a0입력해\\00a0주세요\\00a0(1000자\\00a0이내)'] empty:before:text-[#CDCDCD]"
          }
        ></div>
      </div>
    </div>
  );
}

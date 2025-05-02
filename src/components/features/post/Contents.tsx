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
      <div
        ref={ref}
        className="bg-[#F9F9F9] w-full h-100 p-5 rounded-[10px] overflow-scroll"
      >
        <div contentEditable className="focus:outline-0"></div>
      </div>
    </div>
  );
}

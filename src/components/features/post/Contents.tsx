import ImageResize from "quill-image-resize-module-plus";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const Size = Quill.import("formats/size") as { whitelist: string[] };
Size.whitelist = ["small", "normal", "large", "huge"];
Quill.register("formats/size", Size, true);

Quill.register("modules/imageResize", ImageResize);
export default function Contents({
	contentsRef
}: {
	contentsInputs: {
		value: string;
		onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	};
	contentsRef: React.RefObject<ReactQuill | null>;
}) {
	return (
		<div>
			<label htmlFor="contents" className="post-input-title">
				내용
			</label>
			<ReactQuill
				ref={contentsRef}
				theme="snow"
				placeholder="내용을 입력해 주세요 (1000자 이내)"
				className="h-125 mb-[30px]"
				modules={{
					toolbar: [
						[{ size: ["small", false, "large", "huge"] }],
						["bold", "italic", "underline", "strike"],
						["link", "image"]
					],
					imageResize: {}
				}}
			/>
		</div>
	);
}

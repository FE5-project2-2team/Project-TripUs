import ImageResize from "quill-image-resize-module-plus";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { usePostForm } from "../../../hooks/usePostForm";

const Size = Quill.import("formats/size") as { whitelist: string[] };
Size.whitelist = ["small", "normal", "large", "huge"];
Quill.register("formats/size", Size, true);

Quill.register("modules/imageResize", ImageResize);
export default function Contents({
	contentsRef
}: {
	contentsRef: React.RefObject<ReactQuill | null>;
}) {
	const { handlers: ImageHandler } = usePostForm();
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
					toolbar: {
						container: [
							[{ size: ["small", false, "large", "huge"] }],
							["bold", "italic", "underline", "strike"],
							["link", "image"]
						],
						handlers: {
							image: ImageHandler
						}
					},
					imageResize: {}
				}}
			/>
		</div>
	);
}

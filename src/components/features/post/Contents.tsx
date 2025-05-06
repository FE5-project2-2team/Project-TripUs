import axios from "axios";
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
	contentsRef: React.RefObject<ReactQuill | null>;
}) {
	const ImageHandler = async () => {
		if (!contentsRef.current) return;

		const quillInstance = contentsRef.current.getEditor();
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();

		input.onchange = async () => {
			const file = input.files?.[0] as File;
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", "postImages");

			try {
				const { data } = await axios.post(
					"https://api.cloudinary.com/v1_1/dopw7udhj/image/upload",
					formData
				);
				const range = quillInstance.getSelection(true);
				quillInstance.insertEmbed(range.index, "image", data.secure_url);
				quillInstance.setSelection(range.index + 1);
			} catch (error) {
				console.error(error);
			}
		};
	};

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

import { useRef, useState } from "react";
import ReactQuill from "react-quill-new";

export default function CustomImage({
	contentsRef,
	image,
	removeImageHandler
}: {
	contentsRef: React.RefObject<ReactQuill | null>;
	image: string;
	removeImageHandler: (image: string) => void;
}) {
	const [isClicked, setIsClicked] = useState(false);
	const imgRef = useRef<HTMLImageElement | null>(null);
	const handleInsertImage = () => {
		if (isClicked) return;
		const editor = contentsRef.current?.getEditor();
		if (!editor) return;

		const range = editor?.getSelection(true);
		if (range) {
			editor?.insertEmbed(range.index, "image", image);
			editor?.setSelection(range.index + 1);
		}
		setIsClicked(true);
	};
	return (
		<div className="relative">
			<img
				ref={imgRef}
				src={image}
				className="h-[46px] max-w-22 cursor-pointer hover:brightness-90"
				onClick={handleInsertImage}
			/>
			<div onClick={() => removeImageHandler(image)}>제거</div>
		</div>
	);
}

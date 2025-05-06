import ReactQuill from "react-quill-new";

export default async function urlToFile(
	contents: React.RefObject<ReactQuill | null>
) {
	const url = contents.current
		?.getEditor()
		.getContents()
		.ops.filter(
			(content) => typeof content.insert === "object" && content.insert.image
		)
		.map((content) => (content.insert as { image: string }).image);
	if (url && url.length) {
		try {
			const response = await fetch(url[0]);
			const blob = await response.blob();
			return new File([blob], "uploaded-image.jpg", { type: "image/jpeg" });
		} catch (error) {
			console.error(error);
		}
	}
}

import { useRef, useState } from "react";

export function useImage() {
	const [showImages, setShowImages] = useState<string[]>([]);
	const ImageListRef = useRef<File[]>([]);
	const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
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

	const removeImage = (image: string) => {
		setShowImages((images) => images.filter((img) => image !== img));
	};

	return { showImages, ImageListRef, addImage, removeImage };
}

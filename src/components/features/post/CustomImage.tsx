import { ComponentPropsWithoutRef, useState } from "react";

type ImageProps = ComponentPropsWithoutRef<"img"> & {
	image: string;
};
export default function CustomImage(props: ImageProps) {
	const { image, ...rest } = props;
	const [isDraggable, setIsDraggable] = useState(true);
	return (
		<img
			onDragStart={(e) => {
				e.dataTransfer.setData("text/plain", image);
				setIsDraggable(false);
			}}
			draggable={isDraggable}
			src={image}
			className="h-[46px] max-w-22 cursor-pointer hover:brightness-90"
			{...rest}
		/>
	);
}

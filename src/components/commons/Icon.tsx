export default function Icon({
	size,
	position,
	hoverPosition,
	hovered
}: {
	size: string;
	position: string;
	hovered?: boolean;
	hoverPosition?: string;
}) {
	return (
		<span
			className={`group-hover:[] inline-block bg-no-repeat bg-[url('/images/spriteImages1.png')]`}
			style={{
				width: size,
				height: size,
				backgroundPosition: hovered ? hoverPosition : position,
				backgroundSize: "245px 380px"
			}}
		/>
	);
}

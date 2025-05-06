import { useHover } from "react-use";
import Icon from "./Icon";

export default function ModalItem(props: {
	children: React.ReactNode;
	clickHandler: () => void;
	size: string;
	position: string;
	hoverPosition?: string;
}) {
	const { children, clickHandler, ...rest } = props;
	const element = (hovered: boolean) => (
		<li
			onClick={clickHandler}
			className="flex gap-2 items-center group cursor-pointer p-2 rounded-lg hover:bg-[#E0F4F2] hover:text-[#06B796]"
		>
			<Icon hovered={hovered} {...rest} />
			{children}
		</li>
	);
	const [hoverable] = useHover(element);
	return <div>{hoverable}</div>;
}

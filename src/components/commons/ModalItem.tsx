export default function ModalItem({
	children,
	clickHandler
}: {
	children: React.ReactNode;
	clickHandler: () => void;
}) {
	return (
		<>
			<li
				onClick={clickHandler}
				className="group cursor-pointer p-2 rounded-lg hover:bg-[#E0F4F2] hover:text-[#06B796] flex items-center"
			>
				{children}
			</li>
		</>
	);
}

type SelectProps = React.ComponentPropsWithoutRef<"select"> & {
	label: string;
};
export default function LabelSelect(props: SelectProps) {
	const { children, id, label, ...rest } = props;
	return (
		<div>
			<label htmlFor={id} className="post-input-title">
				{label}
			</label>
			<select className="input-style cursor-pointer" id={id} {...rest}>
				{children}
			</select>
		</div>
	);
}

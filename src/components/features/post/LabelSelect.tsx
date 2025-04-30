type SelectProps = React.ComponentPropsWithoutRef<"select"> & {
  handler: (value: string, id: string) => void;
};
export default function LabelSelect(props: SelectProps) {
  const { children, value, id, name, handler } = props;
  return (
    <div>
      <label htmlFor={id} className="input-label-style">
        {name}
      </label>
      <select
        onChange={(e) => handler(e.target.value, id!)}
        value={value}
        className="input-style"
        id={id}
      >
        {children}
      </select>
    </div>
  );
}

type SelectProps = React.ComponentPropsWithoutRef<"select"> & {
    handler: (value: string, id: string) => void;
  };
  export default function LabelSelect(props: SelectProps) {
    const { children, value, id, name, handler } = props;
    return (
      <div>
        <label htmlFor={id} className="post-input-title">
          {name}
        </label>
        <select
          onChange={(e) => handler(e.target.value, id!)}
          value={value}
          className="input-style cursor-pointer"
          id={id}
        >
          {children}
        </select>
      </div>
    );
  }
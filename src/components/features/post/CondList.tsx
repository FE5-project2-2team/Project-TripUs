import { useState } from "react";

export default function CondList({
  name,
  list,
  handler,
}: {
  name: string;
  list: string[];
  handler: (item: string) => void;
}) {
  const [isSelected, setIsSelected] = useState<boolean[]>(
    Array.from({ length: list.length }, () => false)
  );
  return (
    <div className="my-4">
      <label className="input-label-style text-base">{name}</label>
      <ul className="flex gap-5 text-base">
        {list.map((item, index) => (
          <li key={index}>
            <button
              onClick={(e) => {
                e.preventDefault();
                handler(item);
                setIsSelected((items) =>
                  items.map((select, idx) => (idx === index ? !select : select))
                );
              }}
              className={isSelected[index] ? "cond-btn-active" : "cond-btn"}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  reverse?: boolean;
};

export default function Button(props: ButtonProps) {
  const { children, className, reverse } = props;
  return (
    <button
      className={twMerge(
        "text-xl/snug box-border block rounded-[10px] py-[18px] text-center font-bold cursor-pointer",
        reverse
          ? "bg-white text-[#06b796] border border-[#06b796]"
          : "bg-[#06b796] text-white",
        className
      )}
    >
      {children}
    </button>
  );
}

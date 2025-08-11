import React from "react";

type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function Subtitle({ children, className = "" }: TitleProps) {
  return (
    <h4
      className={`text-[18px] font-semibold text-white tracking-tight ${className}`}
    >
      {children}
    </h4>
  );
}

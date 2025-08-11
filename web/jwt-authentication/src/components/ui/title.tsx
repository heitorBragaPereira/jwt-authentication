import React from "react";

type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function Title({ children, className = "" }: TitleProps) {
  return (
    <h3
      className={`scroll-m-20 text-[22px] font-bold text-white tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
}

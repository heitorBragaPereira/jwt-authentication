import React from "react";

type TitleProps = {
  path: string;
  children: React.ReactNode;
  className?: string;
};

export function Link({ children, className = "", path }: TitleProps) {
  return (
    <a
      href={path}
      className={`text-[12px] text-blue-600 underline ${className}`}
    >
      {children}
    </a>
  );
}

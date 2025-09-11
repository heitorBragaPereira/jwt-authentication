import React from "react";

export default function loader() {
  return (
    <span
      className="
        relative inline-block w-5 h-5 
        rounded-full border-2 border-white 
        box-border animate-[spin_1s_linear_infinite]
        after:content-[''] after:absolute 
        after:left-1/2 after:top-1/2 
        after:-translate-x-1/2 after:-translate-y-1/2 
        after:w-7 after:h-7 
        after:rounded-full after:border-2 
        after:border-solid after:border-primary 
        after:border-r-transparent after:border-l-transparent
      "
    />
  );
}

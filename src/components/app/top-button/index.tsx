"use client";
import { FaAngleDoubleUp } from "react-icons/fa";

export const TopButton = () => {
  return (
    <div
      className="sticky bottom-4 self-end p-2 cursor-pointer rounded-full border-[0.01rem] border-grey-02"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      <FaAngleDoubleUp size={"1rem"} />
    </div>
  );
};

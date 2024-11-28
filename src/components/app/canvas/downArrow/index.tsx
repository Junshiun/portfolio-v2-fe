"use client";
import { useTimerContext } from "@/context/timer";
import { FaAngleDoubleDown } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export const DownArrow = (props: { navigateTo: string }) => {

  const timerContext = useTimerContext();

  return (
    <div
      className={twMerge("absolute bottom-[20%] left-0 right-0 m-auto w-fit animate-bounce cursor-pointer p-4 opacity-0 transition-opacity duration-[2s]", timerContext?.timerCompleted && "!opacity-100")}
      onClick={() => {
        const element = document.getElementById(props.navigateTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      <FaAngleDoubleDown size={"1.5rem"} />
    </div>
  );
};

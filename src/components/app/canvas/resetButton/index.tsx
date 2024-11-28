import { GrPowerReset } from "react-icons/gr";
import { TCanvasRenderer } from "../type";
import { RefObject } from "react";
import { twMerge } from "tailwind-merge";
import { useTimerContext } from "@/context/timer";

export const ResetButton = (props: {
  canvasRendererRef: RefObject<TCanvasRenderer>;
}) => {
  const timerContext = useTimerContext();

  return (
    <div
      className={twMerge(
        "absolute top-4 right-4 cursor-pointer bg-black rounded-full p-2 opacity-0 transition-opacity duration-[2s]",
        timerContext?.timerCompleted && "!opacity-100",
      )}
      onClick={() => {
        props.canvasRendererRef.current?.resetCamera();
      }}
    >
      <GrPowerReset size={"1rem"} />
    </div>
  );
};

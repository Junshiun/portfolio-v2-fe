import { Dispatch } from "react";

export type TTimerContext = {
    timerCompleted: boolean;
    setTimerCompleted: Dispatch<boolean>;
    startTimer: () => void
}
import { createContext, PropsWithChildren, useContext, useState } from "react"
import { TTimerContext } from "./type";

const TimerContext = createContext<TTimerContext | null>(null);

export const TimerProvider = (props: PropsWithChildren<{
    duration: number
}>) => {

    const [timerCompleted, setTimerCompleted] = useState(false);

    const startTimer = () => {
        setTimeout(() => {
            setTimerCompleted(true);            
        }, props.duration);
    }

    return (
        <TimerContext.Provider value={{timerCompleted, setTimerCompleted, startTimer}}>
            {props.children}
        </TimerContext.Provider>
    )
}

export const useTimerContext = () => useContext(TimerContext)
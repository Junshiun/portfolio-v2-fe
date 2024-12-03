import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SwipeableHandlers } from "react-swipeable";
import { twJoin } from "tailwind-merge";

export const TranslateXContainer = (props: {
  swipeHandler: SwipeableHandlers;
  data: unknown[];
  main: JSX.Element;
  highlightState: {
    highlight: {
      status: boolean;
      index: number;
    };
    setHighlight: Dispatch<
      SetStateAction<{
        status: boolean;
        index: number;
      }>
    >;
  };
  iterableComponent: JSX.Element[] | JSX.Element;
  className?: string;
}) => {
  // const [ highlight, setHighlight ] = useState<{
  //     status: boolean,
  //     index: number
  // }>({
  //     status: false,
  //     index: 0
  // });
  // const defferedHighlight = useDeferredValue(props.highlightState.highlight);
  const highlightGetter = props.highlightState.highlight;

  return (
    <motion.div
      className={`w-[200%] h-full grid grid-cols-2 //transition-transform //duration-500 will-change-transform //ease-in-out ${props.className}`}
      animate={{ x: highlightGetter.status ? "-50%" : 0 }}
      transition={{ duration: 0.4 }}
    >
      {props.main}
      <div className="grid grid-rows-[4rem_1fr]">
        <span
          className="flex items-center w-fit cursor-pointer"
          onClick={() =>
            props.highlightState.setHighlight((prev) => {
              return {
                ...prev,
                status: false,
              };
            })
          }
        >
          <IoIosArrowBack className="m-4 h-6" />
          Back
        </span>
        <div
          {...props.swipeHandler}
          className="relative overflow-hidden w-full h-full p-4 md:p-8"
        >
          {Array.isArray(props.iterableComponent) ? (
            props.iterableComponent[highlightGetter.index]
          ) : (
            <div
              className="//w-fit grid grid-flow-col auto-cols-[100%] gap-4 transition-transform duration-1000 ease-out h-full will-change-transform"
              style={{
                transform: `translateX(calc(-${highlightGetter.index * 100}% - ${highlightGetter.index * 1}rem))`,
              }}
            >
              {props.iterableComponent}
            </div>
          )}
          <div
            className={twJoin(
              "z-10 absolute h-fit top-0 bottom-0 left-4 m-auto rounded-[50%] overflow-hidden div-with-bg-01 p-4 cursor-pointer //hover:after:bg-yellow-01",
              `opacity-${highlightGetter.index > 0 ? 100 : 0}`,
            )}
            onClick={() => {
              props.highlightState.setHighlight((prev) => {
                return prev.index > 0
                  ? {
                      ...prev,
                      index: prev.index - 1,
                    }
                  : prev;
              });
            }}
          >
            <IoIosArrowBack />
          </div>
          <div
            className={twJoin(
              "z-10 absolute h-fit top-0 bottom-0 right-4 rounded-[50%] overflow-hidden div-with-bg-01 p-4 self-center justify-self-end cursor-pointer //hover:after:bg-yellow-01",
              `opacity-${highlightGetter.index < props.data.length - 1 ? 100 : 0}`,
            )}
            onClick={() => {
              props.highlightState.setHighlight((prev) => {
                return prev.index < props.data.length - 1
                  ? {
                      ...prev,
                      index: prev.index + 1,
                    }
                  : prev;
              });
            }}
          >
            <IoIosArrowForward />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

"use client";
import { TranslateXContainer } from "@/components/translateX-container";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

export const GalleryWrapper = (props: { images: string[] }) => {
  const [highlight, setHighlight] = useState<{
    status: boolean;
    index: number;
  }>({
    status: false,
    index: 0,
  });

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setHighlight((prev) => {
        return prev.index < props.images.length - 1
          ? {
              ...prev,
              index: prev.index + 1,
            }
          : prev;
      }),
    onSwipedRight: () =>
      setHighlight((prev) => {
        return prev.index > 0
          ? {
              ...prev,
              index: prev.index - 1,
            }
          : prev;
      }),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className="h-80 //min-h-80 md:!h-full md:col-span-2 md:row-span-2 md:col-start-3 md:row-start-1 overflow-hidden div-with-bg-01">
      <TranslateXContainer
        swipeHandler={handlers}
        data={props.images}
        highlightState={{ highlight, setHighlight }}
        main={
          <div className="//h-full p-4 justify-items-center grid gap-4 grid-rows-[4rem_1fr] [&_*]:text-grey-01 text-grey-01 //overflow-hidden">
            <span className="h-full flex items-center">Gallery</span>
            {/* <div className="w-full h-full overflow-hidden"> */}
            <div className="max-h-full h-full w-full group grid grid-cols-[repeat(3,1fr)] grid-rows-[repeat(3,1fr)] //auto-rows-fr gap-4 //overflow-hidden">
              {props.images.map((image, index) => {
                return (
                  <div
                    key={`gallery-${index}`}
                    className="//w-full h-full rounded //overflow-hidden group-hover:[filter:brightness(0.2)] hover:![filter:brightness(1)] transition-all cursor-pointer"
                    onClick={() =>
                      setHighlight({
                        status: true,
                        index,
                      })
                    }
                    style={{
                      background: `url(${image})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {/* <img className="h-full object-fit group-hover:[filter:brightness(0.2)] hover:![filter:brightness(1)] transition-all cursor-pointer" src={image}></img> */}
                    {/* 123 */}
                  </div>
                );
              })}
            </div>
            {/* </div> */}
          </div>
        }
        iterableComponent={
          <>
            {props.images.map((image, index) => {
              return (
                <div
                  key={`gallery-${index}`}
                  className="w-full h-full rounded overflow-hidden"
                  style={{
                    background: `url(${image})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  {/* 123 */}
                  {/* <img className="h-full object-contain" src={image}></img> */}
                </div>
              );
            })}
          </>
        }
      />
      {/* <div className={twJoin("w-[200%] h-full grid grid-cols-2 transition-transform", highlight.status && "[transform:translateX(-50%)]")}>
                <div className="h-fit p-4 justify-items-center grid gap-4 grid-rows-[4rem_1fr] [&_*]:text-grey-01 text-grey-01">
                    <span className="h-full flex items-center">
                        Gallery
                    </span>
                    <div className="w-full overflow-hidden">
                        <div className="group grid grid-cols-3 grid-rows-3 gap-4">
                            {
                                props.images.map((image, index) => {
                                    return (
                                        <div key={`gallery-${index}`} className="w-full h-full rounded overflow-hidden" onClick={() => setHighlight({
                                            status: true,
                                            imageIndex: index
                                        })}>
                                            <img className="group-hover:[filter:brightness(0.2)] hover:![filter:brightness(1)] transition-all cursor-pointer" src={image}></img>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-around">
                    <span className="flex items-center w-fit cursor-pointer" onClick={() => setHighlight(prev => {
                        return {
                            ...prev,
                            status: false
                        }
                    })}>
                        <IoIosArrowBack className="m-4 h-6"/>Back
                    </span>
                    <div {...handlers} className="relative overflow-hidden w-full p-4 md:p-8">
                        <div className="w-fit grid grid-flow-col auto-cols-[100%] gap-4 transition-transform" style={{
                            transform: `translateX(calc(-${highlight.imageIndex*100}% - ${highlight.imageIndex*1}rem))`
                        }}>
                            {
                                props.images.map((image, index) => {
                                    return (
                                        <div key={`gallery-${index}`} className="w-full h-full rounded overflow-hidden">
                                            <img src={image}></img>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="absolute z-10 inset-0 w-full h-full grid grid-cols-2">
                            <div className={twJoin("rounded-[50%] overflow-hidden m-4 div-with-bg-01 p-4 self-center justify-self-start cursor-pointer hover:after:bg-yellow-01", `opacity-${highlight.imageIndex>0?100:0}`)} onClick={() => {
                                setHighlight(prev => {
                                    return prev.imageIndex > 0? {
                                        ...prev,
                                        imageIndex: prev.imageIndex - 1
                                    }: prev
                                })
                            }}>
                                <IoIosArrowBack/>
                            </div>
                            <div className={twJoin("rounded-[50%] overflow-hidden m-4 div-with-bg-01 p-4 self-center justify-self-end cursor-pointer hover:after:bg-yellow-01", `opacity-${highlight.imageIndex< props.images.length - 1?100:0}`)} onClick={() => {
                                setHighlight(prev => {
                                    return prev.imageIndex < props.images.length - 1? {
                                        ...prev,
                                        imageIndex: prev.imageIndex + 1
                                    }: prev
                                })
                            }} >
                                <IoIosArrowForward/>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
    </div>
  );
};

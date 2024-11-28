import { GrPowerReset } from "react-icons/gr";
import { TCanvasRenderer } from "../type";
import { RefObject } from "react";
import { motion } from "framer-motion";

export const ResetButton = (props: {
  canvasRendererRef: RefObject<TCanvasRenderer>;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeInOut",
        opacity: {
          delay: 5,
        },
        duration: 2,
      }}
      className="absolute top-4 right-4 cursor-pointer bg-black rounded-full p-2"
      onClick={() => {
        props.canvasRendererRef.current?.resetCamera();
      }}
    >
      <GrPowerReset size={"1rem"} />
    </motion.div>
  );
};

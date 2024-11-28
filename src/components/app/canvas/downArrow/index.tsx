"use client";
import { motion } from "framer-motion";
import { FaAngleDoubleDown } from "react-icons/fa";

export const DownArrow = (props: { navigateTo: string }) => {
  return (
    <motion.div
      className="absolute bottom-[20%] left-0 right-0 m-auto w-fit animate-bounce cursor-pointer p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{
        ease: "easeInOut",
        opacity: {
          delay: 5,
        },
        duration: 2,
      }}
      onClick={() => {
        const element = document.getElementById(props.navigateTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      <FaAngleDoubleDown size={"1.5rem"} />
    </motion.div>
  );
};

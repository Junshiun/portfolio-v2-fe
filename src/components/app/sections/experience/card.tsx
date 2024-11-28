"use client";
import { TExperienceProps } from "@/context/app-config/type";
import Statics from "@/statics";
import Image from "next/image";

export const ExperienceCard = (props: { data: TExperienceProps }) => {
  const { company, desc, image, industry, period, position } = props.data;

  // const details = [
  //     "develop comprehensive test plans, design direct and random test cases to verify the correctness of the hardware design",
  //     "work and communicate with different departments to perform verification and validation of system functions",
  //     "create reusable test codes to improve productivity and efficiency"
  // ]

  return (
    <li
      className={
        "group/card rounded-2xl p-4 w-full flex flex-col gap-4 hover:shadow-[1px_1px_4px_-5px_black] //hover:scale-[101%] //hover:after:opacity-10 hover:!opacity-100 group-hover/list:opacity-20 //[filter:contrast(1)] //group-hover/list:[filter:brightness(0.3)] //group-hover/list:hover:[filter:contrast(1)] border-solid border-[transparent] hover:border-grey-02 border-[0.01rem] transition-all duration-150 relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:w-full after:h-full after:bg-white //after:bg-[linear-gradient(45deg,white,orange)] after:opacity-0 after:z-negative [&:not(:last-child)]:mb-8 z-0 //cursor-pointer"
      }
    >
      <div className="flex items-start justify-between">
        <div className="relative rounded w-16 aspect-square flex justify-center items-center p-2 group-hover/card:bg-white-02">
          {/* <img src={image}/> */}
          <Image
            src={image}
            alt="company logo"
            sizes="80%"
            fill={true}
            className="object-contain p-2"
          />
        </div>
        <span className="z-0 relative after:z-negative after:absolute after:inset-0 after:w-full after:h-full after:bg-white after:opacity-10 rounded px-2 py-1 text-grey-01 overflow-hidden text-sm group-hover/card:text-yellow-02">
          {industry}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-bold">{company}</span>
        <span>{position}</span>
        <span className="text-sm text-grey-01">{period}</span>
      </div>
      <ul className="text [&_*]:text-grey-01 [&_*]:text-justify">
        {desc.map((text, index) => {
          return (
            <li
              key={Statics.experience + "-desc-" + index}
              className="[&:not(:last-child)]:mb-4"
            >
              {text}
            </li>
          );
        })}
      </ul>
    </li>
  );
};

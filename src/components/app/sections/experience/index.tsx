"use client";
import { useAppConfigContext } from "@/context/app-config";
import { SectionWrapper } from "../../../section";
import { ExperienceCard } from "./card";
import Statics from "@/statics";

export const ExperienceSection = () => {
  const data = useAppConfigContext();

  return (
    <SectionWrapper title={"WORK EXPERIENCE"} id={Statics.experience}>
      <ul className="group/list relative before:absolute before:inset-0 before:w-full before:h-full">
        {data.experience?.map((job, index) => {
          return (
            <ExperienceCard key={Statics.experience + "-" + index} data={job} />
          );
        })}
        {/* <Card01/>
                <Card01/>
                <Card01/> */}
      </ul>
    </SectionWrapper>
  );
};

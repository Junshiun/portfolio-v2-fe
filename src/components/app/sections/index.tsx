import { ExperienceSection } from "./experience";
import { MessageSection } from "./message";
import { ProjectSection } from "./projects";
import { SkillsSection } from "./skills";

export const SectionsWrapper = () => {
  return (
    <div className="lg:w-[50%] py-20">
      <SkillsSection />
      <ExperienceSection />
      <ProjectSection />
      <MessageSection />
    </div>
  );
};

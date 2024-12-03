import { useAppConfigContext } from "@/context/app-config";
import { SectionWrapper } from "../../../section";
import { TSkillsCategoryProps } from "./type";

export const SkillsCategory = (props: TSkillsCategoryProps) => {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_2fr] gap-4">
      <span className="text-grey-01 text-bold">{props.title}</span>
      <div className="grid grid-cols-[repeat(3,1fr)] gap-4 border-solid border-[0.01rem] border-grey-02 rounded-xl p-4">
        {props.skills.map((skill, index) => {
          return <span key={"skill-" + index}>{skill}</span>;
        })}
      </div>
    </div>
  );
};

export const SkillsSection = () => {

  const appConfig = useAppConfigContext();

  const { skills } = appConfig;

  return (
    <SectionWrapper id="skills" title={"SKILLS"}>
      <div className="flex flex-col gap-8">
        {
          Object.keys(skills || {}).map((category, index) => {
            return (
              <SkillsCategory
                key={`skills-${index}`}
                title={category}
                skills={skills && skills[category] || []}
              />
            )
          })
        }
        {/* <SkillsCategory
          title={"Programming Languages"}
          skills={["JavaScript", "TypeScript", "HTML", "CSS", "Dart"]}
        />
        <SkillsCategory
          title={"Libraries & Frameworks"}
          skills={[
            "React",
            "Solid.js",
            "Next.js",
            "Tailwind CSS",
            "Node.js",
            "Flutter",
          ]}
        />
        <SkillsCategory
          title={"Tools & Platforms"}
          skills={[
            "Git",
            "GitHub",
            "AWS",
            "Bitbucket",
            "Jest",
            "Google Analytics",
          ]}
        /> */}
      </div>
    </SectionWrapper>
  );
};

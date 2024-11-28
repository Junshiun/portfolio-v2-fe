"use client";
import { useAppConfigContext } from "@/context/app-config";
import { TProjectProps } from "@/context/app-config/type";
import { SectionWrapper } from "@/components/section";
import Statics from "@/statics";
import Link from "next/link";
import {
  Dispatch,
  SetStateAction,
  useDeferredValue,
  useMemo,
  useState,
} from "react";
import { FiTv } from "react-icons/fi";
import { TranslateXContainer } from "@/components/translateX-container";
import { useSwipeable } from "react-swipeable";
import { twMerge } from "tailwind-merge";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { TbBrowser } from "react-icons/tb";
import { TitleIcon } from "@/components/title-icon";
import Image from "next/image";

const ProjectWrapper = (props: { data: TProjectProps }) => {
  const { desc, thumbnail, techStack, title, id, type, platform } = props.data;

  // const [imageRail, setImageRail] = useState(false);

  // const info = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //     setTimeout(() => {
  //         if (info.current) {
  //             if (imageRail) {
  //                 info.current.style.height = "10rem"
  //             } else {
  //                 info.current.style.height = "0rem"
  //             }
  //         }
  //     }, 0)
  // }, [imageRail])

  return (
    <Link
      href={`/project/${id}`}
      className={twMerge(
        "group/card h-full hover:!opacity-100 border border-solid border-transparent hover:border-grey-02 //[&:not(:last-child)]: mb-20 relative p-4 rounded-xl before:absolute before:inset-0 before:w-full before:h-full before:z-negative flex flex-col gap-4 cursor-pointer",
        type === Statics.featured && "group-hover/list:opacity-50",
      )}
    >
      <div className="grid md:grid-cols-[3fr_5fr] md:grid-rows-[1fr_1rem] gap-4">
        <div className="relative w-full h-40 overflow-hidden">
          <Image
            src={thumbnail}
            alt="project's thumbnail"
            fill={true}
            style={{ objectFit: "cover" }}
            quality={75}
          />
          {/* <img loading="lazy" className="w-full object-contain group-hover/card:![filter:brightness(1)] group-hover/list:[filter:brightness(0.5)] //transition-all //duration-150" src={thumbnail}/> */}
        </div>
        <div className="flex flex-col gap-4 row-span-2">
          <div className="flex justify-between items-center">
            <h3>{title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => {
              return (
                <span
                  key={`${tech}-${index}`}
                  className="z-0 relative after:z-negative after:absolute after:inset-0 after:w-full after:h-full after:bg-white after:opacity-10 rounded px-2 py-1 text-grey-01 overflow-hidden text-sm //group-hover/card:bg-yellow-02 group-hover/card:text-yellow-02"
                >
                  {tech}
                </span>
              );
            })}
          </div>
          {desc.map((detail, index) => {
            return (
              <span
                key={`project-desc-${index}`}
                className="text-grey-01 text-justify"
              >
                {detail}
              </span>
            );
          })}
        </div>
        <div className="grow flex items-end gap-4">
          {/* {
                        github && <div title="github"><FiGithub/></div>
                    }
                    {
                        images && <div title="images"><BsImageFill /></div>
                    } */}
          {/* <div className="flex gap-4"> */}
          {platform?.tv && (
            <TitleIcon title="tv">
              <FiTv />
            </TitleIcon>
          )}
          {platform?.mobile && (
            <TitleIcon title="mobile">
              <HiMiniDevicePhoneMobile />
            </TitleIcon>
          )}
          {platform?.web && (
            <TitleIcon title="web">
              <TbBrowser />
            </TitleIcon>
          )}
          {/* </div> */}
        </div>
      </div>
    </Link>
  );
};

const NonfeaturedProject = (props: {
  project: TProjectProps;
  index: number;
  area?: string;
  setHighlight: Dispatch<
    SetStateAction<{
      status: boolean;
      index: number;
    }>
  >;
}) => {
  const { title, techStack, type, area } = props.project;

  return (
    <div
      key={`notFeatured-${props.index}`}
      className={twMerge(
        "group/card w-full h-full rounded p-4 flex flex-col gap-4 //justify-center //items-center z-0 relative after:z-negative after:absolute after:inset-0 after:w-full after:h-full after:bg-white after:opacity-5 text-grey-01 overflow-hidden group-hover/notFeatured:opacity-50 hover:!opacity-100 hover:after:opacity-0 border border-solid border-transparent hover:border-grey-02",
        type !== Statics.empty ? "cursor-pointer" : "!border-none",
      )}
      style={{
        gridArea: area,
      }}
      onClick={() =>
        type !== Statics.empty &&
        props.setHighlight({
          status: true,
          index: props.index,
        })
      }
    >
      {type !== Statics.empty && (
        <>
          <span>{title}</span>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => {
              return (
                <span
                  key={`${tech}_${index}`}
                  className="z-0 relative after:z-negative after:absolute after:inset-0 after:w-full after:h-full //after:bg-white after:opacity-10 rounded text-grey-01 overflow-hidden text-sm //group-hover/card:bg-yellow-02 group-hover/card:text-yellow-02"
                >
                  {tech}
                </span>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const NotFeaturedProjectsWrapper = (props: { projects: TProjectProps[] }) => {
  const { projects } = props;

  const enabledProjects = useMemo(
    () => projects.filter((project) => project.type !== Statics.empty),
    [projects],
  );

  const [highlight, setHighlight] = useState<{
    status: boolean;
    index: number;
  }>({
    status: false,
    index: 0,
  });
  const defferedHighlight = useDeferredValue(highlight);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setHighlight((prev) => {
        return prev.index < enabledProjects.length - 1
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
    <div
      className={`group/notFeatured group-hover/list:opacity-50 hover:!opacity-100 h-[80rem] sm:h-[45rem] rounded overflow-hidden z-0 relative after:z-negative after:absolute after:inset-0 after:w-full after:h-full after:bg-white after:opacity-0 ${defferedHighlight.status && "after:opacity-5"}`}
    >
      <TranslateXContainer
        swipeHandler={handlers}
        highlightState={{ highlight: defferedHighlight, setHighlight }}
        data={enabledProjects}
        main={
          <div
            className={
              "grid h-full gap-4 [grid-template-areas:'b1_b2''b1_b3''b4_b4''b5_b6''b7_b6''b7_b8''b9_b9'] sm:[grid-template-areas:'b1_b1_b2''b1_b1_b3''b4_b5_b5''b4_b6_b7''b8_b9_b7'] grid-rows-5 grid-cols-[repeat(2,1fr)] sm:grid-cols-[2fr,3fr,3fr]"
            }
          >
            {projects?.map((project, index) => {
              return (
                <NonfeaturedProject
                  key={"notFeatured-" + index}
                  index={index}
                  area={project.area}
                  project={project}
                  setHighlight={setHighlight}
                />
              );
            })}
          </div>
        }
        iterableComponent={
          //<>
          // {
          enabledProjects.map((project, index) => {
            return (
              <div
                key={`gallery-${index}`}
                className="w-full h-full rounded overflow-hidden"
              >
                <ProjectWrapper data={project} />
              </div>
            );
          })
          // }
          //</>
          // <div className="group/card grow [&>div]:!border-none">
          //     <ProjectWrapper data={projects[highlight.projectIndex]}/>
          // </div>
        }
      />
      {/* {
                !highlight.status?
                    <div className={"grid h-full gap-4 [grid-template-areas:'b1_b2''b1_b3''b4_b4''b5_b6''b7_b6''b7_b8''b9_b9'] sm:[grid-template-areas:'b1_b1_b2''b1_b1_b3''b4_b5_b5''b4_b6_b7''b8_b9_b7'] grid-rows-5 grid-cols-[repeat(2,1fr)] sm:grid-cols-[2fr,3fr,3fr]"}>
                        {
                        projects?.map((project, index) => {
                                return(
                                    <NonfeaturedProject key={'notFeatured-' + index} index={index} area={`b${index+1}`} project={project} setHighlight={setHighlight}/>
                                )
                            })
                        }
                    </div>
                    :
                    <div className="flex flex-col h-full">
                        <span className="flex items-center cursor-pointer" onClick={() => setHighlight({status: false})}>
                            <IoIosArrowBack className="m-4 h-6"/>Back
                        </span>
                        <div className="group/card grow [&>div]:!border-none">
                            <ProjectWrapper data={projects[highlight.projectIndex]}/>
                        </div>
                    </div>
            } */}
    </div>
  );
};

export const ProjectSection = () => {
  const appConfig = useAppConfigContext();

  const featured: TProjectProps[] = [];
  const notFeatured: TProjectProps[] = [];

  appConfig.projects?.forEach((project) => {
    if (project.type === Statics.featured) {
      featured.push(project);
    } else {
      notFeatured.push(project);
    }
  });

  return (
    <SectionWrapper id="projects" title={"PROJECTS"}>
      <ul
        id="projects"
        className="group/list relative before:absolute before:inset-0 before:w-full before:h-full"
      >
        {featured?.map((project, index) => {
          return <ProjectWrapper key={`project-${index}`} data={project} />;
        })}
        {notFeatured.length > 0 && (
          <NotFeaturedProjectsWrapper projects={notFeatured} />
        )}
      </ul>
    </SectionWrapper>
  );
};

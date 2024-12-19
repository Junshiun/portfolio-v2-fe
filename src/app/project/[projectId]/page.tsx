"use client";
import { GalleryWrapper } from "@/components/project/gallery-wrapper";
import { useAppConfigContext } from "@/context/app-config";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { FiTv } from "react-icons/fi";
import { motion } from "framer-motion";
import { TProjectProps } from "@/context/app-config/type";
import { TitleIcon } from "@/components/title-icon";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { TbBrowser } from "react-icons/tb";
import Image from "next/image";

const ProjectPage = () => {
  const router = useRouter();

  const params = useParams();

  const { projectId } = params;

  const config = useAppConfigContext();

  const targetProject: TProjectProps | undefined = useMemo(
    () =>
      config.projects?.find((project) => {
        return project.id === projectId;
      }),
    [projectId],
  );

  const customBackButton = () => {
    console.log("beforeunload");
    router.push("/");
  };

  useEffect(() => {
    if (targetProject?.customRoute) {
      document.addEventListener("beforeunload", customBackButton);
    }

    return () => {
      document.removeEventListener("beforeunload", customBackButton);
    };
  }, [targetProject?.customRoute]);

  if (!targetProject) {
    router.push("/");
  }

  return (
    <div className="relative md:p-16 p-4 pt-12 h-fit min-h-screen max-w-screen overflow-hidden flex justify-center">
      {/* <div ref={mainRef} className="w-full h-fit grid //flex //flex-col //min-h-screen md:grid-cols-4 md:auto-rows-[18rem] md:gap-4 gap-12 duration-[3s] opacity-0 grid-flow-row"> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        transition={{ duration: 2 }}
        className="max-w-full w-[70rem] h-fit flex flex-col gap-8"
      >
          <h1>{targetProject?.title}</h1>
          <div className="px-8 flex flex-col gap-8">
        <div className="flex flex-col sm:grid grid-cols-4 gap-8 grid-rows-auto">
            <div className="relative h-40 sm:h-full w-full overflow-hidden rounded-xl">
                <Image src={targetProject?.thumbnail || ""} alt="project thumbnail" fill={true} sizes="100%" style={{
                    objectFit: "cover"
                }}/>
            </div>
            <div className="col-span-3 div-with-bg-01 rounded-xl overflow-hidden p-8 flex flex-col gap-4 relative">
                <div className="flex gap-8 mb-4">
                    {targetProject?.platform?.tv && (
                        <div className="flex items-center gap-4">
                            <TitleIcon title="tv">
                            <FiTv size="2rem" />
                            </TitleIcon>
                            <span>TV</span>
                        </div>
                    )}
                    {targetProject?.platform?.mobile && (
                        <div className="flex items-center gap-4">
                        <TitleIcon title="mobile">
                        <HiMiniDevicePhoneMobile size="2rem" />
                        </TitleIcon>
                            <span>Mobile</span>
                            </div>
                    )}
                    {targetProject?.platform?.web && (
                        <div className="flex items-center gap-4">
                        <TitleIcon title="web">
                        <TbBrowser size="2rem" />
                        </TitleIcon>
                        <span>Web</span>
                        </div>
                    )}
                </div>
                <p className="text-grey-01 text-justify">
                    {targetProject?.desc}
                </p>
                <span className="mt-4 border-t-[1px] border-t-grey-02 text-grey-01 text-sm self-end px-4 py-2">
                    {
                      targetProject?.madeAt
                    }
                </span>
            </div>
        </div>
        <div className="flex gap-4 flex-wrap">
            {
                targetProject?.techStack.map((tech, index) => {
                    return <span key={`tech-${index}`} className="w-fit z-0 relative after:z-negative after:absolute after:inset-0 after:w-full after:h-full after:bg-white after:opacity-10 rounded px-2 py-1 overflow-hidden text-sm text-yellow-02">{tech}</span>;
                })
            }
        </div>
        {
          (targetProject?.liveUrl || targetProject?.github) &&
          <div className="pt-8 border-t-2 border-t-grey-02 flex flex-col sm:grid grid-flow-col auto-cols-[15rem] gap-4 h-80">
            {
              targetProject?.liveUrl && (
                <a
                  href={targetProject.liveUrl}
                  target="_blank"
                  className="h-full group hover:after:opacity-15 cursor-pointer w-full justify-items-center div-with-bg-01 p-8 grid gap-4 grid-rows-[repeat(2, 1fr)] [&_*]:text-grey-01 text-grey-01 rounded-xl overflow-hidden"
                >
                  <span className="h-full flex items-center">Live</span>
                  <span className="group-hover:text-blue-500 break-all">
                    {targetProject.liveUrl}
                  </span>
                </a>
              )
            }
            {
              targetProject?.github && (
                <a
                  href={targetProject.github}
                  target="_blank"
                  className="h-full group hover:after:opacity-15 w-full justify-items-center div-with-bg-01 p-8 grid gap-4 grid-rows-[repeat(2, 1fr)] [&_*]:text-grey-01 text-grey-01 rounded-xl overflow-hidden"
                >
                  <span className="h-full flex items-center">GitHub</span>
                  <span className="group-hover:text-blue-500 break-all">
                    {targetProject.github}
                  </span>
                </a>
              )
            }
          </div>
        }
        {targetProject?.images && (
          <GalleryWrapper images={targetProject?.images}/>
        )}
        {targetProject?.learnt && (
            <div className="border-t-2 border-t-grey-02 pt-8">
                <div
                    className="min-h-72 group h-full w-full grid gap-8 grid-rows-[repeat(2, 1fr)] [&_*]:text-grey-01 text-grey-01 md:col-span-2 "
                >
                    <h3 className="h-full text-grey-01">Things I&apos;ve Learned</h3>
                    <ul className="flex flex-col gap-4 div-with-bg-01 overflow-hidden rounded-xl  p-8 ">
                    {
                        targetProject.learnt.map((line, index) => {
                        return (
                            <li key={`learnt-${index}`} className="//list-disc list-inside text-justify">
                            {
                                line
                            }
                            </li>
                        )
                        })
                    }
                    </ul>
                </div>
            </div>
        )}
        {targetProject?.demo && (
          <div className="border-t-2 border-t-grey-02 pt-8 grid gap-8">
            <h3 className="text-grey-01">Demo</h3>
             <div className="h-[60rem] min-w-80 p-4 overflow-hidden div-with-bg-01 rounded-xl">
              <iframe
                className="overflow-hidden div-with-bg-01 rounded-xl"
                src={targetProject.demo.url}
                seamless
                width={targetProject.demo.device?.width || "100%"}
                height={targetProject.demo.device?.height || "100%"}
              ></iframe>
            </div>
          </div>
        )}
        {/* </div> */}
        </div>
      </motion.div>
      {targetProject?.images ? (
        <div className="absolute z-negative-10 inset-0 md:h-screen md:w-screen h-[250%] w-[250%] //overflow-hidden bg-black">
          {/* <div ref={backgroundRef} className="transition-all duration-1000 opacity-10 grid grid-rows-3 grid-cols-3 gap-4 [transform:rotateY(50deg)_rotateZ(10deg)_translateY(100%)] [transform-style:preserve-3d] before:absolute before:inset-0 before:w-full before:h-full before:bg-[radial-gradient(transparent_20%,#f26419,#f6ae2d,black_90%)] [filter:brightness(0.3)]" style={{
                    scale: 2,
                }}> */}
          <motion.div
            className="transition-all duration-1000 opacity-10 grid grid-rows-3 grid-cols-3 gap-4 [transform:rotateY(50deg)_rotateZ(10deg)] [transform-style:preserve-3d] before:absolute before:inset-0 before:w-full before:h-full before:bg-[radial-gradient(transparent_20%,#f26419,#f6ae2d,black_90%)] [filter:brightness(0.1)] [scale:200%] h-fit"
            initial={{
              opacity: "10%",
              rotateY: "50deg",
              rotateZ: "10deg",
            }}
            animate={{ opacity: "20%" }}
          >
            {targetProject?.images?.map((image, index) => {
              return (
                // <img key={`bg-image-${index}`} className="object-contain w-full" src={image} />
                <div
                  className="w-full h-96 relative"
                  key={`project-image-${index}`}
                >
                  <Image
                    key={`bg-image-${index}`}
                    src={image}
                    alt="project's image"
                    fill={true}
                    style={{ objectFit: "contain" }}
                    sizes="100%"
                  />
                </div>
              );
            })}
            {/* </div> */}
          </motion.div>
        </div>
      ) : (
        <div className="absolute inset-0 z-negative-10 before:z-negative before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-[linear-gradient(45deg,transparent,#0d1b2a,#f26419,#f6ae2d,#f26419,#0d1b2a,transparent)] before:opacity-10 bg-black"></div>
      )}
    </div>
  );
};

export default ProjectPage;

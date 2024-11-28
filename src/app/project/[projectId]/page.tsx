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
    [config.projects]
  );

  // console.log(targetProject);

  // const mainRef = useRef<HTMLDivElement>(null);

  const customBackButton = () => {
    console.log("beforeunload");
    router.push("/");
  };

  useEffect(() => {
    if (targetProject?.customRoute) {
      window.addEventListener("beforeunload", customBackButton);
    }

    return () => {
      window.removeEventListener("beforeunload", customBackButton);
    };
  }, [targetProject?.customRoute]);

  // useLayoutEffect(() => {
  //     if (backgroundRef.current) {
  //         backgroundRef.current.style.transform = "rotateY(50deg) rotateZ(10deg) translateY(0%)";
  //         backgroundRef.current.style.opacity = "20%";
  //     }
  // }, [backgroundRef.current])

  // const srcDoc = `
  //     <script>parent = top = null;</script>
  //     <base href='https://your-flutter-app-url/' />
  //     <script src='https://your-flutter-app-url/flutter.js'></script>
  // `;

  return (
    <div className="relative md:p-16 p-4 pt-12 h-fit min-h-screen max-w-screen overflow-hidden">
      {/* <div ref={mainRef} className="w-full h-fit grid //flex //flex-col //min-h-screen md:grid-cols-4 md:auto-rows-[18rem] md:gap-4 gap-12 duration-[3s] opacity-0 grid-flow-row"> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        transition={{ duration: 2 }}
        className="w-full h-fit grid md:grid-cols-4 md:auto-rows-[18rem] md:gap-4 gap-12 grid-flow-row"
      >
        <div className="md:col-span-2 flex flex-col justify-center">
          <h1>{targetProject?.title}</h1>
          <p className="max-w-[80%] text-grey-01 text-justify">
            {targetProject?.desc}
          </p>
        </div>
        <div className="grid md:col-span-2 md:grid-cols-2 gap-12 md:gap-4 w-full auto-rows-[18rem]">
          <div className="//min-h-72 h-full w-full justify-items-center div-with-bg-01 p-4 grid gap-4 [&_*]:[color:#8c8c8c] grid-rows-[repeat(2, 1fr)]">
            <span className="h-full flex text-grey-01 items-center">
              Platforms
            </span>
            {/* <FiTv size="3rem"/> */}
            <div className="flex gap-8">
              {targetProject?.platform?.tv && (
                <TitleIcon title="tv">
                  <FiTv size="2rem" />
                </TitleIcon>
              )}
              {targetProject?.platform?.mobile && (
                <TitleIcon title="mobile">
                  <HiMiniDevicePhoneMobile size="2rem" />
                </TitleIcon>
              )}
              {targetProject?.platform?.web && (
                <TitleIcon title="web">
                  <TbBrowser size="2rem" />
                </TitleIcon>
              )}
            </div>
          </div>
          <div className="//min-h-72 h-full w-full justify-items-center div-with-bg-01 p-4 grid gap-4 [&_*]:[color:#8c8c8c] grid-rows-[repeat(2, 1fr)]">
            <span className="h-full flex text-grey-01 items-center">
              Technologies
            </span>
            <div className="flex h-fit gap-4 flex-wrap">
              {targetProject?.techStack.map((tech, index) => {
                return <span key={`tech-${index}`}>{tech}</span>;
              })}
            </div>
          </div>
        </div>
        {targetProject?.images && (
          <GalleryWrapper images={targetProject.images} />
        )}
        {targetProject?.github && (
          <a
            href={targetProject.github}
            target="_blank"
            className="min-h-72 group hover:after:opacity-15 h-full w-full justify-items-center div-with-bg-01 p-4 grid gap-4 grid-rows-[repeat(2, 1fr)] [&_*]:text-grey-01 text-grey-01"
          >
            <span className="h-full flex items-center">GitHub</span>
            <span className="group-hover:text-blue-500 break-all">
              {targetProject.github}
            </span>
          </a>
        )}
        {targetProject?.liveUrl && (
          <a
            href={targetProject.liveUrl}
            target="_blank"
            className="min-h-72 group hover:after:opacity-15 cursor-pointer h-full w-full justify-items-center div-with-bg-01 p-4 grid gap-4 grid-rows-[repeat(2, 1fr)] [&_*]:text-grey-01 text-grey-01"
          >
            <span className="h-full flex items-center">Live</span>
            <span className="group-hover:text-blue-500 break-all">
              {targetProject.liveUrl}
            </span>
          </a>
        )}
        {targetProject?.demo && (
          <div className="min-h-[60rem] //w-96 p-8 md:!h-full md:col-span-2 md:row-span-3 md:col-start-3 md:row-start-1 overflow-hidden div-with-bg-01 flex justify-center items-center">
            <iframe
              className="rounded"
              src={targetProject.demo.url}
              seamless
              width={targetProject.demo.device?.width || "100%"}
              height={targetProject.demo.device?.height || "100%"}
            ></iframe>
          </div>
        )}
        {/* </div> */}
      </motion.div>
      {targetProject?.images ? (
        <div className="absolute z-negative-10 inset-0 md:h-screen md:w-screen h-[250%] w-[250%] //overflow-hidden bg-black">
          {/* <div ref={backgroundRef} className="transition-all duration-1000 opacity-10 grid grid-rows-3 grid-cols-3 gap-4 [transform:rotateY(50deg)_rotateZ(10deg)_translateY(100%)] [transform-style:preserve-3d] before:absolute before:inset-0 before:w-full before:h-full before:bg-[radial-gradient(transparent_20%,#f26419,#f6ae2d,black_90%)] [filter:brightness(0.3)]" style={{
                    scale: 2,
                }}> */}
          <motion.div
            className="transition-all duration-1000 opacity-10 grid grid-rows-3 grid-cols-3 gap-4 [transform:rotateY(50deg)_rotateZ(10deg)] [transform-style:preserve-3d] before:absolute before:inset-0 before:w-full before:h-full before:bg-[radial-gradient(transparent_20%,#f26419,#f6ae2d,black_90%)] [filter:brightness(0.3)] [scale:200%] h-fit"
            initial={{
              opacity: "10%",
              y: "100%",
              rotateY: "50deg",
              rotateZ: "10deg",
            }}
            animate={{ opacity: "20%", y: "0%" }}
          >
            {targetProject?.images?.map((image, index) => {
              return (
                // <img key={`bg-image-${index}`} className="object-contain w-full" src={image} />
                <div className="w-full h-96 relative" key={`project-image-${index}`}>
                  <Image
                    key={`bg-image-${index}`}
                    src={image}
                    alt="project's image"
                    fill={true}
                    style={{ objectFit: "contain" }}
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
    // <div className="relative md:p-16 p-4 h-fit min-h-screen max-w-screen overflow-hidden">
    //     <div ref={mainRef} className="h-full grid md:grid-cols-2 md:gap-16 gap-4 duration-1000 opacity-0">
    //         <div>
    //             <h1>
    //                 {
    //                     targetProject?.title
    //                 }
    //             </h1>
    //             <p className="max-w-[80%] text-grey-01 text-justify">
    //                 {
    //                     targetProject?.desc
    //                 }
    //             </p>
    //             <div className="mt-8 md:grid gap-4 grid-cols-2 w-full flex flex-col">
    //                 <div className="min-h-72 h-full w-full justify-items-center div-with-bg-01 p-4 grid gap-4 [&_*]:[color:#8c8c8c] grid-rows-[repeat(2, 1fr)]">
    //                     <span className="h-full flex text-grey-01 items-center">Platforms</span>
    //                     <FiTv size="3rem"/>
    //                 </div>
    //                 <div className="min-h-72 h-full w-full justify-items-center div-with-bg-01 p-4 grid gap-4 [&_*]:[color:#8c8c8c] grid-rows-[repeat(2, 1fr)]">
    //                     <span className="h-full flex text-grey-01 items-center">Technologies</span>
    //                     <div className="flex h-fit gap-4 flex-wrap">
    //                         {
    //                             targetProject?.techStack.map((tech, index) => {
    //                                 return (
    //                                     <span key={`tech-${index}`}>
    //                                         {
    //                                             tech
    //                                         }
    //                                     </span>
    //                                 )
    //                             })
    //                         }
    //                     </div>
    //                 </div>
    //                 {
    //                     targetProject?.github &&
    //                     <div>
    //                         <div className="min-h-72 h-full w-full justify-items-center div-with-bg-01 p-4 grid gap-4 grid-rows-[repeat(2, 1fr)] [&_*]:text-grey-01 text-grey-01">
    //                             <span className="h-full flex items-center">GitHub</span>
    //                             {
    //                                 targetProject.github
    //                             }
    //                         </div>
    //                     </div>
    //                 }
    //             </div>
    //         </div>
    //         {
    //             targetProject?.images &&
    //             <GalleryWrapper images={targetProject.images}/>
    //         }
    //     </div>
    //     <div className="absolute z-negative inset-0 md:h-screen md:w-screen h-[250%] w-[250%] //overflow-hidden">
    //         <div ref={backgroundRef} className="transition-all duration-1000 opacity-10 grid grid-rows-3 grid-cols-3 gap-4 [transform:rotateY(50deg)_rotateZ(10deg)_translateY(100%)] [transform-style:preserve-3d] before:absolute before:inset-0 before:w-full before:h-full before:bg-[radial-gradient(transparent_20%,#f26419,#f6ae2d,black_90%)] [filter:brightness(0.3)]" style={{
    //             scale: 2,
    //         }}>
    //             {
    //                 targetProject?.images?.map((image, index) => {
    //                     return (
    //                         <img key={`bg-image-${index}`} className="object-contain w-full" src={image}>
    //                         </img>
    //                     )
    //                 })
    //             }
    //         </div>
    //     </div>
    // </div>
  );
};

export default ProjectPage;

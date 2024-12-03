import { LinkIcon } from "@/components/link-icon";
import { PortfolioInfo } from "@/components/portfolio-info";
import { useAppConfigContext } from "@/context/app-config";
import { AiOutlineProfile } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io";

export const AboutSection = () => {

  const appConfig = useAppConfigContext();

  const { about } = appConfig;

  return (
    <div
      id="about"
      className="flex flex-col xl:h-screen top-0 w-[100%] xl:sticky py-20 justify-between"
    >
      <div className="flex flex-col">
        <h2>{about?.title}</h2>
        <div className="relative before:absolute before:inset-0 before:w-full before:h-full rounded before:opacity-50 //overflow-hidden grid grid-cols-8 gap-8 py-4">
          {/* <div className="rounded-[50%] w-[50%] aspect-square overflow-hidden justify-self-start col-span-3">
                        <img src="images/profile-photo.jpg"/>
                    </div> */}
          <p className="relative text-justify col-span-6 text-grey-01">
            {about?.desc}
          </p>
        </div>
        <div className="mt-8 flex gap-4">
          <LinkIcon
            href={about?.link.resume}
            title="Resume"
            className="group py-4 pr-4 [&_*]:fill-grey-01"
          >
            <AiOutlineProfile
              size={"1.5rem"}
              className="group-hover:[&_*]:fill-white-01"
            />
          </LinkIcon>
          <LinkIcon
            href={about?.link.linkedin}
            title="LinkedIn"
            className="group p-4 [&_*]:fill-grey-01"
          >
            <IoLogoLinkedin
              size={"1.5rem"}
              className="group-hover:[&_*]:fill-white-01"
            />
          </LinkIcon>
          <LinkIcon
            href={about?.link.github}
            title="GitHub"
            className="group p-4 [&_*]:fill-grey-01"
          >
            <IoLogoGithub
              size={"1.5rem"}
              className="group-hover:[&_*]:fill-white-01"
            />
          </LinkIcon>
          <LinkIcon
            href={about?.link.instagram}
            title="Instagram"
            className="group p-4 [&_*]:fill-grey-01"
          >
            <FaInstagram
              size={"1.5rem"}
              className="group-hover:[&_*]:fill-white-01"
            />
          </LinkIcon>
        </div>
      </div>
      <PortfolioInfo className="hidden xl:grid bottom-20 left-4" />
    </div>
  );
};

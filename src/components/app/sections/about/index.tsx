import { LinkIcon } from "@/components/link-icon";
import { PortfolioInfo } from "@/components/portfolio-info";
import { AiOutlineProfile } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io";

export const AboutSection = () => {
  return (
    <div
      id="about"
      className="flex flex-col xl:h-screen top-0 w-[100%] xl:sticky py-20 justify-between"
    >
      <div className="flex flex-col">
        <h2>HI</h2>
        <div className="relative before:absolute before:inset-0 before:w-full before:h-full rounded before:opacity-50 //overflow-hidden grid grid-cols-8 gap-8 py-4">
          {/* <div className="rounded-[50%] w-[50%] aspect-square overflow-hidden justify-self-start col-span-3">
                        <img src="images/profile-photo.jpg"/>
                    </div> */}
          <p className="relative text-justify col-span-6 text-grey-01">
            Nice to meet you, and thanks for visiting my page! I’m Jun Shiun,
            and web development is a friend of mine. My journey into web
            development began during my final year at university, and I’ve been
            captivated by the endless possibilities and creativity within this
            field ever since.
          </p>
        </div>
        <div className="mt-8 flex gap-4">
          <LinkIcon
            href=""
            title="Resume"
            className="group py-4 pr-4 [&_*]:fill-grey-01"
          >
            <AiOutlineProfile
              size={"1.5rem"}
              className="group-hover:[&_*]:fill-white-01"
            />
          </LinkIcon>
          <LinkIcon
            href=""
            title="LinkedIn"
            className="group p-4 [&_*]:fill-grey-01"
          >
            <IoLogoLinkedin
              size={"1.5rem"}
              className="group-hover:[&_*]:fill-white-01"
            />
          </LinkIcon>
          <LinkIcon
            href=""
            title="GitHub"
            className="group p-4 [&_*]:fill-grey-01"
          >
            <IoLogoGithub
              size={"1.5rem"}
              className="group-hover:[&_*]:fill-white-01"
            />
          </LinkIcon>
          <LinkIcon
            href=""
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

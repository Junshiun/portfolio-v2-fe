import { LoadingComponent } from "@/components/loading";
import { FaGears } from "react-icons/fa6";
import { GoProjectRoadmap } from "react-icons/go";
import { IoInformation } from "react-icons/io5";
import { MdOutlineWorkOutline } from "react-icons/md";

export default function Loading() {
  return (
    <div className="z-20 fixed inset-0 h-screen w-screen flex flex-col items-center justify-center bg-black gap-4">
      <LoadingComponent
        icons={[
          <IoInformation key="icon-loading-1" />,
          <FaGears key="icon-loading-2" />,
          <GoProjectRoadmap key="icon-loading-3" />,
          <MdOutlineWorkOutline key="icon-loading-4" />,
        ]}
      />
    </div>
  );
}

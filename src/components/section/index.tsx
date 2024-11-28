import { PropsWithChildren } from "react";
import { TSectionProps } from "./type";

export const SectionWrapper = (props: PropsWithChildren<TSectionProps>) => {
  return (
    <div
      id={props.id || ""}
      className="[&:not(:last-child)]:mb-48 scroll-mt-20"
    >
      <h2 className="mb-4 rounded text-white-01">{props.title}</h2>
      {props.children}
    </div>
  );
};

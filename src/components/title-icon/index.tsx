"use client";
import { PropsWithChildren } from "react";

export const TitleIcon = (
  props: PropsWithChildren<{
    className?: string;
    title: string;
  }>,
) => {
  return (
    <div title={props.title} className={`//cursor-pointer ${props.className}`}>
      {props.children}
    </div>
  );
};

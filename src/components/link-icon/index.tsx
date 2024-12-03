"use client";
import { PropsWithChildren } from "react";

export const LinkIcon = (
  props: PropsWithChildren<{
    href?: string;
    className?: string;
    title: string;
  }>,
) => {
  return (
    <a
      href={props.href || ""}
      target="_blank"
      // scroll={false}
      title={props.title}
      className={`cursor-pointer ${props.className}`}
    >
      {props.children}
    </a>
  );
};

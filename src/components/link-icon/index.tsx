"use client";
import Link from "next/link";
import { PropsWithChildren } from "react";

export const LinkIcon = (
  props: PropsWithChildren<{
    href?: string;
    className?: string;
    title: string;
  }>,
) => {
  return (
    <Link
      href={props.href || ""}
      scroll={false}
      title={props.title}
      className={`cursor-pointer ${props.className}`}
    >
      {props.children}
    </Link>
  );
};

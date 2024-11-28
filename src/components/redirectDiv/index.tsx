import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export const RedirectDiv = (
  props: PropsWithChildren<{
    href: string;
    className?: string;
  }>,
) => {
  return (
    <div
      className={props.className}
      onClick={async () => {
        redirect(props.href);
      }}
    >
      {props.children}
    </div>
  );
};

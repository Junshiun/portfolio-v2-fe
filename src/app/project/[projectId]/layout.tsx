import { TProjectProps } from "@/context/app-config/type";
import Statics from "@/statics";
import { fetchWithCache } from "@/utils/fetch-cache";
import { Metadata } from "next";
import Link from "next/link";
import { RiHexagonLine } from "react-icons/ri";

type Props = {
  params: Promise<{ projectId: string }>
}
 
export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const id = (await params).projectId;

  const appConfig =  await fetch(Statics.configFetch.url, Statics.configFetch.options).then(res => res.json());

  if (!id) {
    return {
      title: appConfig.metadata?.title,
      description: appConfig.metadata?.desc
    }
  }

  const target = appConfig.projects?.find((project: TProjectProps) => project.id === id);
 
  return {
    title: target?.title + " | Jun Shiun",
    description: target?.desc[0]
  }
}

export default async function ProjectPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <header className="bg-black w-full h-16 flex p-8 sticky top-0 z-10">
            <Link href="/">
                <RiHexagonLine />
            </Link>
        </header>
        {children}
    </>
  );
}

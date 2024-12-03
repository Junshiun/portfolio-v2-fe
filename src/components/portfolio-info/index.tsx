"use client"

import { useAppConfigContext } from "@/context/app-config";

export const PortfolioInfo = (props: { className: string }) => {
  const appConfig = useAppConfigContext();

  const { about } = appConfig;

  return (
    <div
      className={`//border-[0.01rem] opacity-30 hover:!opacity-100 border-solid border-grey-02 //p-4 rounded-xl w-fit text-grey-01 grid grid-cols-2 [&_*]:text-sm ${props.className}`}
    >
      <div className="col-span-2">
        <span className="//text-grey-01">Develop with</span>
        <div className="flex gap-4">
          {about?.tech.develop.map((tech, index) => {
            return (
              <div
                key={`tech-${index}`}
                className="//div-with-bg-01 py-2 text-grey-01"
              >
                {tech}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <span className="//text-grey-01">Deploy with</span>
        {about?.tech.deploy.map((tech, index) => {
            return (
              <div
                key={`deploy-${index}`}
                className="//div-with-bg-01 py-2 text-grey-01"
              >
                {tech}
              </div>
            );
          })}
      </div>
      <div>
        <span className="//text-grey-01">GitHub</span>
        <div className="text-grey-01 py-2 flex gap-4">
          {
            Object.keys(about?.tech.github || {}).map((repo, index) => {
              return (
                <a
                key={`stack-${index}`}
                className="//div-with-bg-01 text-grey-01"
                href={about?.tech.github[repo]}
                target="_blank"
              >
                {repo}
              </a>
              )
            })
          }
          {/* {["Frontend", "Backend"].map((stack, index) => {
            return (
              <a
                key={`stack-${index}`}
                className="//div-with-bg-01 text-grey-01"
                href={}
              >
                {stack}
              </a>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

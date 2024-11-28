import { RiHexagonLine } from "react-icons/ri";

export const LoadingComponent = (props: { icons: JSX.Element[] }) => {
  return (
    <>
      <div className="flex gap-4">
        {props.icons.map((icon, index) => {
          return (
            <div key={`icon-${index}`} className="w-4 h-4 [&_*]:[color:orange]">
              {icon}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4">
        <RiHexagonLine
          className="animate-spin origin-center"
          size={"1rem"}
          color="yellow"
        />
        <span>Loading ...</span>
      </div>
    </>
  );
};

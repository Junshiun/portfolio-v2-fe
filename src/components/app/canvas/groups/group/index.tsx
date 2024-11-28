import { GroupProps, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Group } from "three";

export const CanvasGroup = (
  props: GroupProps & {
    sectionId: string;
  },
) => {
  const { gl } = useThree();
  const groupRef = useRef<Group>(null);

  const [intensity, setIntensity] = useState(0);

  const onHover = () => {
    setIntensity(2);
    gl.domElement.style.cursor = "pointer";
  };

  const onRemoveHover = () => {
    setIntensity(0);
    gl.domElement.style.cursor = "default";
  };

  const onClick = () => {
    const element = document.getElementById(props.sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <group
      position={props.position}
      rotation={props.rotation}
      ref={groupRef}
      onPointerEnter={onHover}
      onPointerLeave={onRemoveHover}
      onClick={onClick}
    >
      <spotLight
        position={[0, 3, 0]}
        color={"#FFBF00"}
        intensity={intensity}
        distance={5}
        castShadow
        target={groupRef.current || undefined}
      ></spotLight>
      {props.children}
    </group>
  );
};

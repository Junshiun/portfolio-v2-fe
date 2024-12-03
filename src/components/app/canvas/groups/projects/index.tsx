import { Html } from "@react-three/drei";
import { DoubleSide } from "three";
import fontJson from "three/examples/fonts/helvetiker_regular.typeface.json";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { CustomPointLight } from "../pointLight";
import Image from "next/image";

export const ProjectsGroup = () => {
  const font = new FontLoader().parse(fontJson);

  return (
    <>
      <group>
        <mesh>
          {/* <pointLight
                position={[0, 0.1, 0]}
                intensity={0.1}
                distance={2}
                decay={1}
                color={"orange"}
                /> */}
          <CustomPointLight />
          <boxGeometry args={[0.3, 0.4, 0.3]} />
          <meshPhysicalMaterial
            transmission={0.1}
            metalness={0}
            roughness={0}
          />
          <Html transform>
            <div className="w-2 h-2 relative">
              {/* <img src={"icons/icon-project.png"} /> */}
              <Image
                src="/icons/icon-project.png"
                alt="projects icon"
                fill={true}
                sizes="100%"
              />
            </div>
          </Html>
        </mesh>
        <mesh position={[0.25, -0.1, 0]}>
          <textGeometry
            args={["Projects", { font, size: 0.15, depth: 0.05 }]}
          ></textGeometry>
          <meshPhysicalMaterial color={"white"}></meshPhysicalMaterial>
        </mesh>
      </group>
      <group position={[0.4, 0, -0.65]}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"white"} shadowSide={DoubleSide} />
        </mesh>
        <mesh position={[0.2, 0.7, 0]} castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color={"white"} shadowSide={DoubleSide} />
        </mesh>
      </group>
    </>
  );
};

import { Html } from "@react-three/drei";
import { DoubleSide } from "three";
import fontJson from "three/examples/fonts/helvetiker_regular.typeface.json";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { CustomPointLight } from "../pointLight";
import Image from "next/image";

export const AboutGroup = () => {
  const font = new FontLoader().parse(fontJson);

  return (
    <>
      <group position={[-1, 1.9, 0]} rotation={[0, 0, 0]}>
        <pointLight
          position={[-1, 3, 0.5]}
          intensity={4}
          distance={5}
          decay={1}
          color={"orange"}
        />
        <mesh>
          <textGeometry
            args={["Hi I am Jun Shiun", { font, size: 0.2, depth: 0.02 }]}
          ></textGeometry>
          <meshPhysicalMaterial color={"white"}></meshPhysicalMaterial>
        </mesh>
      </group>
      <group position={[-0.5, -0.4, 0.55]}>
        <mesh position={[0, 0.1, 0.1]}>
          <CustomPointLight />
          <boxGeometry args={[0.3, 0.4, 0.3]} />
          <meshPhysicalMaterial
            transmission={0.1}
            metalness={0}
            roughness={0}
          />
          <Html transform>
            <div className="w-2 h-2 relative">
              {/* <img src={"icons/icon-information.png"} /> */}
              <Image
                src="/icons/icon-information.png"
                alt="about icon"
                fill={true}
                sizes="100%"
              />
            </div>
          </Html>
        </mesh>
        <mesh position={[0.25, 0, 0.1]}>
          <textGeometry
            args={["About", { font, size: 0.15, depth: 0.05 }]}
          ></textGeometry>
          <meshPhysicalMaterial color={"white"}></meshPhysicalMaterial>
        </mesh>
      </group>
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 2]} />
        <meshPhysicalMaterial color={"white"} />
      </mesh>
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"white"} shadowSide={DoubleSide} />
      </mesh>
    </>
  );
};

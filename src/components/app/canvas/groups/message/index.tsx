import { Html } from "@react-three/drei";
import { DoubleSide, Shape } from "three";
import fontJson from "three/examples/fonts/helvetiker_regular.typeface.json";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { CustomPointLight } from "../pointLight";
import Image from "next/image";

export const MessageGroup = () => {
  const font = new FontLoader().parse(fontJson);

  const shape = new Shape();
  shape.moveTo(0, 0);
  shape.lineTo(-0.5, -0.3);
  shape.lineTo(0.5, -0.3);
  shape.lineTo(0, 0);

  const shape2 = new Shape();
  shape2.moveTo(0, 0);
  shape2.lineTo(-0.5, 0.3);
  shape2.lineTo(0.5, 0.3);
  shape2.lineTo(0, 0);

  const extrudeSettings = {
    steps: 1,
    depth: 0.05, // Thickness of the triangle
    bevelEnabled: false,
  };

  return (
    <>
     <CustomPointLight />
      {/* <mesh>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={vertices}
            count={vertices.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <meshBasicMaterial color="red" side={DoubleSide} />
      </mesh> */}
        <mesh>
            <extrudeGeometry args={[shape, extrudeSettings]} />
            {/* <meshStandardMaterial color="orange" /> */}
            <meshStandardMaterial color={"white"} shadowSide={DoubleSide} />
        </mesh>
        <mesh>
            <extrudeGeometry args={[shape2, extrudeSettings]} />
            {/* <meshStandardMaterial color="orange" /> */}
            <meshStandardMaterial color={"white"} shadowSide={DoubleSide} />
        </mesh>
        <mesh position={[0, 0, -0.05]}>
            <boxGeometry args={[1, 0.6, 0.1]}/>
            <meshStandardMaterial color={"white"} shadowSide={DoubleSide} />
        </mesh>
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
                    <div className="w-[0.3rem] h-2 relative">
                    {/* <img src={"icons/icon-information.png"} /> */}
                    <Image
                        src="/icons/icon-message.png"
                        alt="about icon"
                        fill={true}
                        sizes="100%"
                    />
                    </div>
                </Html>
                {/* <mesh>
                                <boxGeometry
                                    args={[0.1, 0.1, 0.01]}
                                ></boxGeometry>
                                <meshBasicMaterial map={texture}></meshBasicMaterial>
                            </mesh> */}
            </mesh>
            <mesh position={[0.25, 0, 0.05]}>
                <textGeometry
                    args={["Contact", { font, size: 0.15, depth: 0.05 }]}
                ></textGeometry>
                <meshPhysicalMaterial color={"white"}></meshPhysicalMaterial>
            </mesh>
        </group>
    </>
  );
};

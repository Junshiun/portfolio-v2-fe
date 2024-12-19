import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { useRef, useEffect, RefObject, useState, useCallback, memo, LegacyRef } from "react";
import { Group, Mesh, PointLight } from "three";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import fontJson from "three/examples/fonts/helvetiker_regular.typeface.json";

const Text = (props: {
  text: string;
  position: [x: number, y: number, z: number];
  rotation?: [x: number, y: number, z: number];
}) => {
  const font = new FontLoader().parse(fontJson);
  const textRef = useRef<Mesh>(new Mesh());

  useEffect(() => {
    if (font) {
      const textGeometry = new TextGeometry(props.text, {
        font: font,
        size: 0.2,
        depth: 0.01,
        // curveSegments: 12,
        // bevelEnabled: true,
        // bevelThickness: 0.1,
        // bevelSize: 0.05,
        // bevelOffset: 0,
        // bevelSegments: 5,
      });

      if (textRef.current) {
        textRef.current.geometry = textGeometry;
      }
    }
  }, [font]);

  return (
    <mesh ref={textRef} position={props.position} rotation={props.rotation}>
      <meshStandardMaterial
        attach="material"
        color="white"
        emissive={"white"}
        emissiveIntensity={1}
      />
    </mesh>
  );
};

const Effect = memo(() => {
  return (
    <EffectComposer>
      <Bloom intensity={0.1} />
      {/* <SelectiveBloom intensity={0.1}/> */}
    </EffectComposer>
  )
})

export const SymbolSphere = (props: {
  canvasRef: RefObject<HTMLCanvasElement>;
}) => {
  // const font = useLoader(FontLoader, fontJson);

  const sphereRef = useRef<Group>(null);
  const boxRef = useRef<Mesh>(null);
  const lightRef = useRef<PointLight>(null);
  const tabActiveRef = useRef<boolean>(true);
  
  const floatingAnimationRef = useRef(true);
  // const [pending, startTransition] = useTransition();
  // const [startingPosition, setStartingPosition] = useState(0);
  // const [time, setTime] = useState(0);
  // const [scrollTop, setScrollTop] = useState(0);
  let timeVar = 0;
  let scrollTopVar = 0;
  let scrollDirection = "down";

  // const handleScroll = () => {
  //   setScrollTop(
  //       ((document.documentElement.scrollTop || document.body.scrollTop) /
  //               (props.canvasRef.current?.clientHeight || 0)) *
  //       100);

  //   // setPosition();
  // }

  const handleScroll = () => {
    // startTransition(() => {
    if (
      ((document.documentElement.scrollTop || document.body.scrollTop) /
        (props.canvasRef.current?.clientHeight || 0)) *
        100 >
      scrollTopVar
    ) {
      scrollDirection = "down";
    } else {
      scrollDirection = "up";
    }

    scrollTopVar =
      ((document.documentElement.scrollTop || document.body.scrollTop) /
        (props.canvasRef.current?.clientHeight || 0)) *
      100;

    if (scrollTopVar === 0) {
      floatingAnimationRef.current = true;
      timeVar = -2;
    } else {
      floatingAnimationRef.current = false
    }

    setPosition();
    // })
  };

  const handleVisibilityChange = () => {
    tabActiveRef.current = !document.hidden;
  }

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // console.log(canvasRef.current?.clientHeight);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useFrame(
    useCallback(
      (state, delta) => {
        if (sphereRef && sphereRef.current && floatingAnimationRef.current && tabActiveRef.current) {
          sphereRef.current.rotation.x += 0.005;
          sphereRef.current.rotation.y += 0.005;
          sphereRef.current.rotation.z -= delta * 3;

          // const time = Date.now() * 0.001;
          sphereRef.current.position.y = Math.cos(timeVar) * 2;

          // setTime(prev => prev + 0.02);
          timeVar += 0.02;
        }
      },
      [sphereRef, floatingAnimationRef],
    ),
  );

  const setPosition = () => {
    if (sphereRef && sphereRef.current && props.canvasRef) {
      // const box = new Box3().setFromObject(sphereRef.current);
      // const boundingBoxSize = box.max.sub(box.min);
      // const height = boundingBoxSize.y;
      // const width = boundingBoxSize.x;
      // sphereRef.current.position.x = (width / 2) * -1;
      // sphereRef.current.position.y = (height / 2) * -1;

      // console.log(sphereRef.current.position.y);
      // console.log(scrollTop);
      // const positionY = - ((props.canvasRef.current?.clientHeight || 0) / 2) * (scrollTopVar / 100);
      const positionY =
        (scrollDirection === "up" ? 1 : sphereRef.current.position.y) -
        30 * (scrollTopVar / 100);
      sphereRef.current.position.y = Math.max(positionY, -3.0);
      sphereRef.current.position.z =
        ((props.canvasRef.current?.clientHeight || 0) / 2) *
        (scrollTopVar / 2000);
      sphereRef.current.rotation.x = scrollTopVar;
    }
  };

  // useEffect(() => {
  //   // if (sphereRef.current && props.canvasRef) {
  //     setPosition();
  //   // }

  //   // document.addEventListener("resize", () => {
  //   //   setPosition();
  //   // });

  //   if (scrollTop === 0) {
  //     setFloatingAnimation(true);
  //     // setStartingPosition(0);
  //     // setPhaseShift(prev => prev + Math.PI / 2);
  //     // setTime(-2);
  //     timeVar = -2;
  //   } else {
  //     setFloatingAnimation(false);
  //     // setStartingPosition(0);
  //   }

  //   // console.log("yay");

  // }, [scrollTop]);

  const symbols: {
    text: string;
    position: [x: number, y: number, z: number];
    rotate?: [x: number, y: number, z: number];
  }[] = [
    {
      text: "</>",
      position: [-0.25, -0.1, 0.4],
    },
    {
      text: "#",
      position: [0.4, -0.1, 0.1],
      rotate: [0, Math.PI / 2, 0],
    },
    {
      text: "%",
      position: [0.1, -0.1, -0.4],
      rotate: [0, Math.PI, 0],
    },
    {
      text: "!",
      position: [-0.4, -0.1, 0],
      rotate: [0, -Math.PI / 2, 0],
    },
    {
      text: "{ }",
      position: [-0.15, 0.5, -0.1],
      rotate: [Math.PI / 2, 0, 0],
    },
    {
      text: "[ ]",
      position: [-0.1, -0.5, 0.1],
      rotate: [-Math.PI / 2, 0, 0],
    },
  ];

  return (
    <group position={[0, 0, 0]} scale={0.25}>
      <group ref={sphereRef}>
        <mesh>
          <sphereGeometry args={[1, 8, 5]} />
          <meshPhysicalMaterial
            color={"#FFFFFF"}
            roughness={0.1}
            metalness={0}
            transmission={1}
            emissive={"#FFBF00"}
            emissiveIntensity={1}
            thickness={0.8}
          />
        </mesh>

        <mesh ref={boxRef}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshPhysicalMaterial
            color={"#FFBF00"}
            emissive={"#FFFFFF"}
            emissiveIntensity={0.3}
            roughness={1}
            metalness={1}
          />
        </mesh>
        <pointLight
          ref={lightRef}
          rotation={[0, 0, 0]}
          position={[0, 0, 0]}
          intensity={1}
          color="#ffdf81"
          distance={5}
          decay={3}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={10}
        />

        {symbols.map((symbol, index) => {
          return (
            <Text
              key={"sphere-symbol-" + index}
              text={symbol.text}
              position={symbol.position}
              rotation={symbol.rotate}
            />
          );
        })}

        {sphereRef.current && lightRef.current && (
          <Effect />
        )}
        {/* <SelectiveBloom lights={[lightRef.current]} selection={[sphereRef.current]} intensity={10} /> */}
      </group>
    </group>
  );
};

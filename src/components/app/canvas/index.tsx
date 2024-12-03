"use client";
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  useRef,
  useEffect,
  useState,
  RefObject,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { DoubleSide, Vector3 } from "three";
import {
  TextGeometry,
  // UnrealBloomPass,
} from "three/examples/jsm/Addons.js";
import { SymbolSphere } from "./sphere";
import { Canvas } from "@react-three/fiber";
import { extend } from "@react-three/fiber";
import { Object3DNode } from "@react-three/fiber";
import { AboutGroup } from "./groups/about";
import { SkillsGroup } from "./groups/skills";
import { ExperienceGroup } from "./groups/experience";
import { ProjectsGroup } from "./groups/projects";
import { Group as TweenGroup, Tween, Easing } from "@tweenjs/tween.js";
import { CanvasGroup } from "./groups/group";
import { DownArrow } from "@/components/app/canvas/downArrow";
import { TCanvasRenderer } from "./type";
import { ResetButton } from "./resetButton";
import { LoadingComponent } from "@/components/loading";
import { FaCube } from "react-icons/fa6";
import { useTimerContext } from "@/context/timer";
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { MessageGroup } from "./groups/message";

extend({ TextGeometry });

declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       unrealBloomPass: ReactThreeFiber.Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>;
//     }
//   }
// }

export const CanvasRenderer = forwardRef(function CanvasRenderer(
  props: {
    canvasRef: RefObject<HTMLCanvasElement>;
    orbitControlRef: RefObject<OrbitControlsImpl>
  },
  ref,
) {
  const { camera } = useThree();

  // useEffect(() => {
  //   if  (gl && scene && camera) {
  //     console.log("loaded");
  //   }
  // }, [gl, scene, camera])

  // const introRef = useRef<Group>(null);
  // const [intensity, setIntensity] = useState(0);

  // const lightRef = useRef<DirectionalLight>(null);
  // useHelper(lightRef, DirectionalLightHelper);

  // const pointLightRef = useRef<PointLight>(null);
  // useHelper(pointLightRef, PointLightHelper);

  // const textRef = useRef<Mesh>(null);

  // useFrame(({ gl, scene, camera }) => {
  //   // composer.current.render();
  // }, 1);

  // const data = useScroll();

  // useEffect(() => {
  // window.addEventListener("scroll", () => {
  //   console.log(data);
  // });
  // }, []);

  // const initialPosition = useRef(new Vector3());

  const tweenGroup = new TweenGroup();

  const animateCamera = (time: number) => {
    requestAnimationFrame(animateCamera);
    tweenGroup.update(time);
  };

  const animateTween = (
    startPosition: Vector3,
    targetPosition: Vector3,
    duration: number,
  ) => {
    new Tween(startPosition, tweenGroup)
      .to(targetPosition, duration)
      .easing(Easing.Quadratic.Out) // Easing function for fast start and slow end
      .onStart(() => {
        if (props.orbitControlRef.current) {
          props.orbitControlRef.current.maxPolarAngle = Math.PI;
          props.orbitControlRef.current?.reset();
          // camera.position.copy(initialPosition.current);
        }
      })
      .onUpdate(() => {
        camera.position.set(startPosition.x, startPosition.y, startPosition.z);
      })
      .onComplete(() => {
        if (props.orbitControlRef.current) {
          props.orbitControlRef.current.maxPolarAngle = Math.PI/2;
        }
      })
      .start();
  };

  const target = new Vector3(2, 0, 4);

  useEffect(() => {

    // initialPosition.current.copy(camera.position);

    animateTween(new Vector3(-5, 8, 6), target, 5000);

    requestAnimationFrame(animateCamera);
  }, [camera]);

  useImperativeHandle(ref, () => {
    return {
      resetCamera: () => {
        const currentPosition = camera.position.clone();

        animateTween(currentPosition, target, 2000);

        requestAnimationFrame(animateCamera);
      },
    };
  });

  useFrame(() => {
    camera.updateProjectionMatrix();
  });

  // const [viewportDimension, setViewportDimension] = useState({
  //   width: 0,
  //   height: 0,
  // });
  // const deferredViewport = useDeferredValue(viewportDimension);

  // const calculateViewport = () => {
  //   startTransition(() => {
  //     const vFOV = ((camera as PerspectiveCamera).fov * Math.PI) / 180; // Convert vertical FOV to radians
  //     const height = 2 * Math.tan(vFOV / 2) * camera.position.z; // Visible height
  //     const width = height * (camera as PerspectiveCamera).aspect; // Visible width
  //     // const { viewport } = useThree();

  //     setViewportDimension({
  //       width,
  //       height,
  //     });
  //   })
  // };

  // const handleScroll = () => {
  //   const scrollPercent =
  //       ((document.documentElement.scrollTop || document.body.scrollTop) /
  //           ((document.documentElement.scrollHeight ||
  //               document.body.scrollHeight) -
  //               document.documentElement.clientHeight)) *
  //       100;

  //   console.log(scrollPercent);
  // }

  // useLayoutEffect(() => {
  //   window.addEventListener("resize", calculateViewport, false);
  //   // window.addEventListener('scroll', handleScroll);

  //   calculateViewport();

  //   return () => window.removeEventListener("resize", calculateViewport, false);
  // }, []);

  // const font = new FontLoader().parse(fontJson);

  return (
    <>
      {/* <group onClick={() => console.log(camera.position)}>
        <mesh>
        <boxGeometry args={[1,1,1]}></boxGeometry>
<meshStandardMaterial color={"white"}/>
        </mesh>
      </group> */}
      {/* <ambientLight intensity={0.1} color={"#FFFFFF"}/> */}
      <spotLight
        position={[0, 0, 6]}
        color={"white"}
        intensity={0.1}
        castShadow
      ></spotLight>
      {/* <directionalLight position={[0, 5, 0]} ref={lightRef} target={textRef.current} color={"#FFFFFF"} intensity={0.05} castShadow shadow-mapSize-width={1024}
  shadow-mapSize-height={1024}
  shadow-camera-far={10}
  shadow-camera-left={-5}
  shadow-camera-right={5}
  shadow-camera-top={5}
  shadow-camera-bottom={-5}></directionalLight> */}
      {/* <axesHelper args={[5]}/> */}
      <SymbolSphere canvasRef={props.canvasRef} />
      {/* <RoundedBox width={15} height={5} depth={10} radius={2} smoothness={2}/> */}
      {/* <mesh>
        <boxGeometry args={[10, 5, 10]}></boxGeometry>
        <meshStandardMaterial color={"lightblue"} side={Three.BackSide}></meshStandardMaterial>
      </mesh> */}
      {/* <CurvedPlane /> */}
      {/* <mesh rotation={[0, 0, 0]} position={[0, 0, -5]}>
        <planeGeometry args={[viewportDimension.width * 3, viewportDimension.height * 1.5]}></planeGeometry>
        <meshStandardMaterial color={"grey"} side={DoubleSide}></meshStandardMaterial>
      </mesh> */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry
          // args={[deferredViewport.width * 2, deferredViewport.height * 1.5]}
          args={[15, 15]}
        ></planeGeometry>
        <meshStandardMaterial
          color={"white"}
          side={DoubleSide}
        ></meshStandardMaterial>
      </mesh>
      {/* <hemisphereLight args={[0xddeeff, 0x0f0e0d, 0.02]}></hemisphereLight> */}
      {/* <Track /> */}
      {/* <Effects ref={composer}>
        <unrealBloomPass attach="passes" args={[new Vector2(window.innerWidth, window.innerHeight), 0, 0, 0]} />
      </Effects> */}

      {/* <mesh position={[4, 1, 0]} geometry={roundedBoxGeometry}>
        <meshStandardMaterial color={"#FFFFFF"}></meshStandardMaterial>
        <Html transform>
          <Introduction />
        </Html>
      </mesh> */}
      {/* <CanvasGroup sectionId="about" position={[-3, -0.5, 0]} rotation={[0, 0, 0]}>
        <AboutGroup/>
      </CanvasGroup>
      <CanvasGroup sectionId="skills" position={[3, -0.8, -0.5]}>
        <SkillsGroup/>
      </CanvasGroup>
      <CanvasGroup sectionId="work-experience" position={[0.5, -0.8, -3]} rotation={[0 , -0.2, 0]}>
        <ExperienceGroup/>
      </CanvasGroup>
      <CanvasGroup sectionId="projects" position={[-3, -0.8, -4]}>
        <ProjectsGroup/>
      </CanvasGroup> */}
      <CanvasGroup
        sectionId="about"
        position={[-2, -0.5, -2.5]}
        rotation={[0, 0.5, 0]}
      >
        <AboutGroup />
      </CanvasGroup>
      <CanvasGroup
        sectionId="skills"
        position={[3.0, -0.8, -1.5]}
        rotation={[0, -0.9, 0]}
      >
        <SkillsGroup />
      </CanvasGroup>
      <CanvasGroup
        sectionId="work-experience"
        position={[0.8, -0.8, -2.5]}
        rotation={[0, -0.2, 0]}
      >
        <ExperienceGroup />
      </CanvasGroup>
      <CanvasGroup
        sectionId="projects"
        position={[-3.7, -0.8, 0.4]}
        rotation={[0, 1.2, 0]}
      >
        <ProjectsGroup />
      </CanvasGroup>
      <CanvasGroup
        sectionId="message"
        position={[-4.5,-0.5,2]}
        rotation={[0, 1.5, 0]}
      >
        <MessageGroup />
      </CanvasGroup>
    </>
  );
});

export const CanvasScreen = () => {
  const [loading, setLoading] = useState(true);
  const orbitControlRef = useRef<OrbitControlsImpl>(null);

  const timerContext = useTimerContext();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRendererRef = useRef<TCanvasRenderer>(null);

  // useLayoutEffect(() => {
  //   // console.log(canvasRef.current?.clientHeight);

  //   return () => {
  //     if (canvasRef.current) {
  //       // Dispose of the canvas and its resources
  //       const gl = canvasRef.current.getContext("webgl");
  //       if (gl) {
  //         gl.getExtension("WEBGL_lose_context")?.loseContext();
  //       }
  //     }
  //   };
  // }, []);

  return (
    <div className="w-full h-screen bg-black relative">
      {/* <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0}} className="w-full h-full"> */}
      <Canvas
        ref={canvasRef}
        camera={{ position: [-5, 8, 6], fov: 75 }}
        gl={{ preserveDrawingBuffer: true }}
        shadows
        onCreated={() => {
          timerContext?.startTimer();
          setLoading(false);
        }}
      >
        <CanvasRenderer canvasRef={canvasRef} ref={canvasRendererRef} orbitControlRef={orbitControlRef}/>
        <OrbitControls
          // enableZoom={false}
          ref={orbitControlRef}
          maxPolarAngle={Math.PI / 2}
        ></OrbitControls>
        {/* <OrbitControls></OrbitControls> */}
      </Canvas>
      {loading && (
        <div className="absolute w-full h-full flex flex-col items-center justify-center text-white top-0 left-0 bg-black z-20 gap-4">
          <LoadingComponent icons={[<FaCube key="cube-icon" />]} />
        </div>
      )}
      {/* </motion.div> */}
      {!loading && (
        <>
          <DownArrow navigateTo="about" />
          <ResetButton canvasRendererRef={canvasRendererRef} />
        </>
      )}
    </div>
  );
};

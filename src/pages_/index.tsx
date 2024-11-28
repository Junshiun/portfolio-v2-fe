import { Canvas, extend } from "@react-three/fiber";
// import { EffectComposer, FontLoader, RenderPass, ShaderPass, TextGeometry, UnrealBloomPass } from "three/examples/jsm/Addons.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";
// import fontJson from '../fonts/Sci Fied X_Regular.json';
import { Object3DNode } from "@react-three/fiber";
import { CanvasScreen } from "@/components/app/canvas";
import { SectionsWrapper } from "@/components/app/sections";

extend({ TextGeometry });

declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}

// import * as Three from "three";

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       unrealBloomPass: ReactThreeFiber.Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>;
//     }
//   }
// }

// extend({ UnrealBloomPass, EffectComposer, RenderPass, ShaderPass });

export default function Home() {
  return (
    <div className="w-full h-screen m-0 p-0">
      <Canvas camera={{ position: [1.1, 0, 5], fov: 75 }} shadows>
        {/* <ScrollControls> */}
        {/* <Environment preset="city" environmentIntensity={1}></Environment> */}
        {/* <Scroll> */}
        <CanvasScreen />
        {/* </Scroll> */}
        {/* </ScrollControls> */}
        {/* <OrbitControls /> */}
      </Canvas>
      {/* <div className="bg-black w-full h-2"></div> */}
      <div className="px-8 bg-black relative z-0 before:z-negative before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-[linear-gradient(45deg,transparent,#0d1b2a,#f26419,#f6ae2d,#f26419,#0d1b2a,transparent)] before:opacity-10 flex justify-center">
        <div className="w-full lg:max-w-[80vw] lg:gap-8 lg:flex">
          <div
            className="flex flex-col h-fit top-0 lg:w-[50%] lg:sticky py-20"
            id="about"
          >
            <h2>ABOUT</h2>
            <div className="relative before:absolute before:inset-0 before:w-full before:h-full rounded before:opacity-50 //overflow-hidden grid grid-cols-8 gap-8 py-4">
              {/* <div className="rounded-[50%] w-[50%] aspect-square overflow-hidden justify-self-start col-span-3">
                <img src="images/profile-photo.jpg"/>
              </div> */}
              <p className="relative text-justify col-span-6 text-grey-01">
                Nice to meet you, and thanks for visiting my page! I’m Jun
                Shiun, and web development is a friend of mine. My journey into
                web development began during my final year at university, and
                I’ve been captivated by the endless possibilities and creativity
                within this field ever since.
              </p>
            </div>
          </div>
          <SectionsWrapper />
        </div>
      </div>
    </div>
  );
}

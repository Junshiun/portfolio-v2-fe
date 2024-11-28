// import { Canvas, extend } from "@react-three/fiber";
// import { EffectComposer, FontLoader, RenderPass, ShaderPass, TextGeometry, UnrealBloomPass } from "three/examples/jsm/Addons.js";
// import { TextGeometry } from "three/examples/jsm/Addons.js";
// import fontJson from '../fonts/Sci Fied X_Regular.json';
// import { Object3DNode } from "@react-three/fiber";
import { ExperienceSection } from "@/components/app/sections/experience";
import { CanvasScreen } from "@/components/app/canvas";
import { SkillsSection } from "@/components/app/sections/skills";
import { ProjectSection } from "@/components/app/sections/projects";
import { MessageSection } from "@/components/app/sections/message";
import { AboutSection } from "@/components/app/sections/about";
import { PortfolioInfo } from "@/components/portfolio-info";
import { TopButton } from "@/components/app/top-button";

// extend({ TextGeometry });

// declare module "@react-three/fiber" {
//   interface ThreeElements {
//     textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
//   }
// }

// import * as Three from "three";

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       unrealBloomPass: ReactThreeFiber.Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>;
//     }
//   }
// }

// extend({ UnrealBloomPass, EffectComposer, RenderPass, ShaderPass });

export default async function Home() {
  return (
    // <div className="w-full h-screen m-0 p-0 relative">
    <div className="w-full m-0 p-0 relative">
      {/* <Canvas camera={{ position: [1.1, 0, 5], fov: 75 }} shadows> */}
      {/* <ScrollControls>
        <Environment preset="city" environmentIntensity={1}></Environment>
        <Scroll> */}
      {/* <CanvasScreen /> */}
      {/* </Scroll>
        </ScrollControls>
        <OrbitControls /> */}
      {/* </Canvas> */}
      {/* <div className="bg-black w-full h-2"></div> */}
      {/* <div className="px-8 bg-black relative z-0 before:z-negative before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-[linear-gradient(45deg,transparent,#0d1b2a,#f26419,#f6ae2d,#f26419,#0d1b2a,transparent)] before:opacity-10 flex justify-center h-fit">
        <div className="w-full xl:max-w-[80vw] xl:gap-8 xl:grid xl:grid-cols-2">
          <AboutSection />
          <div className="py-20">
            <SkillsSection />
            <ExperienceSection />
            <ProjectSection />
            <MessageSection />
          </div>
          <PortfolioInfo className="xl:hidden mb-20"/>
        </div>
      </div> */}
      <CanvasScreen />
      <div className="px-8 bg-black relative z-0 before:z-negative before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-[linear-gradient(45deg,transparent,#0d1b2a,#f26419,#f6ae2d,#f26419,#0d1b2a,transparent)] before:opacity-10 flex //justify-center items-center flex-col h-fit">
        <div className="w-full xl:max-w-[80vw] xl:gap-8 xl:grid xl:grid-cols-2">
          <AboutSection />
          <div className="py-20">
            <SkillsSection />
            <ExperienceSection />
            <ProjectSection />
            <MessageSection />
          </div>
          <PortfolioInfo className="xl:hidden mb-20" />
        </div>
        <TopButton />
      </div>
    </div>
  );
}

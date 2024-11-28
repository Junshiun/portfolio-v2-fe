import { useEffect, useRef } from "react";
import { Tween, Group, Easing } from "@tweenjs/tween.js";
import { PointLight } from "three";
import { useTimerContext } from "@/context/timer";
// import * as THREE from 'three';

export const CustomPointLight = () => {
  const tweenGroup = new Group();

  const lightRef = useRef<PointLight>(null);

  const timerContext = useTimerContext();

  useEffect(() => {
    function animate(time: number) {
      requestAnimationFrame(animate);
      tweenGroup.update(time);
    }

    if (timerContext?.timerCompleted) {
      const startIntensity = { intensity: 0.0 };
      const targetIntensity = { intensity: 0.1 };
      const duration = 1000; // 2 seconds

      new Tween(startIntensity, tweenGroup)
        .to(targetIntensity, duration)
        .easing(Easing.Quadratic.Out) // Easing function for fast start and slow end
        .onUpdate(() => {
          if (lightRef.current) {
            lightRef.current.intensity = startIntensity.intensity;
          }
        })
        .start();

      requestAnimationFrame(animate);
    }
    // const timeout = setTimeout(() => {
    //   const startIntensity = { intensity: 0.0 };
    //   const targetIntensity = { intensity: 0.1 };
    //   const duration = 1000; // 2 seconds

    //   new Tween(startIntensity, tweenGroup)
    //     .to(targetIntensity, duration)
    //     .easing(Easing.Quadratic.Out) // Easing function for fast start and slow end
    //     .onUpdate(() => {
    //       if (lightRef.current) {
    //         lightRef.current.intensity = startIntensity.intensity;
    //       }
    //     })
    //     .start();

    //   function animate(time: number) {
    //     requestAnimationFrame(animate);
    //     tweenGroup.update(time);
    //   }

    //   requestAnimationFrame(animate);
    // }, 5000);

    // return () => {
    //   clearTimeout(timeout);
    // };
  }, [timerContext?.timerCompleted]);

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0.1, 0]}
      intensity={0}
      distance={2}
      decay={1}
      color={"orange"}
    />
  );
};

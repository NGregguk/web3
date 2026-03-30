"use client";

import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import {
  AtmosphereFrames,
  BackdropPlane,
  buildPalette
} from "./ScenePrimitives";

function SceneRoot({ lowPower, palette }) {
  return (
    <>
      <BackdropPlane lowPower={lowPower} palette={palette} opacity={0.48} />
      <AtmosphereFrames lowPower={lowPower} palette={palette} />
    </>
  );
}

export default function HeroScene({ lowPower, theme }) {
  const palette = useMemo(() => buildPalette(theme), [theme]);

  return (
    <Canvas
      dpr={lowPower ? [1, 1.1] : [1, 1.35]}
      camera={{ fov: 30, position: [0, 0, 5.8] }}
      gl={{
        antialias: !lowPower,
        alpha: true,
        powerPreference: "high-performance"
      }}
      resize={{ scroll: false, debounce: { resize: 0, scroll: 0 } }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <SceneRoot lowPower={lowPower} palette={palette} />
    </Canvas>
  );
}

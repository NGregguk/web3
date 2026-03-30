"use client";

import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import {
  AtmosphereFrames,
  BackdropPlane,
  Sculpture,
  buildPalette
} from "./ScenePrimitives";

function SceneRoot({ lowPower, palette }) {
  return (
    <>
      <ambientLight intensity={0.92} />
      <directionalLight
        position={[3.6, 3.2, 4.2]}
        intensity={1.1}
        color={palette.accent}
      />
      <pointLight
        position={[-2.4, -1.2, 3.4]}
        intensity={0.35}
        color={palette.line}
      />
      <pointLight position={[0.2, 1.7, 2.7]} intensity={0.22} color={palette.solid} />
      <BackdropPlane lowPower={lowPower} palette={palette} opacity={0.56} />
      <AtmosphereFrames lowPower={lowPower} palette={palette} />
      <Sculpture lowPower={lowPower} palette={palette} />
    </>
  );
}

export default function WebglFeatureScene({ lowPower, theme }) {
  const palette = useMemo(() => buildPalette(theme), [theme]);

  return (
    <Canvas
      dpr={lowPower ? [1, 1.15] : [1, 1.5]}
      camera={{ fov: 32, position: [0, 0.08, 5.55] }}
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

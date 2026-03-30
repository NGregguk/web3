"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { templateConfig } from "@/data/templateConfig";
import ProductModel from "./ProductModel";

const { productViewer } = templateConfig;
const INITIAL_ROTATION = productViewer.initialRotation;
const PITCH_LIMITS = productViewer.pitchLimits;
const HORIZONTAL_ROTATION_PER_PIXEL = productViewer.drag.horizontalPerPixel;
const VERTICAL_ROTATION_PER_PIXEL = productViewer.drag.verticalPerPixel;

function TurntableController({ lowPower, groupRef }) {
  const { gl } = useThree();
  const currentRotation = useRef({ ...INITIAL_ROTATION });
  const targetRotation = useRef({ ...INITIAL_ROTATION });
  const dragState = useRef({
    active: false,
    pointerId: null,
    lastX: 0,
    lastY: 0
  });

  useEffect(() => {
    const canvas = gl.domElement;

    canvas.tabIndex = 0;
    canvas.style.cursor = "grab";
    canvas.setAttribute("aria-label", productViewer.ariaLabel);

    const stopDrag = (pointerId) => {
      if (!dragState.current.active) return;
      if (
        dragState.current.pointerId !== null &&
        pointerId !== undefined &&
        pointerId !== dragState.current.pointerId
      ) {
        return;
      }

      dragState.current.active = false;
      dragState.current.pointerId = null;
      canvas.style.cursor = "grab";

      if (pointerId !== undefined) {
        canvas.releasePointerCapture?.(pointerId);
      }
    };

    const handlePointerDown = (event) => {
      dragState.current.active = true;
      dragState.current.pointerId = event.pointerId;
      dragState.current.lastX = event.clientX;
      dragState.current.lastY = event.clientY;

      canvas.focus({ preventScroll: true });
      canvas.setPointerCapture?.(event.pointerId);
      canvas.style.cursor = "grabbing";
    };

    const handlePointerMove = (event) => {
      if (!dragState.current.active) return;

      const deltaX = event.clientX - dragState.current.lastX;
      const deltaY = event.clientY - dragState.current.lastY;

      dragState.current.lastX = event.clientX;
      dragState.current.lastY = event.clientY;

      targetRotation.current.y += deltaX * HORIZONTAL_ROTATION_PER_PIXEL;
      targetRotation.current.x = THREE.MathUtils.clamp(
        targetRotation.current.x + deltaY * VERTICAL_ROTATION_PER_PIXEL,
        PITCH_LIMITS.min,
        PITCH_LIMITS.max
      );
    };

    const handleKeyDown = (event) => {
      const step = event.shiftKey
        ? productViewer.drag.keyStepFast
        : productViewer.drag.keyStep;
      let handled = true;

      if (event.key === "ArrowLeft") {
        targetRotation.current.y -= step;
      } else if (event.key === "ArrowRight") {
        targetRotation.current.y += step;
      } else if (event.key === "ArrowUp") {
        targetRotation.current.x = THREE.MathUtils.clamp(
          targetRotation.current.x - step * 0.7,
          PITCH_LIMITS.min,
          PITCH_LIMITS.max
        );
      } else if (event.key === "ArrowDown") {
        targetRotation.current.x = THREE.MathUtils.clamp(
          targetRotation.current.x + step * 0.7,
          PITCH_LIMITS.min,
          PITCH_LIMITS.max
        );
      } else {
        handled = false;
      }

      if (handled) {
        event.preventDefault();
      }
    };

    const handleBlur = () => {
      stopDrag();
    };
    const handlePointerUp = (event) => {
      stopDrag(event.pointerId);
    };

    const handlePointerCancel = (event) => {
      stopDrag(event.pointerId);
    };

    const handleWindowPointerUp = (event) => {
      stopDrag(event.pointerId);
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerCancel);
    canvas.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("blur", handleBlur);
    window.addEventListener("pointerup", handleWindowPointerUp);
    window.addEventListener("pointercancel", handleWindowPointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerCancel);
      canvas.removeEventListener("keydown", handleKeyDown);
      canvas.removeEventListener("blur", handleBlur);
      window.removeEventListener("pointerup", handleWindowPointerUp);
      window.removeEventListener("pointercancel", handleWindowPointerUp);

      canvas.style.cursor = "";
      canvas.removeAttribute("aria-label");
      canvas.removeAttribute("tabindex");
    };
  }, [gl]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const easing = lowPower
      ? productViewer.drag.easing.lowPower
      : productViewer.drag.easing.default;
    currentRotation.current.x = THREE.MathUtils.damp(
      currentRotation.current.x,
      targetRotation.current.x,
      easing,
      delta
    );
    currentRotation.current.y = THREE.MathUtils.damp(
      currentRotation.current.y,
      targetRotation.current.y,
      easing,
      delta
    );

    groupRef.current.rotation.x = currentRotation.current.x;
    groupRef.current.rotation.y = currentRotation.current.y;
  });

  return null;
}

function SceneRoot({ lowPower }) {
  const watchRef = useRef(null);

  return (
    <>
      <ambientLight intensity={productViewer.lighting.ambient} />
      <directionalLight
        position={productViewer.lighting.key.position}
        intensity={productViewer.lighting.key.intensity}
      />
      <directionalLight
        position={productViewer.lighting.fill.position}
        intensity={productViewer.lighting.fill.intensity}
      />
      <pointLight
        position={productViewer.lighting.top.position}
        intensity={productViewer.lighting.top.intensity}
      />
      <pointLight
        position={productViewer.lighting.face.position}
        intensity={productViewer.lighting.face.intensity}
      />

      <Suspense fallback={null}>
        <ProductModel lowPower={lowPower} turntableRef={watchRef} />
      </Suspense>

      <TurntableController groupRef={watchRef} lowPower={lowPower} />
    </>
  );
}

export default function ObjectStudyScene({ lowPower }) {
  return (
    <Canvas
      dpr={lowPower ? [1, 1.15] : [1, 1.5]}
      camera={productViewer.camera}
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
      <SceneRoot lowPower={lowPower} />
    </Canvas>
  );
}

"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function buildPalette(theme) {
  if (theme === "dark") {
    return {
      backdrop: "#151516",
      line: "#6f685d",
      solid: "#d9d1c4",
      shade: "#7c7468",
      accent: "#f4eee5",
      slab: "#222224"
    };
  }

  return {
    backdrop: "#e5ddd2",
    line: "#686154",
    solid: "#1c1b19",
    shade: "#756d61",
    accent: "#ffffff",
    slab: "#ede5d8"
  };
}

export function BackdropPlane({ lowPower, palette, opacity = 0.52 }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uLine: { value: new THREE.Color(palette.line) },
          uBackdrop: { value: new THREE.Color(palette.backdrop) },
          uOpacity: { value: opacity }
        },
        vertexShader: `
          varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          precision mediump float;
          uniform float uTime;
          uniform float uOpacity;
          uniform vec3 uLine;
          uniform vec3 uBackdrop;
          varying vec2 vUv;

          void main() {
            vec2 uv = vUv;
            float stripeA = smoothstep(0.48, 0.52, fract(uv.x * 16.0 + uTime * 0.01));
            float stripeB = smoothstep(0.48, 0.52, fract(uv.y * 11.0 - uTime * 0.008));
            float field = stripeA * 0.08 + stripeB * 0.04;
            float vignette = 1.0 - smoothstep(0.12, 0.82, distance(uv, vec2(0.48, 0.5)));
            vec3 color = mix(uBackdrop, uLine, field + vignette * 0.04);
            gl_FragColor = vec4(color, uOpacity);
          }
        `
      }),
    [opacity, palette]
  );

  useEffect(() => {
    material.uniforms.uLine.value.set(palette.line);
    material.uniforms.uBackdrop.value.set(palette.backdrop);
    material.uniforms.uOpacity.value = opacity;

    return () => {
      material.dispose();
    };
  }, [material, opacity, palette]);

  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta * (lowPower ? 0.28 : 0.6);
  });

  return (
    <mesh position={[0, 0.05, -2.3]} scale={[7, 5.1, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export function AtmosphereFrames({ lowPower, palette }) {
  const group = useRef();
  const outerGeometry = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(4.2, 5.2, 0.3)),
    []
  );
  const innerGeometry = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(3.2, 4.2, 0.22)),
    []
  );

  useEffect(
    () => () => {
      outerGeometry.dispose();
      innerGeometry.dispose();
    },
    [innerGeometry, outerGeometry]
  );

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.08,
      0.04
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * -0.06,
      0.04
    );
    group.current.rotation.z += delta * (lowPower ? 0.015 : 0.03);
  });

  return (
    <group ref={group} position={[0.25, 0.02, -0.2]}>
      <mesh position={[0.45, -0.2, -0.6]} rotation={[0, 0, 0.32]}>
        <planeGeometry args={[1.95, 2.8]} />
        <meshBasicMaterial color={palette.line} transparent opacity={0.05} />
      </mesh>

      <lineSegments geometry={outerGeometry} position={[0.1, 0.05, -0.05]}>
        <lineBasicMaterial color={palette.line} transparent opacity={0.26} />
      </lineSegments>

      {!lowPower ? (
        <lineSegments geometry={innerGeometry} position={[-0.28, 0.18, -0.32]} rotation={[0, 0, -0.16]}>
          <lineBasicMaterial color={palette.line} transparent opacity={0.16} />
        </lineSegments>
      ) : null}
    </group>
  );
}

export function Sculpture({ lowPower, palette }) {
  const group = useRef();
  const slab = useRef();
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector2(0, 0) },
          uSolid: { value: new THREE.Color(palette.solid) },
          uShade: { value: new THREE.Color(palette.shade) },
          uAccent: { value: new THREE.Color(palette.accent) }
        },
        vertexShader: `
          uniform float uTime;
          uniform vec2 uPointer;
          varying vec3 vNormalW;
          varying vec3 vPositionW;

          void main() {
            vec3 pos = position;
            float ripple = sin(pos.y * 3.2 + uTime * 0.65) * 0.045;
            ripple += sin(pos.x * 4.8 - uTime * 0.42 + uPointer.x * 2.1) * 0.022;
            ripple += cos(pos.z * 3.6 + uTime * 0.36 - uPointer.y * 1.8) * 0.018;
            pos += normal * ripple;

            vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
            vPositionW = worldPosition.xyz;
            vNormalW = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * viewMatrix * worldPosition;
          }
        `,
        fragmentShader: `
          precision mediump float;
          uniform vec3 uSolid;
          uniform vec3 uShade;
          uniform vec3 uAccent;
          varying vec3 vNormalW;
          varying vec3 vPositionW;

          void main() {
            vec3 lightDir = normalize(vec3(-0.45, 0.82, 0.58));
            vec3 viewDir = normalize(cameraPosition - vPositionW);
            float diffuse = max(dot(normalize(vNormalW), lightDir), 0.0);
            float fresnel = pow(1.0 - max(dot(normalize(vNormalW), viewDir), 0.0), 2.2);
            vec3 color = mix(uShade, uSolid, diffuse * 0.88 + 0.12);
            color += uAccent * fresnel * 0.08;
            gl_FragColor = vec4(color, 1.0);
          }
        `
      }),
    [palette]
  );

  const frameGeometry = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(4.15, 5.25, 0.8)),
    []
  );
  const frameGeometryInner = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(3.55, 4.45, 0.5)),
    []
  );

  useEffect(() => {
    material.uniforms.uSolid.value.set(palette.solid);
    material.uniforms.uShade.value.set(palette.shade);
    material.uniforms.uAccent.value.set(palette.accent);

    return () => {
      material.dispose();
    };
  }, [material, palette]);

  useEffect(
    () => () => {
      frameGeometry.dispose();
      frameGeometryInner.dispose();
    },
    [frameGeometry, frameGeometryInner]
  );

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.28,
      0.06
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * -0.18,
      0.06
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      Math.sin(state.clock.elapsedTime * 0.18) * 0.03,
      0.04
    );

    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      state.pointer.x * 0.16,
      0.05
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      state.pointer.y * 0.08,
      0.05
    );

    if (slab.current) {
      slab.current.rotation.z += delta * 0.06;
    }

    material.uniforms.uTime.value += delta * (lowPower ? 0.45 : 0.75);
    material.uniforms.uPointer.value.lerp(
      new THREE.Vector2(state.pointer.x, state.pointer.y),
      0.08
    );
  });

  return (
    <group ref={group} position={[0.15, 0.05, 0]}>
      <mesh rotation={[0.4, -0.5, 0.25]}>
        <icosahedronGeometry args={[1.04, lowPower ? 3 : 4]} />
        <primitive object={material} attach="material" />
      </mesh>

      <mesh scale={[1.05, 1.05, 1.05]} rotation={[0.4, -0.5, 0.25]}>
        <icosahedronGeometry args={[1.04, lowPower ? 2 : 3]} />
        <meshBasicMaterial
          color={palette.line}
          transparent
          opacity={0.24}
          wireframe
        />
      </mesh>

      <mesh
        ref={slab}
        position={[-1.1, -0.78, -0.25]}
        rotation={[0.4, -0.3, 0.45]}
      >
        <boxGeometry args={[2.55, 0.18, 1.35]} />
        <meshStandardMaterial
          color={palette.slab}
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>

      <lineSegments geometry={frameGeometry} position={[0, 0, -0.15]}>
        <lineBasicMaterial color={palette.line} transparent opacity={0.32} />
      </lineSegments>

      {!lowPower ? (
        <lineSegments geometry={frameGeometryInner} position={[0.18, 0.05, -0.55]}>
          <lineBasicMaterial color={palette.line} transparent opacity={0.18} />
        </lineSegments>
      ) : null}
    </group>
  );
}

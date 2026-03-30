"use client";

import { useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { templateConfig } from "@/data/templateConfig";

const { model } = templateConfig.productViewer;
const MODEL_URL = encodeURI(model.src);

function cloneMaterial(material) {
  if (!material) return material;

  const nextMaterial = material.clone();

  if ("envMapIntensity" in nextMaterial) {
    nextMaterial.envMapIntensity = model.material.envMapIntensity;
  }

  if ("roughness" in nextMaterial) {
    nextMaterial.roughness = Math.max(
      nextMaterial.roughness ?? model.material.minRoughness,
      model.material.minRoughness
    );
  }

  if ("metalness" in nextMaterial) {
    nextMaterial.metalness = Math.min(
      nextMaterial.metalness ?? model.material.maxMetalness,
      model.material.maxMetalness
    );
  }

  return nextMaterial;
}

export default function ProductModel({ lowPower, turntableRef }) {
  const gltf = useLoader(GLTFLoader, MODEL_URL);

  const prepared = useMemo(() => {
    const scene = gltf.scene.clone(true);

    scene.traverse((node) => {
      if (!node.isMesh) return;

      node.castShadow = false;
      node.receiveShadow = false;

      if (Array.isArray(node.material)) {
        node.material = node.material.map(cloneMaterial);
      } else {
        node.material = cloneMaterial(node.material);
      }
    });

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const scale = (lowPower ? model.scale.lowPower : model.scale.default) / maxAxis;
    const position = [-center.x * scale, -center.y * scale, -center.z * scale];

    return { scene, scale, position };
  }, [gltf.scene, lowPower]);

  useEffect(() => {
    return () => {
      prepared.scene.traverse((node) => {
        if (!node.isMesh) return;

        if (Array.isArray(node.material)) {
          node.material.forEach((material) => material?.dispose?.());
        } else {
          node.material?.dispose?.();
        }
      });
    };
  }, [prepared]);

  return (
    <group ref={turntableRef} position={model.position}>
      <group
        scale={prepared.scale}
        position={prepared.position}
        rotation={model.rotation}
      >
        <primitive object={prepared.scene} />
      </group>
    </group>
  );
}

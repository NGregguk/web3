"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { templateConfig } from "@/data/templateConfig";
import styles from "./ObjectStudyCanvas.module.css";

const ObjectStudyScene = dynamic(() => import("./ObjectStudyScene"), {
  ssr: false,
  loading: () => (
    <div className={styles.fallback}>
      <div className={styles.frame} />
    </div>
  )
});

function supportsWebGL() {
  try {
    const element = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (element.getContext("webgl") || element.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function ObjectFallback({ label }) {
  return (
    <div className={styles.fallback}>
      <div className={styles.frame} />
      <div className={styles.object}>
        <span className={styles.slab} />
        <span className={styles.wire} />
        <span className={styles.plate} />
      </div>
      <p className={styles.label}>{label}</p>
    </div>
  );
}

export default function ObjectStudyCanvas() {
  const shellRef = useRef(null);
  const { mounted } = useTheme();
  const [canRender, setCanRender] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [lowPower, setLowPower] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const memory = navigator.deviceMemory ?? 8;
    const cores = navigator.hardwareConcurrency ?? 8;

    setReduceMotion(reduced);
    setLowPower(memory <= 4 || cores <= 4);
    setCanRender(supportsWebGL());
  }, []);

  useEffect(() => {
    if (!shellRef.current || shouldLoad) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" }
    );

    observer.observe(shellRef.current);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad]);

  const showScene = mounted && shouldLoad && canRender && !reduceMotion;
  const label = reduceMotion
    ? "Static object study for reduced motion"
    : shouldLoad
    ? "WebGL object study fallback"
    : "3D scene loads on approach";

  return (
    <figure ref={shellRef} className={styles.shell}>
      <figcaption className={styles.srOnly}>
        {templateConfig.productViewer.figcaption}
      </figcaption>
      {showScene ? (
        <ObjectStudyScene lowPower={lowPower} />
      ) : (
        <ObjectFallback label={label} />
      )}
    </figure>
  );
}
